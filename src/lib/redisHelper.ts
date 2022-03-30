import { redisClient } from "./redisClient";
import {
  SandboxImage as ApiSandbox,
  Template as ApiTemplate,
  Environment as ApiEnvironment,
  Container as ApiWorkspace,
} from "./api/api";
import { async } from "@firebase/util";

/**
 * in second
 */
const redisKeyExpireTime = 180;
const redisKeyPersistKeyExpireTime = 86400;

type WorkspaceCreateData =
  | {
      cause:
        | "TEMPLATE_CREATE" // temp
        | "SANDBOX_CREATE" // temp
        | "ENV_CREATE"; // temp
      title: string;
    }
  | {
      cause:
        | "TEMPLATE_UPDATE" // temp
        | "SANDBOX_UPDATE" // temp
        | "ENV_UPDATE"; // temp
      /**
       * the id of template, sandbox or env
       */
      id: string;
    }
  | {
      cause:
        | "TEMPLATE_START_WORKSPACE"
        | "SANDBOX_START_WORKSPACE"
        | "WORKSPACE_START";
      /**
       * the id of template, sandbox or workspace
       */
      id: string;
    };

type WorkspaceRemoveData = {
  id: string;
};

type WorkspaceRunningData = {
  /**
   * id of the workspace
   */
  id: string;
  type: "SANDBOX" | "ENV" | "TEMPLATE" | "STUDENT_WORKSPACE";
  /**
   * whether this workspace is a temporary workspace
   */
  isTemporary: boolean;

  createData: WorkspaceCreateData;
};

export type Workspace =
  | {
      status: "CREATING";
      data: WorkspaceCreateData;
    }
  | {
      status: "REMOVING";
      data: WorkspaceRemoveData;
    }
  | {
      status: "RUNNING";
      data: WorkspaceRunningData;
    };

type SandboxCreateData = {
  title: string;
  imageId: string;
  description: string;
};

type SandboxUpdateData = {
  title: string;
  description: string;
  id: string;
};

type SandboxRemoveData = {
  id: string;
};

export type Sandbox =
  | {
      status: "CREATING";
      cause: "SANDBOX_CREATE";
      data: SandboxCreateData;
    }
  | {
      status: "UPDATING";
      cause: "SANDBOX_UPDATE";
      data: SandboxUpdateData;
    }
  | {
      status: "REMOVING";
      cause: "SANDBOX_REMOVE";
      data: SandboxRemoveData;
    };

type TemplateCreateData = {
  title: string;
  description: string;
  environmentId: string;
  isExam: boolean;
  timeLimit: number;
};

type TemplateUpdateData = {
  title: string;
  description: string;
  id: string;
};

type TemplateRemoveData = {
  id: string;
};

export type Template =
  | {
      status: "CREATING";
      cause: "TEMPLATE_CREATE";
      data: TemplateCreateData;
    }
  | {
      status: "UPDATING";
      cause: "TEMPLATE_UPDATE";
      data: TemplateUpdateData;
    }
  | {
      status: "REMOVING";
      cause: "TEMPLATE_REMOVE";
      data: TemplateRemoveData;
    };

type EnvironmentCreateData = {
  title: string;
  description: string;
};

type EnvironmentUpdateData = {
  title: string;
  description: string;
  id: string;
};

type EnvironmentRemoveData = {
  id: string;
};

export type Environment =
  | {
      status: "CREATING";
      cause: "ENV_CREATE";
      data: EnvironmentCreateData;
    }
  | {
      status: "UPDATING";
      cause: "ENV_UPDATE";
      data: EnvironmentUpdateData;
    }
  | {
      status: "REMOVING";
      cause: "ENV_REMOVE";
      data: EnvironmentRemoveData;
    };

/**
 * insert into redis
 */
