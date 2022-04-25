import { useCallback } from "react";
import { useContainers } from "../contexts/containers";
import { useWarning } from "../contexts/warning";
import useContainerCard from "../hooks/useContainerCard";
import { Container } from "../lib/cnails";
import myToast from "./CustomToast";

type Props = {
  /**
   * the temp container Id
   */
  container: Container;
  cancelBtnText?: string;
  okBtnText?: string;
};

/**
 * The temp container toast to keep the consistency. When cancel button is clicked, the temp container will be removed.
 * The remove container API is called in this component so you don't need to handle this yourself.
 * An `onOK` props need is needed to know that what to do if user click ok button.
 *
 * @remark you don't need to handle the `toast.dismiss` by yourself because the component helped you do that
 * @remark the toast id should be the container id, pay attention when you use this
 */
const TempContainerToast = ({
  container,
  okBtnText = "OK",
  cancelBtnText = "Cancel",
}: Props) => {
  const { commitTemporaryContainer } = useContainers();
  const { onRemove, onClick } = useContainerCard(container);

  const onOK = useCallback(async () => {
    myToast.dismiss(container.id);
    await commitTemporaryContainer(container.id);
  }, [commitTemporaryContainer]);

  return (
    <div className="flex flex-col space-y-2">
      <p>
        A temporary workspace is created. Click the link to enter the IDE to set
        up. After finish setup, click{" "}
        <span className="font-bold">{okBtnText}</span>. It will commit all your
        changes in IDE. If you click{" "}
        <span className="font-bold">{cancelBtnText}</span>, all your changes in
        the IDE will not be saved.
      </p>

      <pre className="bg-gray-100 dark:bg-gray-800 h-48 rounded-md overflow-scroll text-2xs hide-scroll p-2 max-w-[300px]">
        {JSON.stringify(
          {
            cause: container.redisPatch.cause,
            sourceId: container.redisPatch.sourceId,
            data: container.redisPatch.data,
            containerId: container.redisPatch.containerId,
            requestAt: container.redisPatch.requestAt,
          },
          null,
          2
        )}
      </pre>

      <button className="btn btn-xs border-none" onClick={onClick}>
        Set up workspace
      </button>
      <div className="flex flex-row space-x-2">
        <button
          className="btn btn-xs bg-gray-500 text-white hover:bg-gray-400 dark:bg-gray-400 dark:hover:bg-gray-500 border-none"
          onClick={onRemove}
        >
          {cancelBtnText}
        </button>
        <button
          className="btn btn-xs bg-green-500 text-white hover:bg-green-600 border-none "
          onClick={onOK}
        >
          {okBtnText}
        </button>
      </div>
    </div>
  );
};
export default TempContainerToast;
