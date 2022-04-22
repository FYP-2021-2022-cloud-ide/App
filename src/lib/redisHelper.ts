import { redisClient } from "./redisClient";
import { Container } from "./api/api";
import moment from "moment";
import { SectionUserInfo } from "./cnails";

const redisKeyExpireTime = 86400;
const creationTimeout = 120;

/**
 *
 * @param isoTime a timestamp
 * @returns the time from the timestamp
 */
const getTimeDiff = (isoTime: string) => {
  return moment.duration(moment().diff(moment(isoTime)));
};

export type Workspace = {
  /**
   * a temp id to identify the workspace before the container id is returned
   */
  tempId: string;
  requestAt?: string;
  sourceId: string;
  /**
   * it is the event of this creation
   */
  cause:
    | "TEMPLATE_CREATE"
    | "SANDBOX_CREATE"
    | "ENV_CREATE"
    | "TEMPLATE_UPDATE"
    | "SANDBOX_UPDATE"
    | "ENV_UPDATE"
    | "TEMPLATE_START_WORKSPACE"
    | "SANDBOX_START_WORKSPACE"
    | "WORKSPACE_START";
  /**
   * if the id is empty, request is still processing.
   * Else request is processed.
   */
  containerId: string;
  /**
   * title of workspace so that the workspace can be shown even when the request is still processing
   */
  title: string;
  /**
   * the data for client to continue to update process in case client lose the data
   */
  data?: any;
  sectionUserInfo?: SectionUserInfo;
};

const list = {
  workspaces: async (sub: string) => {
    const v = await redisClient.get(`ServerState:${sub}:workspaces`);
    return (v ? JSON.parse(v) : []) as Workspace[];
  },
};

const remove = {
  /**
   * if the creation is failed, remove the request based on tempId
   * @param sub
   * @param tempId
   */
  workspaces: async (sub: string, tempId: string) => {
    const workspaces = await list.workspaces(sub);
    await redisClient.set(
      `ServerState:${sub}:workspaces`,
      JSON.stringify(workspaces.filter((w) => w.tempId != tempId)),
      "EX",
      redisKeyExpireTime
    );
  },
};

const insert = {
  workspaces: async (sub: string, workspace: Workspace) => {
    const workspaces = await list.workspaces(sub);
    workspace.requestAt = moment().toISOString();
    workspaces.push(workspace);
    await redisClient.set(
      `ServerState:${sub}:workspaces`,
      JSON.stringify(workspaces),
      "EX",
      redisKeyExpireTime
    );
    return workspaces;
  },
};

const onReturn = {
  workspaces: async (sub: string, tempId: string, containerId: string) => {
    const workspaces = await list.workspaces(sub);
    await redisClient.set(
      `ServerState:${sub}:workspaces`,
      JSON.stringify(
        workspaces.map((w) => {
          if (w.tempId === tempId)
            return {
              ...w,
              containerId: containerId,
              data: {
                ...w.data,
                containerId: containerId,
              },
            } as Workspace;
          else return w;
        })
      ),
      "EX",
      redisKeyExpireTime
    );
  },
};

const patch = {
  /**
   * this function add the `data` prop to containers
   * @param sub
   * @param containers
   * @returns
   */
  workspaces: async (sub: string, containers: Container[]) => {
    let patched = [...containers];
    let workspaces = await list.workspaces(sub);

    // check if workspaces in redis are not valid anymore
    // this could happens when container Id is not empty (workspace have been created) but not found in containers
    // the patch will also be removed if the container id doesn't arrive in 2 minutes
    workspaces = workspaces.filter(
      (w) =>
        (w.containerId == "" &&
          getTimeDiff(w.requestAt).asSeconds() < creationTimeout) ||
        containers.some((c) => c.containerId == w.containerId)
    );
    if (workspaces.length == 0) {
      await redisClient.del(`ServerState:${sub}:workspaces`);
    } else {
      await redisClient.set(
        `ServerState:${sub}:workspaces`,
        JSON.stringify(workspaces),
        "EX",
        redisKeyExpireTime
      );
    }

    // now as long as workspace has container id, you must find it in the container array. patch the data.
    for (let workspace of workspaces) {
      if (workspace.containerId == "") {
        // add the empty container to show user a loading state because container is not created
        patched.push({
          title: workspace.title,
          subTitle: "",
          startAt: "",
          containerId: "",
          redisPatch: workspace,
        });
      } else {
        // the workspace has been created because there is container id
        //
        const index = patched.findIndex(
          (c) => workspace.containerId == c.containerId
        );
        if (index == -1) {
          throw new Error("somehow container cannot found");
        }
        patched.splice(index, 1, {
          ...patched[index],
          redisPatch: workspace,
        });
      }
    }
    return patched;
  },
};

const redisHelper = {
  insert,
  remove,
  list,
  patch,
  onReturn,
};

export default redisHelper;
