import { data } from "cypress/types/jquery";
import { useEffect } from "react";
import { useCnails } from "../contexts/cnails";
import { useContainers } from "../contexts/containers";
import { containerAPI } from "../lib/api/containerAPI";
import addTemplate from "../pages/api/template/addTemplate";
import myToast from "./CustomToast";

type Props = {
    /**
     * a function to return the id of this toast such that it can dismiss itself
     */
    getToastId: () => string;
    /**
     * the temp container Id 
     */
    containerId: string;
    /**
     * when to do if user click OK.
     */
    onOK: () => void | Promise<void>;
    /**
     * return a boolean of whether this toast will be dismissed
     */
    onCancel?: () => boolean | Promise<boolean>;
    setUpWorkspaceText?: string;
    cancelBtnText?: string;
    okBtnText?: string;
}

/**
 * The temp container toast to keep the consistency. When cancel button is clicked, the temp container will be removed. 
 * The remove container API is called in this component so you don't need to handle this yourself.
 * An `onOK` props need is needed to know that what to do if user click ok button. 
 * 
 * @remark you don't need to handle the `toast.dismiss` by yourself because the component helped you do that
 */
const TempContainerToast = ({ containerId, getToastId, onOK, okBtnText, cancelBtnText, onCancel }: Props) => {
    const { sub } = useCnails();
    const { containers, fetchContainers } = useContainers();
    const { removeTempContainer } = containerAPI;

    useEffect(() => {
        // if the container is closed somewhere else
        const timeout = setTimeout(() => {
            if (!containers.some(container => container.id == containerId)) {
                myToast.dismiss(getToastId());
            }
        }, 2000)
        return () => clearTimeout(timeout)
    }, [containers, containerId, getToastId])

    return <div className="flex flex-col space-y-2">
        <p>
            A temporary workspace is created. Click the link to enter the IDE to set up. After finish setup, click{" "}
            <span className="font-bold">{okBtnText ?? "OK"}</span>. It will commit all your changes in IDE. If you click{" "}
            <span className="font-bold">{cancelBtnText ?? "Cancel"}</span>, all your changes in the IDE will not be saved.
        </p>
        <button
            className="btn btn-xs border-none"
            onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                window.open(
                    `https://codespace.ust.dev/user/container/${containerId}/`
                )
            }}
        >
            Set up workspace
        </button>
        <div className="flex flex-row space-x-2">
            <button
                className="btn btn-xs bg-gray-500 text-white hover:bg-gray-400 dark:bg-gray-400 dark:hover:bg-gray-500 border-none"
                onClick={async () => {
                    if (onCancel && await onCancel() == false) return
                    // cancel the build
                    myToast.dismiss(getToastId());
                    const response = await removeTempContainer({
                        containerId: containerId,
                        sub: sub
                    });
                    if (response.success)
                        console.log("remove temporary workspace", containerId);
                    else
                        console.log(
                            "Fail to remove temporary workspace",
                            response.error.status,
                            containerId,
                            sub
                        );
                    await fetchContainers();
                }}
            >
                {cancelBtnText ?? "Cancel"}
            </button>
            <button
                className="btn btn-xs bg-green-500 text-white hover:bg-green-600 border-none "
                onClick={async () => {
                    myToast.dismiss(getToastId());
                    await onOK()
                }}
            >
                {okBtnText ?? "OK"}
            </button>
        </div>
    </div >
}
export default TempContainerToast;