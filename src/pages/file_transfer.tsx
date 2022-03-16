import { googleAPI } from "../lib/api/googleAPI";
import React, { useEffect, useRef, useState } from "react";
import { useCnails } from "../contexts/cnails";
import { NodeModel, TreeMethods } from "@minoru/react-dnd-treeview";
import { CustomData } from "../components/cloud/CustomNode";
import FTree, { MyTreeMethods } from "../components/cloud/FTree";
import path, { dirname } from "path";
import { localFileAPI } from "../lib/api/localFile";
import {
  isBlacklisted,
  status,
  expandGoogleFolder,
  GoogleFolder,
  getFolderById,
  convertGoogleTree,
  convertDirectoryTree,
} from "../lib/file_transfer_helper";
import { Dialog, Transition } from "@headlessui/react";
import myToast from "../components/CustomToast";

export default function Page() {
  const { userId, sub } = useCnails();
  const {
    listFolders,
    uploadFiles,
    moveFile,
    makeFolder,
    removeFile,
    downloadFileToUser,
  } = localFileAPI;
  const filesRef = useRef<GoogleFolder>();
  useEffect(() => {
    const fetchRoot = async (sub: string) => {
      filesRef.current = await expandGoogleFolder(
        filesRef.current,
        {
          id: "root",
          name: "root",
          path: "/root",
          closed: false,
        },
        sub
      );
    };
    fetchRoot(sub);
  }, []);
  useEffect(() => {
    console.log(ref1.current);
  });

  let ref1 = useRef<MyTreeMethods>();
  let ref2 = useRef<MyTreeMethods>();
  let progressRef1 = useRef<string>("");
  let progressRef2 = useRef<string>("");
  /**
   * the ref to the dragging node
   */
  const draggingRef = useRef<{ tree: string; node: NodeModel<CustomData> }>();
  /**
   * the ref to the node which is currently under node actions
   */
  const targetNodeRef = useRef<NodeModel<CustomData>>();
  const [showCreateFolderPopup, setShowCreateFolderPopup] =
    useState<boolean>(false);
  const folderNameInputRef = React.createRef<HTMLInputElement>();
  const fileNameInputRef = React.createRef<HTMLInputElement>();
  return (
    <>
      <div className="grid grid-cols-2 text-black max-h-screen h-full min-h-fit gap-6 px-10 mb-10 bottom-0 w-full">
        {/* local  */}
        <div className=" flex flex-col ">
          <p className="text-gray-600 font-bold text-xl dark:text-gray-300 h-fit">
            Personal Volume
          </p>
          <FTree
            ref={ref1}
            rootId={`/volumes/${userId}/persist`}
            fastDropCallback={() => {
              progressRef1.current = status.preparing;
            }}
            handleDropzone={async (
              acceptedFiles,
              _fileRejections,
              _event,
              node: NodeModel<CustomData>
            ) => {
              progressRef1.current = status.uploading;
              const formData = new FormData();
              let total = 0;
              for (let file of acceptedFiles) {
                // console.log(file)
                let path = (file as any).path;
                if (isBlacklisted(path)) {
                  // console.log(path, " is rejected")
                  continue;
                }
                // console.log(formatBytes(file.size))
                if (file.size / 1048576 > 30) {
                  progressRef1.current = "";
                  alert("Error: Some file size greater than 30MB");
                  return undefined;
                }
                total += file.size;

                formData.append("files", file, `${path}`);
              }
              if (total / 1048576 > 200) {
                progressRef1.current = "";
                alert("Error: Total file size greater than 200MB");
                return undefined;
              }
              const target = node
                ? node?.droppable
                  ? node.data.filePath
                  : dirname(node.data.filePath)
                : `/volumes/${userId}/persist`;
              formData.append("filePath", target);
              let data = await uploadFiles(userId, formData);
              console.log(data);
              progressRef1.current = "";
              if (data.success) return undefined;
              else {
                alert(data.error.status);
                return undefined;
              }
            }}
            handleMoveWithinTree={async (
              _treeData,
              { dragSource, dropTarget }
            ) => {
              progressRef1.current = status.transfering;
              const target =
                (dropTarget
                  ? dropTarget.data.filePath
                  : `/volumes/${userId}/persist`) +
                "/" +
                path.basename(dragSource.data.filePath);
              const data = await moveFile(
                userId,
                dragSource.data.filePath,
                target
              );
              progressRef1.current = "";
              console.log(data);
              if (data.success) return convertDirectoryTree(data.tree);
              else alert(JSON.stringify(data.error.status));
            }}
            handleMoveFromAnotherTree={async (_treeData, dropTarget) => {
              let target: string = "";
              progressRef1.current = status.transfering;
              if (!dropTarget) {
                target = `/volumes/${userId}/persist`;
              } else {
                if (dropTarget.droppable) {
                  target = dropTarget.data.filePath;
                } else {
                  target = path.dirname(dropTarget.data.filePath);
                }
              }
              await googleAPI.downloadFiles(
                sub,
                draggingRef.current.node.id,
                draggingRef.current.node.text,
                target,
                draggingRef.current.node.data.fileType
              );
              const data = await listFolders(userId);
              progressRef1.current = "";
              if (data.success) return convertDirectoryTree(data.tree);
              else alert(JSON.stringify(data.error.status));
            }}
            handleCloseAll={() => {
              ref1.current.closeAll();
            }}
            handleOpenAll={() => {
              ref1.current.openAll();
            }}
            onDragStart={async (_treeData, node) => {
              draggingRef.current = {
                tree: "tree 1",
                node: node,
              };
            }}
            onDragEnd={async () => {
              draggingRef.current = null;
            }}
            getFiles={async () => {
              progressRef1.current = status.loading;
              const data = await listFolders(userId);
              progressRef1.current = "";
              if (data.success) {
                console.log(data.tree);
                return convertDirectoryTree(data.tree);
              } else alert(JSON.stringify(data.error.status));
            }}
            createFolder={async function (
              node: NodeModel<CustomData>,
              name: string
            ): Promise<NodeModel<CustomData>[]> {
              const target = `${
                node.droppable
                  ? node.data.filePath
                  : path.dirname(node.data.filePath)
              }/${name}`;
              progressRef1.current = status.loading;
              const data = await makeFolder(userId, target);
              progressRef1.current = "";
              if (data.success) return convertDirectoryTree(data.tree);
              else alert(data.error.status);
            }}
            remove={async function (
              node: NodeModel<CustomData>
            ): Promise<NodeModel<CustomData>[]> {
              progressRef1.current = status.loading;
              const data = await removeFile(userId, node.data.filePath);
              progressRef1.current = "";
              if (data.success) return convertDirectoryTree(data.tree);
              else alert(data.error.status);
            }}
            edit={async function (
              node: NodeModel<CustomData>,
              newName: string
            ): Promise<NodeModel<CustomData>[]> {
              progressRef1.current = status.loading;
              const data = await moveFile(
                userId,
                node.data.filePath,
                `${path.dirname(node.data.filePath)}/${newName}`
              );
              progressRef1.current = "";
              if (data.success) return convertDirectoryTree(data.tree);
              else alert(data.error.status);
            }}
            download={async function (
              node: NodeModel<CustomData>
            ): Promise<void> {
              progressRef1.current = status.loading;
              const data = await downloadFileToUser(
                userId,
                node.data.filePath,
                node.droppable
              );
              if (data != undefined && data.success) {
                // console.log(res)
                var decodedByte = Buffer.from(data.file, "base64");
                var b = new Blob([decodedByte]);
                async function downloadFileURL(file: Blob, fileName: string) {
                  var link = document.createElement("a");
                  link.href = URL.createObjectURL(file);
                  link.download = fileName;
                  link.click();
                }
                await downloadFileURL(b, data.fileName);
              }
              progressRef1.current = "";
            }}
            progressRef={progressRef1}
            canDrop={(_tree, { dragSource, dropTarget }) => {
              if (dropTarget == undefined || dragSource == undefined)
                return true;
              if (dropTarget.data.filePath.includes(dragSource.data.filePath))
                return false;
              if (dragSource.id == dropTarget.id) return false;
              if (
                dragSource.parent == dropTarget.parent &&
                !dropTarget.droppable
              )
                return false;
              if (dragSource.parent == dropTarget.id) return false;
              // if (isDescedent(String(dragSource.id), dropTarget)) return false
              if (dropTarget.data.fileType == "file") return false;
              return true;
            }}
            getNodeActions={(node) => {
              return [
                {
                  text: "duplicate",
                  onClick: () => {},
                },
                {
                  text: "delete",
                  onClick: () => {},
                },
              ];
            }}
            rootActions={[
              {
                text: "create folder",
                onClick: () => {
                  setShowCreateFolderPopup(true);
                },
              },
            ]}
          ></FTree>
        </div>
        {/* cloud  */}
        <div className="flex flex-col">
          <p className="text-gray-600 font-bold text-xl dark:text-gray-300 h-fit">
            Cloud Volume (Google Drive)
          </p>
          {!filesRef.current ? (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-fit capitalize"
              onClick={async () => {
                await googleAPI.auth();
              }}
            >
              Login first
            </button>
          ) : (
            <FTree
              ref={ref2}
              rootId={"root"}
              handleMoveFromAnotherTree={async (treeData, dropTarget) => {
                progressRef2.current = status.loading;
                if (dropTarget.droppable) {
                  console.log("droppable");
                  const response = await googleAPI.uploadFiles(
                    sub,
                    draggingRef.current.node.data.filePath,
                    dropTarget.id,
                    draggingRef.current.node.data.fileType
                  );
                  if (!response.success) return treeData;
                  // console.log(files, String(dropTarget.id), dropTarget.data.filePath)
                  const response2 = await googleAPI.expandFolder(
                    dropTarget,
                    sub
                  );
                  const temp = await expandGoogleFolder(
                    filesRef.current,
                    {
                      id: String(dropTarget.id),
                      name: dropTarget.text,
                      path: dropTarget.data.filePath,
                      closed: false,
                    },
                    sub
                  );
                } else {
                  console.log("not droppable");
                  const response = await googleAPI.uploadFiles(
                    sub,
                    draggingRef.current.node.data.filePath,
                    dropTarget.parent,
                    draggingRef.current.node.data.fileType
                  );
                  if (!response.success) return treeData;
                  // console.log(files, String(dropTarget.parent), dropTarget.data.filePath)
                  const response2 = await googleAPI.expandFolder(
                    dropTarget.parent,
                    sub
                  );
                  const temp = await expandGoogleFolder(
                    filesRef.current,
                    {
                      id: String(dropTarget.parent),
                      name: dropTarget.text,
                      path: dropTarget.data.filePath,
                      closed: false,
                    },
                    sub
                  );
                }
                progressRef2.current = "";
                console.log(filesRef.current);
                return convertGoogleTree(filesRef.current);
              }}
              onClick={async (treeData, node) => {
                if (
                  node.droppable &&
                  getFolderById(filesRef.current, String(node.id)).children
                    .length == 0
                ) {
                  progressRef2.current = status.loading;
                  const response = await googleAPI.expandFolder(node.id, sub);
                  const newItems = await expandGoogleFolder(
                    filesRef.current,
                    {
                      id: String(node.id),
                      name: node.text,
                      path: node.data.filePath,
                      closed: false,
                    },
                    sub
                  );

                  progressRef2.current = "";
                  return convertGoogleTree(filesRef.current);
                }
                return treeData;
              }}
              onDragStart={async (_treeData, node) => {
                draggingRef.current = {
                  tree: "tree 2",
                  node: node,
                };
              }}
              onDragEnd={async () => {
                draggingRef.current = null;
              }}
              getFiles={async () => {
                return convertGoogleTree(filesRef.current);
              }}
              progressRef={progressRef2}
              canDrop={(_tree, { dragSource }) => {
                if (dragSource == undefined) return true;
                else return false;
              }}
            ></FTree>
          )}
        </div>
      </div>
      <Transition
        show={showCreateFolderPopup}
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Dialog
          onClose={() => {
            setShowCreateFolderPopup(false);
          }}
          initialFocus={folderNameInputRef}
          className={``}
        >
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30 z-[50] " />
          <div className="p-3 z-[100] absolute shadow-lg top-1/2 left-1/2 rounded-lg -translate-x-1/2 -translate-y-1/2  inset-0 overflow-y-auto bg-white dark:bg-gray-600 w-fit h-fit">
            <p className="text-gray-600 dark:text-gray-300 capitalize">
              folder name :
            </p>
            <input
              className="outline-none px-2 bg-white border border-gray-400 dark:border-gray-800 rounded mr-3 w-96 dark:bg-gray-700 dark:text-white text-gray-600"
              ref={folderNameInputRef}
            />
            <button
              className="bg-green-400 text-white px-2 rounded"
              onClick={async () => {
                setShowCreateFolderPopup(false);
                const node = targetNodeRef.current;
                const folderName = folderNameInputRef.current.value;
                if (folderName == "") {
                  myToast.error(
                    "Fail to create folder because folder name is empty."
                  );
                  return;
                }
                let folderPath: string;
                if (!node) {
                  // this is a root action
                  folderPath = `/volumes/${userId}/persist/${folderName}`;
                }
                if (node && node.droppable) {
                  folderPath = `${node.data.filePath}/${folderName}`;
                }
                if (node && !node.droppable) {
                  folderPath = `${path.dirname(
                    node.data.fileName
                  )}/${folderName}`;
                }

                progressRef1.current = status.loading;
                const response = await makeFolder(userId, folderPath);
                progressRef1.current = "";
                if (response.success)
                  await ref1.current.getFilesAndReset(
                    convertDirectoryTree(response.tree)
                  );
                else alert(response.error.status);
              }}
            >
              OK
            </button>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