const insert = {
  createSandbox: async (userId: string, data: SandboxCreateData) => {
    const sandboxes = await list.sandboxes(userId);
    sandboxes.push({
      status: "CREATING",
      cause: "SANDBOX_CREATE",
      data: data,
    });
    await redisClient.set(
      `${userId}:sandboxes`,
      JSON.stringify(sandboxes),
      "EX",
      redisKeyExpireTime
    );
    return sandboxes;
  },
  updateSandbox: async (userId: string, data: SandboxUpdateData) => {
    const sandboxes = await list.sandboxes(userId);
    sandboxes.push({
      status: "UPDATING",
      cause: "SANDBOX_UPDATE",
      data: data,
    });
    await redisClient.set(
      `${userId}:sandboxes`,
      JSON.stringify(sandboxes),
      "EX",
      redisKeyExpireTime
    );
    return sandboxes;
  },
  removeSandbox: async (userId: string, data: SandboxRemoveData) => {
    const sandboxes = await list.sandboxes(userId);
    sandboxes.push({
      status: "REMOVING",
      cause: "SANDBOX_REMOVE",
      data: data,
    });
    await redisClient.set(
      `${userId}:sandboxes`,
      JSON.stringify(sandboxes),
      "EX",
      redisKeyExpireTime
    );
    return sandboxes;
  },
  createWorkspace: async (userId: string, data: WorkspaceCreateData) => {
    const workspaces = await list.workspaces(userId);
    workspaces.push({
      status: "CREATING",
      data: data,
    } as Workspace);
    await redisClient.set(
      `${userId}:workspaces`,
      JSON.stringify(workspaces),
      "EX",
      redisKeyPersistKeyExpireTime
    );
    return workspaces;
  },
  /**
   * this is called when create workspace response return
   */
  patchCreatedWorkspace: async (userId: string, data: WorkspaceRunningData) => {
    const workspaces = await list.workspaces(userId);
    workspaces.push({
      status: "RUNNING",
      data: data,
    });
    await redisClient.set(
      `${userId}:workspaces`,
      JSON.stringify(workspaces),
      "EX",
      redisKeyPersistKeyExpireTime
    );
    return workspaces;
  },
  removeWorkspace: async (userId: string, data: WorkspaceRemoveData) => {
    const workspaces = await list.workspaces(userId);
    workspaces.push({
      status: "REMOVING",
      data: data,
    });
    await redisClient.set(
      `${userId}:workspaces`,
      JSON.stringify(workspaces),
      "EX",
      redisKeyPersistKeyExpireTime
    );
    return workspaces;
  },
  createTemplate: async (userId: string, data: TemplateCreateData) => {
    const templates = await list.templates(userId);
    templates.push({
      status: "CREATING",
      cause: "TEMPLATE_CREATE",
      data: data,
    });
    await redisClient.set(
      `${userId}:templates`,
      JSON.stringify(templates),
      "EX",
      redisKeyExpireTime
    );
    return templates;
  },
  updateTemplate: async (userId: string, data: TemplateUpdateData) => {
    const templates = await list.templates(userId);
    templates.push({
      status: "UPDATING",
      cause: "TEMPLATE_UPDATE",
      data: data,
    });
    await redisClient.set(
      `${userId}:templates`,
      JSON.stringify(templates),
      "EX",
      redisKeyExpireTime
    );
    return templates;
  },
  removeTemplate: async (userId: string, data: TemplateRemoveData) => {
    const templates = await list.templates(userId);
    templates.push({
      status: "REMOVING",
      cause: "TEMPLATE_REMOVE",
      data: data,
    });
    await redisClient.set(
      `${userId}:templates`,
      JSON.stringify(templates),
      "EX",
      redisKeyExpireTime
    );
    return templates;
  },
  createEnvironment: async (userId: string, data: EnvironmentCreateData) => {
    const environments = await list.environments(userId);
    environments.push({
      status: "CREATING",
      cause: "ENV_CREATE",
      data: data,
    });
    await redisClient.set(
      `${userId}:environments`,
      JSON.stringify(environments),
      "EX",
      redisKeyExpireTime
    );
    return environments;
  },
  updateEnvironment: async (userId: string, data: EnvironmentUpdateData) => {
    const environments = await list.environments(userId);
    environments.push({
      status: "UPDATING",
      cause: "ENV_UPDATE",
      data: data,
    });
    await redisClient.set(
      `${userId}:environments`,
      JSON.stringify(environments),
      "EX",
      redisKeyExpireTime
    );
    return environments;
  },
  removeEnvironment: async (userId: string, data: EnvironmentRemoveData) => {
    const environments = await list.environments(userId);
    environments.push({
      status: "REMOVING",
      cause: "ENV_REMOVE",
      data: data,
    });
    await redisClient.set(
      `${userId}:environments`,
      JSON.stringify(environments),
      "EX",
      redisKeyExpireTime
    );
  },
};

