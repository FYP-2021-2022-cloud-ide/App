import _, { template } from "lodash";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import toast, { useToaster } from "react-hot-toast";
import myToast from "../components/CustomToast";
import TempContainerToast from "../components/TempContainerToast";
import useInterval from "../hooks/useInterval";
import {
  SandboxAddRequest,
  ContainerAddRequest,
  AddTemplateContainerRequest,
  ContainerAddResponse,
  SuccessStringResponse,
} from "../lib/api/api";
import { containerAPI } from "../lib/api/containerAPI";
import { envAPI } from "../lib/api/envAPI";
import { generalAPI } from "../lib/api/generalAPI";
import { sandboxAPI } from "../lib/api/sandboxAPI";
import { templateAPI } from "../lib/api/templateAPI";
import { Container } from "../lib/cnails";
import { getType, isTemporary } from "../lib/containerHelper";
import { errorToToastDescription } from "../lib/errorHelper";
import { useCnails } from "./cnails";
import { useWarning } from "./warning";
import useIsFirstRender from "../hooks/useIsFirstRender";

const defaultQuota = Number(3); // process.env.CONTAINERSLIMIT

interface ContainerProviderProps {
  children: JSX.Element;
}

type ContainerContextState = {
  containers: Container[];
  setContainers: React.Dispatch<React.SetStateAction<Container[]>>;
  setContainerStatus: (id: string, status: Container["status"]) => void;
  /**
   * a function to fetch the new container list.
   * It will update the context and hence update all affected UI.
   * Therefore, even if this function will return an array of containers,
   * using the returned value is not suggested. You should use the `containers`
   * from the context instead.
   */
  fetchContainers: () => Promise<Container[]>;
  containerQuota: number;

  /**
   * if `onOK` is provided, `onOK` will be called after container is created.
   * Else a default success toast will show up
   */
  createContainer: (
    _req: ContainerAddRequest | SandboxAddRequest | AddTemplateContainerRequest
  ) => Promise<void>;
  removeContainer: (containerId: string) => Promise<void>;
  onCommitRef: React.MutableRefObject<(() => any)[]>;
  commitTemporaryContainer: (containerId) => Promise<void>;
};

const ContainerContext = React.createContext({} as ContainerContextState);

/**
 * This is a global context that you can use anywhere in the app
 * @returns
 */
export const useContainers = () => useContext(ContainerContext);

