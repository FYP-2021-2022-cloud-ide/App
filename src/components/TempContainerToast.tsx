import { data } from "cypress/types/jquery";
import { useCnails } from "../contexts/cnails";
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
     * when to do if user click OK
     */
    onOK: () => void | Promise<void>;
    cancelBtnText?: string;
    okBtnText?: string;
}

/**
 * The temp container toast to keep the consistency. When cancel button is clicked, the temp container will be removed. 
 * An `onOK` props need is needed to know that what to do if user click ok button. 
 */
const TempContainerToast = ({ containerId, getToastId, onOK, okBtnText, cancelBtnText }: Props) => {
    const { sub } = useCnails();
    const { removeTempContainer } = containerAPI;
    return <div className="flex flex-col space-y-2">
        <p>
            A temp workspace is created. Click the link to set up your
            workspace. After finish setup, click{" "}
            <span className="font-bold">{okBtnText ?? "OK"}</span>.
        </p>
        <a
            className="btn btn-xs border-none"
            href={
                "https://codespace.ust.dev/user/container/" +
                containerId +
                "/"
            }
            target="_blank"
            rel="noreferrer"
        >
            Set up workspace
        </a>
        <div className="flex flex-row space-x-2">
            <button
                className="btn btn-xs bg-gray-500 text-white hover:bg-gray-400 dark:bg-gray-400 dark:hover:bg-gray-500 border-none"
                onClick={async () => {
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
    </div>
}
export default TempContainerToast;