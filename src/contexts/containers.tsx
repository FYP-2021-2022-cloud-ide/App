import _ from "lodash";
import React, { useContext, useEffect, useState } from "react";
import myToast from "../components/CustomToast";
import TempContainerToast from "../components/TempContainerToast";
import useInterval from "../components/useInterval";
import { SandboxAddRequest, ContainerAddRequest, AddTemplateContainerRequest, ContainerAddResponse } from "../lib/api/api";
import { containerAPI } from "../lib/api/containerAPI";
import { generalAPI } from "../lib/api/generalAPI";
import { sandboxAPI } from "../lib/api/sandboxAPI";
import { templateAPI } from "../lib/api/templateAPI";
import { Container } from "../lib/cnails";
import { CLICK_TO_REPORT } from "../lib/constants";
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
    createContainer: (_req: ContainerAddRequest | SandboxAddRequest | AddTemplateContainerRequest, onOK: (containerId: string) => void) => Promise<void>
}

const ContainerContext = React.createContext({} as ContainerContextState);

/**
 * This is a global context that you can use anywhere in the app
 * @returns 
 */
export const useContainers = () => useContext(ContainerContext)

export const ContainerProvider = ({ children }: ContainerProviderProps) => {
    const { sub } = useCnails()
    const [containers, setContainers] = useState<Container[]>();
    const [containerQuota, setContainerQuota] = useState<number>(defaultQuota);
    const { listContainers, addTempContainer, removeTempContainer } = containerAPI;
    const { waitForConfirm } = useWarning()
    const { addSandbox, removeSandbox } = sandboxAPI
    const { addTemplateContainer, removeTemplateContainer } = templateAPI
    const { getEnv } = generalAPI;

    /**
     * internal fetchContainer 
     */
    const fetchContainers = async () => {
        const response = await listContainers(sub);
        if (response.success) {
            const newContainers = response.containers.map(container => (container.redisPatch ? {
                ...container,
                isTemporary: isTemporary(container.redisPatch.cause),
                redisPatch: container.redisPatch,
                type: getType(container.redisPatch.cause),
                status: container.containerId ? "DEFAULT" : "CREATING",
            } as Container : {
                ...container,
                isTemporary: false,
                type: "UNKNOWN",
                redisPatch: {},
                status: "DEFAULT"
            } as unknown as Container))
            if (!_.isEqual(containers, newContainers)) {
                console.log("containers are different", newContainers)
                setContainers(newContainers);
            }

            return newContainers
        } else {
            console.error(
                "[ ❌ ] : fail to fetch containers' information ",
                response
            );
        }
    };

    async function createContainer(_req: ContainerAddRequest | SandboxAddRequest | AddTemplateContainerRequest, onOK: (containerId: string) => void) {
        let response: ContainerAddResponse
        let toastId: string
        if (_req.event == "SANDBOX_START_WORKSPACE") {
            toastId = myToast.loading("Starting the personal workspace...")
            const req = _req as SandboxAddRequest
            response = await addSandbox(req)
        } else if (_req.event == "TEMPLATE_START_WORKSPACE" || _req.event == "WORKSPACE_START") {
            toastId = myToast.loading("Starting the workspace for this template...")
            const req = _req as AddTemplateContainerRequest
            response = await addTemplateContainer(req)
        } else {
            toastId = myToast.loading("Starting a temporary workspace")
            const req = _req as ContainerAddRequest
            response = await addTempContainer(req);
        }
        // the container is created 
        myToast.dismiss(toastId);
        await fetchContainers();
        if (response.success)
            onOK(response.containerId)
        else
            myToast.error({
                title: "Fail to create temporary workspace",
                description: errorToToastDescription(response.error),
                comment: CLICK_TO_REPORT,
            })
    }

    const getContainerQuotaFromEnv = async () => {
        const response = await getEnv();
        setContainerQuota(parseInt(response.Containers_limit));
    }

    /**
   * container will be fetch every 10 seconds 
   */
    useInterval(() => {
        fetchContainers()
    }, 10 * 1000)

    useEffect(() => {
        fetchContainers();
        getContainerQuotaFromEnv()
    }, [])

    if (!containers || !containerQuota) return <></>
    return <ContainerContext.Provider value={{
        containers,
        setContainers,
        fetchContainers,
        containerQuota,
        createContainer
    }}>
        {children}
    </ContainerContext.Provider>
}