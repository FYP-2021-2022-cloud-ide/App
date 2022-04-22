import { ClockIcon, XIcon } from "@heroicons/react/outline";
import useContainerCard from "../hooks/useContainerCard";
import { Container } from "../lib/cnails";
import WorkspaceIndicator from "./WorkspaceIndicator";

type Props = {
  container: Container;
};

/**
 * it is only clickable when container id is ready.
 * The color is
 * @param
 * @returns
 */
const EmbeddedWorkspaceCard = ({ container }: Props) => {
  const { duration, onClick, onRemove, comment } = useContainerCard(container);
  const { status } = container;
  const name = container.isTemporary ? "Temporary Workspace" : container.title;

  return (
    <div
      className="embedding-workspace"
      data-status={status}
      onClick={onClick}
      title={comment}
    >
      <div className="flex flex-row items-start w-full">
        <div className="mr-2">
          <WorkspaceIndicator
            color={status == "DEFAULT" ? "green" : "yellow"}
          ></WorkspaceIndicator>
        </div>
        <div className="min-h-[32px] w-full">
          <p
            id="title"
            className="text-xs font-bold text-gray-700 dark:text-gray-300 "
          >
            {name}
          </p>
        </div>
        {status == "DEFAULT" && (
          <button id="remove-btn" title="remove workspace" onClick={onRemove}>
            <XIcon className="w-3 h-3 text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400" />
          </button>
        )}
      </div>

      <div className="w-full flex flex-row-reverse justify-between ">
        <div id="duration" className="flex flex-row items-center space-x-1">
          <ClockIcon className="h-4 w-4 text-gray-600 dark:text-gray-300 "></ClockIcon>
          <div
            id="duration-text"
            className="font-medium text-xs text-gray-600 dark:text-gray-300"
          >
            {duration}
          </div>
        </div>
        <p id="status" className="text-gray-500 dark:text-gray-400 text-xs">
          {comment}
        </p>
      </div>
    </div>
  );
};

export default EmbeddedWorkspaceCard;