/**
 * remove from redis
 */
const remove = {
  createSandbox: async (userId: string, data: SandboxCreateData) => {
    let sandboxes = await list.templates(userId);
    sandboxes = sandboxes.filter((sandbox) => {
      return !(
        sandbox.status == "CREATING" && sandbox.data.title == data.title
      );
    });
    if (sandboxes.length > 0) {
      await redisClient.set(
        `${userId}:sandboxes`,
        JSON.stringify(sandboxes),
        "EX",
        redisKeyExpireTime
      );
    } else await redisClient.del(`${userId}:sandboxes`);
    return sandboxes;
  },
  updateSandbox: async (userId: string, data: SandboxUpdateData) => {
    let sandboxes = await list.sandboxes(userId);
    sandboxes = sandboxes.filter((sandbox) => {
      return !(sandbox.status == "UPDATING" && sandbox.data.id == data.id);
    });
    if (sandboxes.length > 0) {
      await redisClient.set(
        `${userId}:sandboxes`,
        JSON.stringify(sandboxes),
        "EX",
        redisKeyExpireTime
      );
    } else await redisClient.del(`${userId}:sandboxes`);
    return sandboxes;
  },
  removeSandbox: async (userId: string, data: SandboxRemoveData) => {
    let sandboxes = await list.sandboxes(userId);
    sandboxes = sandboxes.filter((sandbox) => {
      return !(sandbox.status == "REMOVING" && sandbox.data.id == data.id);
    });
    if (sandboxes.length > 0)
      await redisClient.set(
        `${userId}:sandboxes`,
        JSON.stringify(sandboxes),
        "EX",
        redisKeyExpireTime
      );
    else await redisClient.del(`${userId}:sandboxes`);
    return sandboxes;
  },
  createWorkspace: async (userId: string, data: WorkspaceCreateData) => {
    let workspaces = await list.workspaces(userId);
    // remove the CREATING workspace
    workspaces = workspaces.filter((workspace) => {
      if (
        data.cause == "ENV_CREATE" ||
        data.cause == "TEMPLATE_CREATE" ||
        data.cause == "SANDBOX_CREATE"
      ) {
        return !(
          workspace.status == "CREATING" &&
          workspace.data.cause == data.cause &&
          workspace.data.title == data.title
        );
      } else if (
        data.cause == "ENV_UPDATE" ||
        data.cause == "TEMPLATE_UPDATE" ||
        data.cause == "SANDBOX_UPDATE"
      ) {
        return !(
          workspace.status == "CREATING" &&
          workspace.data.cause == data.cause &&
          workspace.data.id == data.id
        );
      } else if (
        data.cause == "TEMPLATE_START_WORKSPACE" ||
        data.cause == "SANDBOX_START_WORKSPACE" ||
        data.cause == "WORKSPACE_START"
      ) {
        return !(
          workspace.status == "CREATING" &&
          workspace.data.cause == data.cause &&
          workspace.data.id == data.id
        );
      }
    });
    if (workspaces.length > 0)
      await redisClient.set(
        `${userId}:workspaces`,
        JSON.stringify(workspaces),
        "EX",
        redisKeyPersistKeyExpireTime
      );
    else await redisClient.del(`${userId}:workspaces`);
    return workspaces;
  },

  removeWorkspace: async (userId: string, data: WorkspaceRemoveData) => {
    let workspaces = await list.workspaces(userId);
    workspaces = workspaces.filter((workspace) => {
      return !(workspace.status == "REMOVING" && workspace.data.id == data.id);
    });
    if (workspaces.length > 0)
      await redisClient.set(
        `${userId}:workspaces`,
        JSON.stringify(workspaces),
        "EX",
        redisKeyPersistKeyExpireTime
      );
    else await redisClient.del(`${userId}:workspaces`);
    return workspaces;
  },
  patchedWorkspace: async (userId: string, id: string) => {
    let workspaces = await list.workspaces(userId);
    workspaces = workspaces.filter((workspace) => {
      return !(workspace.status == "RUNNING" && workspace.data.id == id);
    });
    if (workspaces.length > 0)
      await redisClient.set(
        `${userId}:workspaces`,
        JSON.stringify(workspaces),
        "EX",
        redisKeyPersistKeyExpireTime
      );
    else await redisClient.del(`${userId}:workspaces`);
    return workspaces;
  },
  createTemplate: async (userId: string, data: TemplateCreateData) => {
    let templates = await list.templates(userId);
    templates = templates.filter((template) => {
      return !(
        template.status == "CREATING" && data.title == template.data.title
      );
    });
    if (templates.length > 0)
      await redisClient.set(
        `${userId}:templates`,
        JSON.stringify(templates),
        "EX",
        redisKeyExpireTime
      );
    else await redisClient.del(`${userId}:templates`);
    return templates;
  },
  updateTemplate: async (userId: string, data: TemplateUpdateData) => {
    let templates = await list.templates(userId);
    templates = templates.filter((template) => {
      return !(template.status == "UPDATING" && data.id == template.data.id);
    });
    if (templates.length > 0)
      await redisClient.set(
        `${userId}:templates`,
        JSON.stringify(templates),
        "EX",
        redisKeyExpireTime
      );
    else await redisClient.del(`${userId}:templates`);
    return templates;
  },
  removeTemplate: async (userId: string, data: TemplateRemoveData) => {
    let templates = await list.templates(userId);
    templates = templates.filter((template) => {
      return !(template.status == "REMOVING" && template.data.id == data.id);
    });
    await redisClient.set(
      `${userId}:templates`,
      JSON.stringify(templates),
      "EX",
      redisKeyExpireTime
    );
  },
  createEnvironment: async (userId: string, data: EnvironmentCreateData) => {
    let environments = await list.environments(userId);
    environments = environments.filter((env) => {
      return !(env.status == "CREATING" && env.data.title == data.title);
    });
    if (environments.length > 0)
      await redisClient.set(
        `${userId}:environments`,
        JSON.stringify(environments),
        "EX",
        redisKeyExpireTime
      );
    else await redisClient.del(`${userId}:environments`);
    return environments;
  },
  updateEnvironment: async (userId: string, data: EnvironmentUpdateData) => {
    let environments = await list.environments(userId);
    environments = environments.filter((env) => {
      return !(env.status == "UPDATING" && env.data.id == data.id);
    });
    if (environments.length > 0)
      await redisClient.set(
        `${userId}:environments`,
        JSON.stringify(environments),
        "EX",
        redisKeyExpireTime
      );
    else await redisClient.del(`${userId}:environments`);
    return environments;
  },
  removeEnvironment: async (userId: string, data: EnvironmentRemoveData) => {
    let environments = await list.environments(userId);
    environments = environments.filter((env) => {
      return !(env.status == "REMOVING" && env.data.id == data.id);
    });
    if (environments.length > 0)
      await redisClient.set(
        `${userId}:environments`,
        JSON.stringify(environments),
        "EX",
        redisKeyExpireTime
      );
    else await redisClient.del(`${userId}:environments`);
    return environments;
  },
};