export const ContainerProvider = ({ children }: ContainerProviderProps) => {
  const isFirstRender = useIsFirstRender();
  const { sub, userId } = useCnails();
  const { toasts } = useToaster();
  const [containers, setContainers] = useState<Container[]>();
  const onCommitRef = useRef<(() => any)[]>([]);
  const [containerQuota, setContainerQuota] = useState<number>(defaultQuota);
  const { getEnv } = generalAPI;

  const setContainerStatus = useCallback(
    (id: string, status: Container["status"]) => {
      if (id)
        setContainers((containers) => {
          return containers.map((c) => {
            if (c.id == id) {
              return {
                ...c,
                status: status,
              };
            } else return c;
          });
        });
    },
    [setContainers]
  );

  /**
   * internal fetchContainer
   */
  const fetchContainers = async () => {
    const response = await containerAPI.listContainers(sub);
    if (response.success) {
      const newContainers = response.containers
        .filter((container) => Boolean(container.redisPatch))
        .map(
          (container) =>
            ({
              ...container,
              id: container.containerId,
              isTemporary: isTemporary(container.redisPatch.cause),
              redisPatch: container.redisPatch,
              type: getType(container.redisPatch.cause),
              status: container.containerId ? "DEFAULT" : "CREATING",
            } as Container)
        );
      if (!_.isEqual(containers, newContainers)) {
        if (containers) {
          for (let container of containers) {
            if (newContainers.every((c) => c.id != container.id))
              // cannot find the container, then we need to dismiss the toast
              myToast.dismiss(container.id);
          }
        }
        for (let container of newContainers) {
          if (
            container.id &&
            container.redisPatch.containerId &&
            container.isTemporary &&
            toasts.every((toast) => toast.id != container.id)
          ) {
            if (isFirstRender)
              myToast.warning(
                "You have uncommited temporary workspaces. They will hold your workspace quota. If you don't plan to persist the changes in the programming environment, remember to stop the them."
              );
            myToast.tempContainer(container);
          }
          console.log("containers are different", newContainers);
        }
        setContainers(newContainers);
      }

      return newContainers;
    } else {
      console.error(
        "[ ❌ ] : fail to fetch containers' information ",
        response
      );
    }
  };

  async function createContainer(
    _req: ContainerAddRequest | SandboxAddRequest | AddTemplateContainerRequest
  ) {
    if (containers.length == containerQuota) {
      myToast.error({
        title: `You have met your simultaneous workspace quota. Fail to start workspace.`,
        description: `You can have at most ${containerQuota}`,
      });
      return;
    }
    let response: ContainerAddResponse;
    if (_req.event == "SANDBOX_START_WORKSPACE") {
      const req = _req as SandboxAddRequest;
      response = await myToast.promise(
        "Starting the personal workspace...",
        sandboxAPI.addSandbox(req)
      );
    } else if (
      _req.event == "TEMPLATE_START_WORKSPACE" ||
      _req.event == "WORKSPACE_START"
    ) {
      const req = _req as AddTemplateContainerRequest;
      response = await myToast.promise(
        "Starting the workspace for this template...",
        templateAPI.addTemplateContainer(req)
      );
    } else {
      const req = _req as ContainerAddRequest;
      response = await myToast.promise(
        "Starting a temporary workspace...",
        containerAPI.addTempContainer(req)
      );
    }
    await fetchContainers();
    if (response.success) {
      if (
        _req.event == "SANDBOX_START_WORKSPACE" ||
        _req.event == "TEMPLATE_START_WORKSPACE"
      ) {
        myToast.success("Workspace is successfully started.");
      }
    } else
      myToast.error({
        title: "Fail to create temporary workspace",
        description: errorToToastDescription(response.error),
      });
  }

  const removeContainer = useCallback(
    async function removeContainer(containerId: string) {
      const container = containers.find(
        (container) => container.id == containerId
      );
      setContainerStatus(container.id, "REMOVING");
      let response: SuccessStringResponse;
      if (container.isTemporary) {
        response = await myToast.promise(
          "Stopping the workspace...",
          containerAPI.removeTempContainer({
            containerId,
            sub,
          })
        );
      } else if (container.redisPatch.cause == "SANDBOX_START_WORKSPACE") {
        // it is a sandbox
        response = await myToast.promise(
          "Stopping the workspace...",
          sandboxAPI.removeSandbox({
            containerId,
            userId,
          })
        );
      } else {
        // it is a template container
        response = await myToast.promise(
          "Stopping the workspace...",
          templateAPI.removeTemplateContainer({
            containerId,
            sub: sub,
          })
        );
      }
      if (response.success) {
        myToast.success("Workspace is successfully removed.");
      } else
        myToast.error({
          title: `Fail to stop workspace`,
          description: errorToToastDescription(response.error),
        });
      await fetchContainers();
    },
    [containers, fetchContainers]
  );

  const commitTemporaryContainer = useCallback(
    async (containerId: string) => {
      const container = containers.find(
        (container) => container.id == containerId
      );
      console.log(`commiting...`, container);
      if (container.redisPatch.cause == "TEMPLATE_UPDATE") {
        const response = await myToast.promise(
          "Updating the templates...",
          templateAPI.updateTemplate(container.redisPatch.data)
        );
        if (response.success)
          myToast.success("Template is successfully updated.");
        else
          myToast.error({
            title: "Fail to update template",
            description: errorToToastDescription(response.error),
          });
      } else if (container.redisPatch.cause == "SANDBOX_UPDATE") {
        const response = await myToast.promise(
          "Updating the environment setup of the personal workspace...",
          sandboxAPI.updateSandboxImage(container.redisPatch.data)
        );
        if (response.success)
          myToast.success("workspace is successfully updated.");
        else
          myToast.error({
            title: "Fail to update workspace",
            description: errorToToastDescription(response.error),
          });
      } else if (container.redisPatch.cause == "ENV_UPDATE") {
        const response = await myToast.promise(
          "Updating the environment...",
          envAPI.updateEnvironment(container.redisPatch.data)
        );
        if (response.success)
          myToast.success("Environment is successfully updated.");
        else
          myToast.error({
            title: "Fail to update environment",
            description: errorToToastDescription(response.error),
          });
      } else if (container.redisPatch.cause == "ENV_CREATE") {
        const response = await myToast.promise(
          "Building a custom environment...",
          envAPI.buildEnvironment(container.redisPatch.data)
        );
        if (response.success) {
          myToast.success("Environment is created successfully.");
        } else {
          myToast.error({
            title: "Fail to create environment.",
            description: errorToToastDescription(response.error),
          });
        }
      } else if (container.redisPatch.cause == "TEMPLATE_CREATE") {
        const response = await myToast.promise(
          "Building your templates...",
          templateAPI.addTemplate(container.redisPatch.data)
        );
        if (response.success) {
          myToast.success("Template is created successfully");
        } else {
          myToast.error({
            title: "Fail to create template",
            description: errorToToastDescription(response.error),
          });
        }
      }
      for (let f of onCommitRef.current) {
        await f();
      }
      await fetchContainers();
    },
    [containers, fetchContainers]
  );

  const getContainerQuotaFromEnv = async () => {
    const response = await getEnv();
    setContainerQuota(parseInt(response.Containers_limit));
  };

  /**
   * container will be fetch every 10 seconds
   */
  useInterval(() => {
    fetchContainers();
  }, 10 * 1000);

  /**
   * this hook fetch containers once when first render
   */
  useEffect(() => {
    fetchContainers();
    getContainerQuotaFromEnv();
  }, []);

  if (!containers || !containerQuota) return <></>;

  return (
    <ContainerContext.Provider
      value={{
        containers,
        setContainers,
        setContainerStatus,
        fetchContainers,
        containerQuota,
        createContainer,
        removeContainer,
        onCommitRef,
        commitTemporaryContainer,
      }}
    >
      {children}
    </ContainerContext.Provider>
  );
};
