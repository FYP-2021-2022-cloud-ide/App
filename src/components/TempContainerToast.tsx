import { useCallback } from "react";
import { useContainers } from "../contexts/containers";
import { useWarning } from "../contexts/warning";
import { Container } from "../lib/cnails";
import myToast from "./CustomToast";

type Props = {
  /**
   * a function to return the id of this toast such that it can dismiss itself
   */
  getToastId: () => string;
  /**
   * the temp container Id
   */
  container: Container;
  setUpWorkspaceText?: string;
  cancelBtnText?: string;
  okBtnText?: string;
};

/**
 * The temp container toast to keep the consistency. When cancel button is clicked, the temp container will be removed.
 * The remove container API is called in this component so you don't need to handle this yourself.
 * An `onOK` props need is needed to know that what to do if user click ok button.
 *
 * @remark you don't need to handle the `toast.dismiss` by yourself because the component helped you do that
 */
const TempContainerToast = ({
  container,
  getToastId,
  okBtnText,
  cancelBtnText,
}: Props) => {
  const { removeContainer, commitTemporaryContainer } = useContainers();
  const { waitForConfirm } = useWarning();
  const onCancel = useCallback(async () => {
    const question =
      (container.redisPatch.cause == "ENV_CREATE" &&
        "Are you sure you want to cancel the commit? All your changes in the workspace will not be saved and no environment will be built.") ||
      (container.redisPatch.cause == "ENV_UPDATE" &&
        "Are you sure that you want to cancel the commit? All your changes in the workspace will not be saved and the environment will not be updated.") ||
      (container.redisPatch.cause == "TEMPLATE_CREATE" &&
        "Are you sure you want to cancel the commmit? All you changes in the workspace will not be saved and no template will be created.") ||
      (container.redisPatch.cause == "TEMPLATE_UPDATE" &&
        "Are you sure you want to cancel the commit? All your changes in the workspace will not be saved and the template will not be updated.") ||
      (container.redisPatch.cause == "SANDBOX_UPDATE" &&
        "Are you sure that you want to cancel the commit. All your changes in the workspace will not be saved and personal workspace will not be updated.");
    const confirm = await waitForConfirm(question);
    if (confirm) {
      await removeContainer(container.id);
      myToast.dismiss(getToastId());
    }
  }, [container, removeContainer, waitForConfirm]);

  const onOK = useCallback(async () => {
    myToast.dismiss(getToastId());
    await commitTemporaryContainer(container.id);
  }, [commitTemporaryContainer]);

  return (
    <div className="flex flex-col space-y-2">
      <p>
        A temporary workspace is created. Click the link to enter the IDE to set
        up. After finish setup, click{" "}
        <span className="font-bold">{okBtnText ?? "OK"}</span>. It will commit
        all your changes in IDE. If you click{" "}
        <span className="font-bold">{cancelBtnText ?? "Cancel"}</span>, all your
        changes in the IDE will not be saved.
      </p>

      <pre className="bg-gray-100 dark:bg-gray-800 h-48 rounded-md overflow-scroll text-2xs hide-scroll p-2 max-w-[300px]">
        {JSON.stringify(container.redisPatch, null, 2)}
      </pre>

      <button
        className="btn btn-xs border-none"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          window.open(
            `https://codespace.ust.dev/user/container/${container.id}/`
          );
        }}
      >
        Set up workspace
      </button>
      <div className="flex flex-row space-x-2">
        <button
          className="btn btn-xs bg-gray-500 text-white hover:bg-gray-400 dark:bg-gray-400 dark:hover:bg-gray-500 border-none"
          onClick={onCancel}
        >
          {cancelBtnText ?? "Cancel"}
        </button>
        <button
          className="btn btn-xs bg-green-500 text-white hover:bg-green-600 border-none "
          onClick={onOK}
        >
          {okBtnText ?? "OK"}
        </button>
      </div>
    </div>
  );
};
export default TempContainerToast;