/**
 * list data from redis
 */
const list = {
  sandboxes: async (userId: string) => {
    const v = await redisClient.get(`${userId}:sandboxes`);
    return (v ? JSON.parse(v) : []) as Sandbox[];
  },
  workspaces: async (userId: string) => {
    const v = await redisClient.get(`${userId}:workspaces`);
    return (v ? JSON.parse(v) : []) as Workspace[];
  },
  environments: async (userId: string) => {
    const v = await redisClient.get(`${userId}:environments`);
    return (v ? JSON.parse(v) : []) as Environment[];
  },
  templates: async (userId: string) => {
    const v = await redisClient.get(`${userId}:templates`);
    return (v ? JSON.parse(v) : []) as Template[];
  },
};

const patch = {
  /**
   * if status is creating, it will not be found in the golang response.
   * if status is updating, the data of the sandbox is not updated.
   * if status is removing, it will be found in the golang response.
   * the data returned should the loading state with updated data.
   * if status is creating, it should be appended to the list.
   * if status is updating, the value should be updated.
   * if status is removing, keep it but status should be `REMOVING`.
   */
  sandboxes: async (userId: string, apiSandboxes: ApiSandbox[]) => {
    const patched = [...apiSandboxes];
    const sandboxes = await redisHelper.list.sandboxes(userId);
    for (let sandbox of sandboxes) {
      if (sandbox.status == "CREATING") {
        patched.push({
          id: "",
          title: sandbox.data.title,
          description: sandbox.data.imageId,
          imageId: sandbox.data.imageId,
          sandboxesId: "",
          status: "CREATING",
        });
      }
      if (sandbox.status == "UPDATING") {
        const index = patched.findIndex(
          (si) => si.id == (sandbox.data as SandboxUpdateData).id
        );
        if (index != -1) {
          patched.splice(index, 1, {
            ...patched[index],
            id: sandbox.data.id,
            title: sandbox.data.title,
            description: sandbox.data.description,
            status: "UPDATING",
          });
        }
      }
      if (sandbox.status == "REMOVING") {
        const index = patched.findIndex(
          (si) => si.id == (sandbox.data as SandboxUpdateData).id
        );
        if (index != -1) {
          patched[index].status = "REMOVING";
        }
      }
    }
    return patched;
  },
  /**
   * if the environment is creating, insert it
   * if the environment is updating, update the value
   * if the environment is removing, set the status to `REMOVING`
   *
   * @param userId
   * @param apiEnvironments
   */
  environments: async (userId: string, apiEnvironments: ApiEnvironment[]) => {
    const patched = [...apiEnvironments];
    const environments = await list.environments(userId);
    for (let env of environments) {
      if (env.status == "CREATING") {
        patched.push({
          id: "",
          imageId: "",
          libraries: "",
          environmentName: env.data.title,
          description: env.data.description,
          status: "CREATING",
        });
      }
      if (env.status == "UPDATING") {
        const index = patched.findIndex(
          (e) => e.id == (env.data as EnvironmentUpdateData).id
        );
        if (index != -1) {
          patched.splice(index, 1, {
            ...patched[index],
            id: env.data.id,
            environmentName: env.data.title,
            description: env.data.description,
            imageId: "",
            status: "UPDATING",
          });
        }
      }
      if (env.status == "REMOVING") {
        const index = patched.findIndex(
          (si) => si.id == (env.data as EnvironmentRemoveData).id
        );
        if (index != -1) {
          patched[index].status = "REMOVING";
        }
      }
    }
    return patched;
  },
  templates: async (userId: string, apiTemplates: ApiTemplate[]) => {
    const patched = [...apiTemplates];
    const templates = await list.templates(userId);
    for (let template of templates) {
      if (template.status == "CREATING") {
        patched.push({
          id: "",
          name: template.data.title,
          description: template.data.description,
          imageId: "",
          environment_id: template.data.environmentId,
          assignment_config_id: "",
          storage: "",
          containerID: "",
          isExam: template.data.isExam,
          active: false,
          timeLimit: template.data.timeLimit,
          allow_notification: false,
          status: "CREATING",
        });
      }
      if (template.status == "UPDATING") {
        const index = patched.findIndex(
          (t) => t.id == (template.data as TemplateUpdateData).id
        );
        if (index != -1) {
          patched.splice(index, 1, {
            ...patched[index],
            id: template.data.id,
            description: template.data.description,
            name: template.data.title,
            imageId: "",
            status: "UPDATING",
          });
        }
      }
      if (template.status == "REMOVING") {
        const index = patched.findIndex(
          (si) => si.id == (template.data as TemplateRemoveData).id
        );
        if (index != -1) {
          patched[index].status = "REMOVING";
        }
      }
    }
    return patched;
  },
  /**
   * if the state is CREATING, append the apiworkspaces
   * if the state is RUNNING, modify the data
   * if the state is REMOVING, add status REMOVING
   * @param userId
   * @param apiWorkspaces
   * @returns
   */
  workspaces: async (userId: string, apiWorkspaces: ApiWorkspace[]) => {
    const patched = [...apiWorkspaces];
    const workspaces = await list.workspaces(userId);
    for (let workspace of workspaces) {
      if (workspace.status == "CREATING") {
        if (
          workspace.data.cause == "ENV_CREATE" ||
          workspace.data.cause == "TEMPLATE_CREATE" ||
          workspace.data.cause == "SANDBOX_CREATE"
        ) {
          patched.push({
            title: workspace.data.title,
            subTitle: "",
            startAt: "",
            containerID: "",
            type:
              (workspace.data.cause == "ENV_CREATE" && "ENV") ||
              (workspace.data.cause == "SANDBOX_CREATE" && "SANDBOX") ||
              (workspace.data.cause == "TEMPLATE_CREATE" && "TEMPLATE") ||
              undefined,
            sourceId: "",
            isTemporary: true,
            status: "CREATING",
          });
        }
        if (
          workspace.data.cause == "ENV_UPDATE" ||
          workspace.data.cause == "SANDBOX_UPDATE" ||
          workspace.data.cause == "TEMPLATE_UPDATE"
        ) {
          // all the data need to be trace using the sourceId
          patched.push({
            title: "",
            subTitle: "",
            startAt: "",
            containerID: "",
            type:
              (workspace.data.cause == "ENV_UPDATE" && "ENV") ||
              (workspace.data.cause == "SANDBOX_UPDATE" && "SANDBOX") ||
              (workspace.data.cause == "TEMPLATE_UPDATE" && "TEMPLATE") ||
              undefined,
            sourceId: workspace.data.id,
            isTemporary: true,
            status: "CREATING",
          });
        }
        if (
          workspace.data.cause == "WORKSPACE_START" ||
          workspace.data.cause == "SANDBOX_START_WORKSPACE" ||
          workspace.data.cause == "TEMPLATE_START_WORKSPACE"
        ) {
          patched.push({
            // all data need to be trace using the sourceId
            title: "",
            subTitle: "",
            startAt: "",
            containerID: "",
            type:
              (workspace.data.cause == "SANDBOX_START_WORKSPACE" &&
                "SANDBOX") ||
              (workspace.data.cause == "TEMPLATE_START_WORKSPACE" &&
                "TEMPLATE") ||
              (workspace.data.cause == "WORKSPACE_START" &&
                "STUDENT_WORKSPACE") ||
              undefined,
            sourceId: workspace.data.id,
            isTemporary: false,
            status: "CREATING",
          });
        }
      }
      if (workspace.status == "RUNNING") {
        const index = patched.findIndex(
          (w) => w.containerID == (workspace.data as WorkspaceRunningData).id
        );
        if (index != -1) {
          const cause = workspace.data.createData.cause;
          patched.splice(index, 1, {
            ...patched[index],
            title:
              ((cause == "ENV_CREATE" ||
                cause == "SANDBOX_CREATE" ||
                cause == "TEMPLATE_CREATE") &&
                workspace.data.createData.title) ||
              patched[index].title,
            type: workspace.data.type,
            sourceId:
              ((cause == "ENV_UPDATE" ||
                cause == "TEMPLATE_UPDATE" ||
                cause == "SANDBOX_UPDATE" ||
                cause == "SANDBOX_START_WORKSPACE" ||
                cause == "TEMPLATE_START_WORKSPACE" ||
                cause == "WORKSPACE_START") &&
                workspace.data.createData.id) ||
              undefined,
            isTemporary: workspace.data.isTemporary,
            status: undefined,
          });
        }
      }
      if (workspace.status == "REMOVING") {
        const index = patched.findIndex(
          (w) => w.containerID == (workspace.data as WorkspaceRemoveData).id
        );
        if (index != -1) {
          patched[index].status = "REMOVING";
        }
      }
    }
    return patched;
  },
};

/**
 * redis serve as a patch to the missing server state in backend.
 * use this helper to intercept each API.
 *
 * @remark The redis key schema recognise 4 types of Cnails object :
 * `workspace(containers)`, `template`, `environment` and `sandbox`. It doesn't follow
 * the original naming convention in the backend to simplify the data structure
 * such that everything can be more organized. To see examples of how to use this
 * helper, just go to the API routes.
 */
const redisHelper = {
  insert,
  remove,
  list,
  patch,
};

export default redisHelper;
