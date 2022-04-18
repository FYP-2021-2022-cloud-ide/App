import { InformationCircleIcon } from "@heroicons/react/solid";
import CustomTree from "../components/CustomTree/CustomTree2";
import { useCnails } from "../contexts/cnails";
import {
  FileTransferProvider,
  useFileTransfer,
} from "../contexts/fileTransfer";
import { TooltipProvider } from "../contexts/Tooltip";

const Wrapped = () => {
  const { userId } = useCnails();
  const {
    tree1Id,
    tree2Id,
    tree1RootId,
    tree2RootId,
    treeData1,
    treeData2,
    setTreeData1,
    setTreeData2,
    progress1,
    progress2,
    handleUpload,
    onLastActiveNodeChange,
  } = useFileTransfer();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 text-black max-h-screen h-full min-h-fit gap-6 px-10 mb-10 bottom-0 w-full mt-5">
      {/* local */}
      <div className=" flex flex-col space-y-2">
        <div className="flex flex-row space-x-2 items-center">
          <p className="text-gray-600 font-bold text-base sm:text-xl dark:text-gray-300 h-fit whitespace-nowrap">
            Personal Volume
          </p>
          <TooltipProvider text="You can drag and drop files and folders to the personal volume. You can also drag and drop files between the personal volume and the cloud volume. On mobile devices, you can double click to show the context menu.">
            {(setTriggerRef) => (
              <div ref={setTriggerRef}>
                <InformationCircleIcon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </div>
            )}
          </TooltipProvider>
          {progress1 && (
            <p
              id="progress-text"
              className="text-gray-600 text-sm dark:text-gray-300"
            >
              {progress1}
            </p>
          )}
        </div>
        <CustomTree
          treeId={tree1Id}
          rootId={tree1RootId}
          data={treeData1}
          onLastActiveNodeChange={onLastActiveNodeChange}
          handleMove={() => {}}
          handleUpload={handleUpload}
          canDrop={() => true}
        />
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <FileTransferProvider>
      <Wrapped></Wrapped>
    </FileTransferProvider>
  );
};

export default Home;
