import React, { createContext, useContext, useEffect, useState } from "react";
import myToast from "../components/CustomToast";
import { sandboxAPI } from "../lib/api/sandboxAPI";
import { SandboxImage } from "../lib/cnails";
import { errorToToastDescription } from "../lib/errorHelper";
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
    const { listSandboxImages } = sandboxAPI
    async function fetchSandboxImages() {
        const response = await listSandboxImages(userId);
        if (response.success) {
            const sandboxImages = response.sandboxImages
            setSandboxImages(sandboxImages);
            return sandboxImages
        } else {
            myToast.error({
                title: "Personal workspaces cannot be fetched",
                description: errorToToastDescription(response.error),
            });
        }
    }

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