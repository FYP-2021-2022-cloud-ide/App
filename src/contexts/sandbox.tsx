import React, { createContext, useContext, useEffect, useState } from "react";
import myToast from "../components/CustomToast";
import { useCancelablePromise } from "../components/useCancelablePromise";
import { SandboxImageListResponse } from "../lib/api/api";
import { sandboxAPI } from "../lib/api/sandboxAPI";
import { SandboxImage } from "../lib/cnails";
import { CLICK_TO_REPORT } from "../lib/constants";
import { errorToToastDescription } from "../lib/errorHelper";
import { apiSandboxesToUiSandboxes, patchSandboxes } from "../lib/sandboxHelper";
import { useCnails } from "./cnails";
import { useContainers } from "./containers";

type SandboxContextState = {
    sandboxImages: SandboxImage[];
    getSandboxImage: (id: string) => SandboxImage;
    setSandboxImages: React.Dispatch<React.SetStateAction<SandboxImage[]>>;
    /**
     * a function to fetch the new sandboxImages list.
     * It will update the context and hence update all affected UI.
     * Therefore, even if this function will return an array of sandboxImages, 
     * using the returned value is not suggested. You should use the `sandboxImages`
     * from the context instead.
     */
    fetchSandboxImages: () => Promise<SandboxImage[]>

    createSandboxImage: (name: string, description: string, imageId: string) => Promise<void>
    updateSandboxImageInfo: (sandboxImageId: string, name: string, description: string) => Promise<void>;
    updateSandboxImageInternal: (sandboxImageId: string, containerId: string) => void;
    removeSandboxImage: (sandboxImageId: string) => Promise<void>;
}

const SandboxContext = createContext({} as SandboxContextState)
export const useSandbox = () => useContext(SandboxContext)

export const SandboxProvider = ({
    children,
}: {
    children: JSX.Element;
}) => {
    const { userId } = useCnails()
    const { containers } = useContainers();
    const [sandboxImages, setSandboxImages] = useState<SandboxImage[]>();
    const { cancelablePromise } = useCancelablePromise()
    const { listSandboxImages, addSandboxImage, removeSandboxImage, updateSandboxImage } = sandboxAPI

    const getSandboxImage = (id: string) => sandboxImages.find(si => si.id == id)

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
            if (error.isCanceled)
                return afterResponse(error.value as SandboxImageListResponse, false)
            else
                console.error(error)
        }
    }

    async function createSandboxImage(name: string, description: string, imageId: string) {
        const toastId = myToast.loading("Creating a personal workspace...");
        const response = await addSandboxImage({
            title: name,
            description,
            imageId,
            userId
        })
        if (response.success) {
            myToast.success(`Personal workspace is successfully created.`)
        } else {
            myToast.error({
                title: "Fail to create personal workspace",
                description: errorToToastDescription(response.error),
                comment: CLICK_TO_REPORT,
            })
        }
        await fetchSandboxImages();
        myToast.dismiss(toastId)
    }

    async function updateSandboxImageInfo(sandboxImageId: string, name: string, description: string) {
        const toastId = myToast.loading("Updating the info of the personal workspace...")
        const response = await updateSandboxImage(
            {
                sandboxImageId,
                title: name,
                description: description,
                tempContainerId: "",
                userId: userId
            }
        )
        if (response.success)
            myToast.success("Personal workspace is successfully updated.");
        else
            myToast.error({
                title: "Fail to update personal workspace",
                description: errorToToastDescription(response.error),
                comment: CLICK_TO_REPORT,
            });
        await fetchSandboxImages()
        myToast.dismiss(toastId);
    }

    async function updateSandboxImageInternal(sandboxImageId: string, containerId: string) {
        const toastId = myToast.loading("Updating the environment setup of the personal workspace...")

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
        fetchSandboxImages()
    }, [])

    if (!sandboxImages) return <></>;
    return <SandboxContext.Provider value={{
        sandboxImages,
        getSandboxImage,
        setSandboxImages,
        fetchSandboxImages,
        createSandboxImage,
        updateSandboxImageInfo,
    }}>
        {
            children
        }
    </SandboxContext.Provider>

}