import { InformationCircleIcon } from "@heroicons/react/solid";
import { DropOptions, NodeModel } from "@minoru/react-dnd-treeview";
import path from "path";
import { useCallback } from "react";
import myToast from "../components/CustomToast";
import { CustomData } from "../components/CustomTree/CustomNode";
import CustomTree from "../components/CustomTree/CustomTree";
import {
  GetNodeActionsArgs,
  GetRootActionsArgs,
  HandleMoveArgs,
} from "../components/CustomTree/customTreeContext";
import { useCnails } from "../contexts/cnails";
import {
  FileTransferProvider,
  useFileTransfer,
  status,
} from "../contexts/fileTransfer";
import { TooltipProvider } from "../contexts/Tooltip";
import { googleAPI } from "../lib/api/googleAPI";
import { localFileAPI } from "../lib/api/localFile";
import { errorToToastDescription } from "../lib/errorHelper";
import { convertDirectoryTree } from "../lib/fileTransferHelper";

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
    progress1,
    progress2,
    setProgress1,
    setProgress2,
    handleUpload,
    onLastActiveNodeChange,
    lastActiveNodeRef,
    setIsCreateFolderModalOpen,
    setIsEditNameModalOpen,
    googleFilesRef,
    expandGoogleFolder,
  } = useFileTransfer();
  const { listFolders, moveFile, removeFile, downloadFileToUser } =
    localFileAPI;
  const { sub } = useCnails();

  const handleMove = useCallback(
    async (args: HandleMoveArgs) => {
      if (args.sameTree == true) {
        const { treeData, options } = args;
        const { dragSource, dropTarget } = options;
        setProgress1(status.transfering);
        setTreeData1(treeData);
        const target =
          (dropTarget ? dropTarget.data.filePath : tree1RootId) +
          "/" +
          path.basename(dragSource.data.filePath);
        const response = await moveFile(
          userId,
          dragSource.data.filePath,
          target
        );
        setProgress1("");
        if (response.success) setTreeData1(convertDirectoryTree(response.tree));
        else alert(response.error.status);
      } else {
        const { dropTarget } = args;
        setProgress1(status.transfering);
        // from another tree
        const getTarget = () => {
          if (!dropTarget) return tree1RootId;
          if (dropTarget && dropTarget.droppable)
            return dropTarget.data.filePath;
          if (dropTarget && !dropTarget.droppable)
            return path.dirname(dropTarget.data.filePath);
        };
        const response = await googleAPI.downloadFiles(
          sub,
          lastActiveNodeRef.current.node.id as string,
          lastActiveNodeRef.current.node.text,
          getTarget() as string,
          lastActiveNodeRef.current.node.data.fileType
        );
        setProgress1("");
        if (response.success) {
          const response = await listFolders(userId);
          if (response.success)
            setTreeData1(convertDirectoryTree(response.tree));
          else alert(response.error.status);
        } else {
          myToast.error({
            title: "File operation failed",
            description: errorToToastDescription(response.error),
          });
        }
      }
    },
    [setProgress1, userId, tree1RootId, setTreeData1, lastActiveNodeRef]
  );

  const tree1CanDrop = useCallback((_, { dragSource, dropTarget }) => {
    // can move to another tree
    if (dragSource == undefined) return true;

    if (dropTarget == undefined && dragSource.parent == tree1RootId)
      return false;

    if (dropTarget == undefined) return true;

    // cannot move to its parent because a node must be inside its parent already
    if (dragSource.parent == dropTarget.id) return false;

    // cannot move a parent to children
    if (dropTarget.data.filePath.includes(dragSource.data.filePath))
      return false;

    // cannot move to itself
    if (dragSource.id == dropTarget.id) return false;

    // cannot move to a file of same layer
    if (
      dragSource.parent == dropTarget.parent &&
      dropTarget.data.fileType === "file"
    )
      return false;

    // cannot move a file
    if (dropTarget.data.fileType == "file") return false;
    return true;
  }, []);

  const getNodeActions = useCallback(
    (node: NodeModel<CustomData>, args: GetNodeActionsArgs) => {
      const { open } = args;
      return [
        {
          text: "delete",
          onClick: async () => {
            setProgress1(status.loading);
            const response = await removeFile(userId, node.data.filePath);
            setProgress1("");
            if (response.success)
              setTreeData1(convertDirectoryTree(response.tree));
            else alert(response.error.status);
          },
        },
        {
          text: "download",
          onClick: async () => {
            setProgress1(status.loading);
            const response = await downloadFileToUser(
              userId,
              node.data.filePath,
              node.droppable
            );
            setProgress1("");
            if (response.success) {
              // console.log(res)
              var decodedByte = Buffer.from(response.file, "base64");
              var b = new Blob([decodedByte]);
              async function downloadFileURL(file: Blob, fileName: string) {
                var link = document.createElement("a");
                link.href = URL.createObjectURL(file);
                link.download = fileName;
                link.click();
              }
              await downloadFileURL(b, response.fileName);
            }
          },
        },
        {
          text: "edit",
          onClick: async () => {
            setIsEditNameModalOpen(true);
          },
        },
        {
          text: "create folder",
          onClick: () => {
            setIsCreateFolderModalOpen(true);
          },
        },
        {
          text: "Upload files",
          onClick: () => {
            open();
          },
        },
      ];
    },
    [
      setProgress1,
      setTreeData1,
      setIsCreateFolderModalOpen,
      setIsEditNameModalOpen,
    ]
  );

  const getRootActions = useCallback((args: GetRootActionsArgs) => {
    const { open } = args;
    return [
      {
        text: "create folder",
        onClick: () => {
          setIsCreateFolderModalOpen(true);
        },
      },
      {
        text: "upload files",
        onClick: () => {
          open();
        },
      },
    ];
  }, []);

  const handleMove2 = useCallback(
    async (args: HandleMoveArgs) => {
      if (args.sameTree == false) {
        const { dropTarget } = args;
        setProgress2(status.loading);
        const getParentId = () => {
          if (!dropTarget) return "root";
          if (dropTarget && dropTarget.droppable) return dropTarget.id;
          if (dropTarget && !dropTarget.droppable) return dropTarget.parent;
        };
        const getTargetFolder = () => {
          if (!dropTarget)
            return {
              id: "root",
              name: "root",
              path: "/root",
              closed: false,
            };
          if (dropTarget && dropTarget.droppable)
            return {
              id: String(dropTarget.id),
              name: dropTarget.text,
              path: dropTarget.data.filePath,
              closed: false,
            };
          if (dropTarget && !dropTarget.droppable)
            return {
              id: String(dropTarget.parent),
              name: dropTarget.text,
              path: dropTarget.data.filePath,
              closed: false,
            };
        };
        const response = await googleAPI.uploadFiles(
          sub,
          lastActiveNodeRef.current.node.data.filePath,
          getParentId() as string,
          lastActiveNodeRef.current.node.data.fileType
        );
        setProgress2("");
        if (response.success) {
          await expandGoogleFolder(getTargetFolder());
        } else {
          myToast.error({
            title: "Fail to upload files",
            description: errorToToastDescription(response.error),
          });
        }
      }
    },
    [setProgress2, expandGoogleFolder]
  );

  const tree2onToggle = useCallback(
    async (node: NodeModel<CustomData>) => {
      setProgress2(status.loading);
      await expandGoogleFolder({
        id: String(node.id),
        name: node.text,
        path: node.data.filePath,
        closed: false,
      });
      setProgress2("");
    },
    [setProgress2, expandGoogleFolder]
  );

  const tree2canDrop = useCallback(
    (
      tree: NodeModel<CustomData>[],
      { dragSource }: DropOptions<CustomData>
    ) => {
      // can move from another tree
      if (dragSource == undefined) return true;
      else return false;
    },
    []
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 text-black gap-6 px-10 mb-10 bottom-0 w-full mt-5">
      {/* local */}
      <div>
        <div className="flex flex-row space-x-2 items-center mb-2">
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
            <div className="select-none cursor-default text-gray-400 dark:text-gray-300 whitespace-nowrap flex flex-row flex-nowrap items-center">
              <button
                id="progress-text"
                className=" btn btn-circle btn-lg btn-ghost loading  "
              ></button>
              <p>{progress1}</p>
            </div>
          )}
        </div>
        <CustomTree
          treeId={tree1Id}
          rootId={tree1RootId}
          data={treeData1}
          onLastActiveNodeChange={onLastActiveNodeChange}
          handleMove={handleMove}
          handleUpload={handleUpload}
          canDrop={tree1CanDrop}
          getNodeActions={getNodeActions}
          getRootActions={getRootActions}
          loadingText={"Loading files from Person Volume"}
        />
      </div>
      {/* cloud  */}
      <div>
        <div className="flex flex-row space-x-2 items-center mb-2">
          <p className="text-gray-600 font-bold text-base sm:text-xl dark:text-gray-300 h-fit">
            Cloud Volume (Google Drive)
          </p>
          {progress2 && (
            <p
              id="progress-text"
              className="text-gray-600 text-sm dark:text-gray-300"
            >
              {progress2}
            </p>
          )}
        </div>
        {!googleFilesRef.current ? (
          <div id={tree2Id}>
            <div id="tree" data-no-file={true}>
              <div id="dummy" className="h-5 w-0"></div>
              <button id="google-login" onClick={googleAPI.auth}>
                <p id="nothing-text">Click here to log in Google Drive</p>
              </button>
            </div>
          </div>
        ) : (
          <CustomTree
            treeId={tree2Id}
            rootId={tree2RootId}
            data={treeData2}
            onLastActiveNodeChange={onLastActiveNodeChange}
            handleMove={handleMove2}
            showGlobalActionButtons={false}
            onToggle={tree2onToggle}
            canDrop={tree2canDrop}
            nothingText="Drag files from personal volume"
            loadingText="Loading files from Google Drive"
          />
        )}
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
