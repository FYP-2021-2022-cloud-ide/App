import { XIcon } from "@heroicons/react/solid";
import { useContainers } from "../contexts/containers";
import WorkspaceIndicator from "./WorkspaceIndicator";

type Props = {
  name: string;
  tooltip: string;
  containerId: string;
  color: "yellow" | "green";
};

const EmbeddedWorkspaceCard = ({
  name,
  tooltip,
  containerId,
  color,
}: Props) => {
  const { removeContainer } = useContainers();
  return (
    <div
      className={` rounded  border bg-white hover:bg-gray-100 dark:bg-black dark:hover:bg-gray-900 p-2 flex flex-row items-start justify-between border-gray-300 dark:border-gray-800 ${
        color == "green" ? "cursor-pointer" : "cursor-default"
      }`}
      onClick={(e) => {
        e.stopPropagation();
        if (containerId)
          window.open(
            `https://codespace.ust.dev/user/container/${containerId}/`
          );
      }}
      title={tooltip}
    >
      <div className="flex space-x-2 items-start">
        <WorkspaceIndicator color={color}></WorkspaceIndicator>
        <div className="min-h-[32px]">
          <p className="text-xs font-bold text-gray-700 dark:text-gray-300">
            {name}
          </p>
        </div>
      </div>
      {containerId && (
        <button
          title="remove workspace"
          onClick={async (e) => {
            e.stopPropagation();
            removeContainer(containerId);
          }}
        >
          <XIcon className="w-3 h-3 text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400" />
        </button>
      )}
    </div>
  );
};

export default EmbeddedWorkspaceCard;
