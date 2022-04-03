import React, { createContext, useContext, useEffect, useState } from "react";
import myToast from "../components/CustomToast";
import { useCancelablePromise } from "../components/useCancelablePromise";
import { SandboxImageListResponse } from "../lib/api/api";
import { sandboxAPI } from "../lib/api/sandboxAPI";
import { SandboxImage } from "../lib/cnails";
import { errorToToastDescription } from "../lib/errorHelper";
import { apiSandboxesToUiSandboxes, patchSandboxes } from "../lib/sandboxHelper";
import { useCnails } from "./cnails";

type SandboxContextState = {
    sandboxImages: SandboxImage[];
    setSandboxImages: React.Dispatch<React.SetStateAction<SandboxImage[]>>;
    /**
  * a function to fetch the new sandboxImages list.
  * It will update the context and hence update all affected UI.
  * Therefore, even if this function will return an array of sandboxImages, 
  * using the returned value is not suggested. You should use the `sandboxImages`
  * from the context instead.
  */
    fetchSandboxImages: () => Promise<SandboxImage[]>
}

const SandboxContext = createContext({} as SandboxContextState)
export const useSandbox = () => useContext(SandboxContext)

export const SandboxProvider = ({
    children,
}: {
    children: JSX.Element;
}) => {
    const { userId, containers } = useCnails()
    const [sandboxImages, setSandboxImages] = useState<SandboxImage[]>();
    const { cancelablePromise } = useCancelablePromise()
    const { listSandboxImages } = sandboxAPI
    async function fetchSandboxImages() {
        const afterResponse = (response: SandboxImageListResponse, mount: boolean = true) => {
            if (response.success) {
                const sandboxImages = patchSandboxes(apiSandboxesToUiSandboxes(response.sandboxImages), containers)
                if (mount) setSandboxImages(sandboxImages);
                return sandboxImages
            } else {
                myToast.error({
                    title: "Personal workspaces cannot be fetched",
                    description: errorToToastDescription(response.error),
                });
            }
        }
        let response: SandboxImageListResponse;
        try {
            response = await cancelablePromise(listSandboxImages(userId));
            return afterResponse(response)
        } catch (error) {
            if (error.isCanceled) {
                return afterResponse(error.value as SandboxImageListResponse, false)
            }
            else {
                console.error(error)
            }
        }

    }

    /** 
     * this hook will change the status of the sandboxes base on the change in containers
     */
    useEffect(() => {
        if (sandboxImages && containers) {
            setSandboxImages(sandboxImages => patchSandboxes(sandboxImages, containers))
        }
    }, [containers])

    /**
     * this hook will fetch the sandboxes on render
     */
    useEffect(() => {
        if (containers) {
            fetchSandboxImages()
        }
    }, [])

    if (!sandboxImages) return <></>;
    return <SandboxContext.Provider value={{
        sandboxImages,
        setSandboxImages,
        fetchSandboxImages
    }}>
        {
            children
        }
    </SandboxContext.Provider>

}