import React, { createContext, useContext, useEffect, useState } from "react";
import myToast from "../components/CustomToast";
import { useCancelablePromise } from "../components/useCancelablePromise";
import { SandboxImageListResponse } from "../lib/api/api";
import { sandboxAPI } from "../lib/api/sandboxAPI";
import { SandboxImage } from "../lib/cnails";
import { errorToToastDescription } from "../lib/errorHelper";
import { patchSandboxes } from "../lib/sandboxHelper";
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
        console.log("fetch")
        const afterResponse = (response: SandboxImageListResponse) => {
            if (response.success) {
                console.log(response)
                const sandboxImages = patchSandboxes(response.sandboxImages as SandboxImage[], containers)
                console.log(sandboxImages)
                setSandboxImages(sandboxImages);
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
            console.log("cakked", response)
            return afterResponse(response)
        } catch (error) {
            if (error.isCanceled) {
                return afterResponse(error.value as SandboxImageListResponse)
            }
            else {
                console.error(error)
            }
        }

    }

    useEffect(() => {
        if (sandboxImages != undefined) {
            setSandboxImages(sandboxImages => {
                console.log(patchSandboxes(sandboxImages, containers))
                return patchSandboxes(sandboxImages, containers)
            })
        }
    }, [containers])

    useEffect(() => {
        fetchSandboxImages()
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