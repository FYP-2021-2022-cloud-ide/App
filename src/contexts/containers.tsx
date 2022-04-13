import _ from "lodash";
import React, { useContext, useEffect, useState } from "react";
import myToast from "../components/CustomToast";
import TempContainerToast from "../components/TempContainerToast";
import useInterval from "../hooks/useInterval";
import {
  SandboxAddRequest,
  ContainerAddRequest,
  AddTemplateContainerRequest,
  ContainerAddResponse,
  ContainerRemoveRequest,
  SuccessStringResponse,
} from "../lib/api/api";
import { containerAPI } from "../lib/api/containerAPI";
import { generalAPI } from "../lib/api/generalAPI";
import { sandboxAPI } from "../lib/api/sandboxAPI";
import { templateAPI } from "../lib/api/templateAPI";
import { Container } from "../lib/cnails";
import { CLICK_TO_DISMISS, CLICK_TO_REPORT } from "../lib/constants";
import { getType, isTemporary } from "../lib/containerHelper";
import { errorToToastDescription } from "../lib/errorHelper";
import { AddTempContainerReply } from "../proto/dockerGet/dockerGet";
import { useCnails } from "./cnails";
import { useWarning } from "./warning";

const defaultQuota = Number(3); // process.env.CONTAINERSLIMIT

interface ContainerProviderProps {
  children: JSX.Element;
}

type ContainerContextState = {
  containers: Container[];
  getContainer: (id: string) => Container;
  setContainers: React.Dispatch<React.SetStateAction<Container[]>>;
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
    _req: ContainerAddRequest | SandboxAddRequest | AddTemplateContainerRequest,
    onOK?: (containerId: string) => void
  ) => Promise<void>;
  removeContainer: (containerId: string) => Promise<void>;
};

const ContainerContext = React.createContext({} as ContainerContextState);

/**
 * This is a global context that you can use anywhere in the app
 * @returns
 */
export const useContainers = () => useContext(ContainerContext);

export const ContainerProvider = ({ children }: ContainerProviderProps) => {
  const { sub, userId } = useCnails();
  const [containers, setContainers] = useState<Container[]>();
  const [containerQuota, setContainerQuota] = useState<number>(defaultQuota);
  const { waitForConfirm } = useWarning();
  const { getEnv } = generalAPI;

  const getContainer = (id: string) => containers.find((c) => c.id == id);

  /**
   * internal fetchContainer
   */
  const fetchContainers = async () => {
    const response = await containerAPI.listContainers(sub);
    if (response.success) {
      const newContainers = response.containers.map((container) =>
        container.redisPatch
          ? ({
              ...container,
              id: container.containerId,
              isTemporary: isTemporary(container.redisPatch.cause),
              redisPatch: container.redisPatch,
              type: getType(container.redisPatch.cause),
              status: container.containerId ? "DEFAULT" : "CREATING",
            } as Container)
          : ({
              ...container,
              isTemporary: false,
              type: "UNKNOWN",
              redisPatch: {},
              status: "DEFAULT",
            } as unknown as Container)
      );
      if (!_.isEqual(containers, newContainers)) {
        console.log("containers are different", newContainers);
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
    _req: ContainerAddRequest | SandboxAddRequest | AddTemplateContainerRequest,
    onOK?: (containerId: string) => void
  ) {
    if (containers.length == containerQuota) {
      myToast.error({
        title: `You have met your simultaneous workspace quota. Fail to start workspace.`,
        description: `You can have at most ${containerQuota}`,
      });
      return;
    }
    let response: ContainerAddResponse;
    let toastId: string;
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
    if (response.success)
      if (onOK) {
        onOK(response.containerId);
      } else {
        myToast.success("Workspace is successfully started.");
      }
    else
      myToast.error({
        title: "Fail to create temporary workspace",
        description: errorToToastDescription(response.error),
      });
  }

  async function removeContainer(containerId: string) {
    const container = getContainer(containerId);
    let response: SuccessStringResponse;
    if (container.isTemporary) {
      response = await myToast.promise(
        "Stopping the workspace...",
        containerAPI.removeTempContainer({
          containerId,
          sub,
        })
      );
    }
    if (container.redisPatch.cause == "SANDBOX_START_WORKSPACE") {
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
    if (response.success) myToast.success("Workspace is successfully removed.");
    else
      myToast.error({
        title: `Fail to stop workspace`,
        description: errorToToastDescription(response.error),
      });
    await fetchContainers();
  }

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

  useEffect(() => {
    fetchContainers();

    getContainerQuotaFromEnv();
  }, []);

  if (!containers || !containerQuota) return <></>;
  return (
    <ContainerContext.Provider
      value={{
        containers,
        getContainer,
        setContainers,
        fetchContainers,
        containerQuota,
        createContainer,
        removeContainer,
      }}
    >
      {children}
    </ContainerContext.Provider>
  );
};
