import { googleAPI } from "../lib/api/googleAPI";
import React, { useEffect, useRef, useState } from "react";
import { useCnails } from "../contexts/cnails";
import { NodeModel } from "@minoru/react-dnd-treeview";
import { CustomData } from "../components/FTree/CustomNode";
import FTree, { MyTreeMethods } from "../components/FTree/FTree";
import path, { dirname } from "path";
import { localFileAPI } from "../lib/api/localFile";
import { InformationCircleIcon } from "@heroicons/react/solid"
import {
  isBlacklisted,
  status,
  expandGoogleFolder,
  GoogleFolder,
  convertGoogleTree,
  convertDirectoryTree,
} from "../lib/fileTransferHelper";
import myToast from "../components/CustomToast";
import ModalForm from "../components/ModalForm/ModalForm";
import directoryTree from "directory-tree";
import classNames from "../lib/classnames";
import styles from "../styles/file_tree.module.css";
import { errorToToastDescription } from "../lib/errorHelper";
import { CLICK_TO_DISMISS, CLICK_TO_REPORT } from "../lib/constants";
import { usePopperTooltip } from "react-popper-tooltip";
import ReactDOM from "react-dom";
import useInterval from "../components/useInterval";

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
  const googleFilesRef = useRef<GoogleFolder>();

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
  const {
    getArrowProps,
    getTooltipProps,
    setTooltipRef,
    setTriggerRef,
    visible,
  } = usePopperTooltip();

  // for modal form
  const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] =
    useState<boolean>(false);
  const [isEditNameModalOpen, setIsEditNameModalOpen] =
    useState<boolean>(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);

  const fetchRoot = async (sub: string) => {
    googleFilesRef.current = await expandGoogleFolder(
      googleFilesRef.current,
      {
        id: "root",
        name: "root",
        path: "/root",
        closed: false,
      },
      sub
    );
    if (ref2.current) rerenderRemoteStorage(googleFilesRef.current);
  };
  useEffect(() => {
    fetchRoot(sub);
  }, [ref2.current]);

  useInterval(() => {
    fetchRoot(sub);
  }, 10000)


  const rerenderPersonalVolume = async (data: directoryTree.DirectoryTree) => {
    await ref1.current.getFilesAndRerender(convertDirectoryTree(data));
  };

  const rerenderRemoteStorage = async (data: GoogleFolder) => {
    await ref2.current.getFilesAndRerender(convertGoogleTree(data));
  };

  return (
    <>
      <div className="grid grid-cols-2 text-black max-h-screen h-full min-h-fit gap-6 px-10 mb-10 bottom-0 w-full">
        {/* local  */}
        <div className=" flex flex-col ">
          <div className="flex flex-row space-x-2 items-center">
            <p className="text-gray-600 font-bold text-xl dark:text-gray-300 h-fit">
              Personal Volume
            </p>
            <div ref={setTriggerRef}>
              <InformationCircleIcon className="tooltip-icon" />
            </div>
            {visible &&
              ReactDOM.createPortal(
                <div
                  ref={setTooltipRef}
                  {...getTooltipProps({
                    className: "tooltip-container",
                  })}
                >
                  You can drag and drop files and folders to the personal volume. You can also drag and drop files between the personal volume and the cloud volume.
                  <div
                    {...getArrowProps({
                      className: "tooltip-arrow",
                    })}
                  />
                </div>,
                document.body
              )}
          </div>
          <FTree
            ref={ref1}
            rootId={`/volumes/${userId}/persist`}
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
              progressRef1.current = status.transfering;
              console.log("something");
              const getTarget = () => {
                if (!dropTarget) return ref1.current.rootId;
                if (dropTarget && dropTarget.droppable)
                  return dropTarget.data.filePath;
                if (dropTarget && !dropTarget.droppable)
                  return path.dirname(dropTarget.data.filePath);
              };
              const response = await googleAPI.downloadFiles(
                sub,
                draggingRef.current.node.id as string,
                draggingRef.current.node.text,
                getTarget() as string,
                draggingRef.current.node.data.fileType
              );
              progressRef1.current = "";
              if (response.success) {
                const response = await listFolders(userId);
                if (response.success)
                  return convertDirectoryTree(response.tree);
                else alert(JSON.stringify(response.error.status));
              } else {
                myToast.error({
                  title: "File operation failed",
                  description: errorToToastDescription(response.error),
                  comment: CLICK_TO_REPORT,
                });
              }
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
                return convertDirectoryTree(data.tree);
              } else alert(JSON.stringify(data.error.status));
            }}
            progressRef={progressRef1}
            canDrop={(_, { dragSource, dropTarget }) => {
              // can move to another tree
              if (dropTarget == undefined || dragSource == undefined)
                return true;

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

              // cannot move to its parent because a node must be inside its parent already
              if (dragSource.parent == dropTarget.id) return false;

              // cannot move a file
              if (dropTarget.data.fileType == "file") return false;
              return true;
            }}
            getNodeActions={(node) => {
              targetNodeRef.current = node;
              return [
                // {
                //   text: "duplicate",
                //   onClick: () => {},
                // },
                {
                  text: "delete",
                  onClick: async () => {
                    progressRef1.current = status.loading;
                    const response = await removeFile(
                      userId,
                      node.data.filePath
                    );
                    progressRef1.current = "";
                    if (response.success)
                      await rerenderPersonalVolume(response.tree);
                    else alert(response.error.status);
                  },
                },
                {
                  text: "download",
                  onClick: async () => {
                    progressRef1.current = status.loading;
                    const response = await downloadFileToUser(
                      userId,
                      node.data.filePath,
                      node.droppable
                    );
                    if (response.success) {
                      // console.log(res)
                      var decodedByte = Buffer.from(response.file, "base64");
                      var b = new Blob([decodedByte]);
                      async function downloadFileURL(
                        file: Blob,
                        fileName: string
                      ) {
                        var link = document.createElement("a");
                        link.href = URL.createObjectURL(file);
                        link.download = fileName;
                        link.click();
                      }
                      await downloadFileURL(b, response.fileName);
                    }
                    progressRef1.current = "";
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
                // {
                //   text: "Upload files",
                //   onClick: () => {
                //     setIsUploadModalOpen(true);
                //   }
                // }
              ];
            }}
            rootActions={[
              {
                text: "create folder",
                onClick: () => {
                  setIsCreateFolderModalOpen(true);
                },
              },
            ]}
            onContextMenuClose={() => { }}
          ></FTree>
        </div>
        {/* cloud  */}
        <div className="flex flex-col">
          <p className="text-gray-600 font-bold text-xl dark:text-gray-300 h-fit">
            Cloud Volume (Google Drive)
          </p>
          {!googleFilesRef.current ? (
            <div className={classNames(styles, "wrapper")}>
              <div className="h-5 w-0"></div>
              <div className="h-full min-h-[300px] max-h-[80vh] relative">
                <button
                  className={classNames(styles, "root", "root-nothing")}
                  onClick={async () => {
                    await googleAPI.auth();
                  }}
                >
                  <p className={classNames(styles, "root-nothing-text")}>
                    Click here to log in Google Drive
                  </p>
                </button>
              </div>
            </div>
          ) : (
            <FTree
              ref={ref2}
              rootId={"root"}
              handleMoveFromAnotherTree={async (treeData, dropTarget) => {
                progressRef2.current = status.loading;
                const getParentId = () => {
                  if (!dropTarget) return "root";
                  if (dropTarget && dropTarget.droppable) return dropTarget.id;
                  if (dropTarget && !dropTarget.droppable)
                    return dropTarget.parent;
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
                  draggingRef.current.node.data.filePath,
                  getParentId() as string,
                  draggingRef.current.node.data.fileType
                );
                if (!response.success) return treeData;
                googleFilesRef.current = await expandGoogleFolder(
                  googleFilesRef.current,
                  getTargetFolder(),
                  sub
                );
                progressRef2.current = "";
                return convertGoogleTree(googleFilesRef.current);
              }}
              showGlobalActionButtons={false}
              onToggle={async (node) => {
                progressRef2.current = status.loading;
                googleFilesRef.current = await expandGoogleFolder(
                  googleFilesRef.current,
                  {
                    id: String(node.id),
                    name: node.text,
                    path: node.data.filePath,
                    closed: false,
                  },
                  sub
                );
                progressRef2.current = "";
                await rerenderRemoteStorage(googleFilesRef.current);
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
                return convertGoogleTree(googleFilesRef.current);
              }}
              progressRef={progressRef2}
              canDrop={(_tree, { dragSource }) => {
                // can move from another tree
                if (dragSource == undefined) return true;
                else return false;
              }}
              onContextMenuClose={() => { }}
            ></FTree>
          )}
        </div>
      </div>
      {/* create folder modal form  */}
      <ModalForm
        isOpen={isCreateFolderModalOpen}
        setOpen={setIsCreateFolderModalOpen}
        title="create folder"
        clickOutsideToClose
        escToClose
        formStructure={{
          create_folder: {
            entries: {
              name: {
                type: "input",
                label: "folder name",
                defaultValue: "",
              },
            },
          },
        }}
        onEnter={async ({ create_folder: data }: {
          create_folder: {
            name: string,
          }
        }) => {
          const node = targetNodeRef.current;
          const folderName = data.name;
          if (folderName == "") {
            myToast.error({
              title: "Fail operation failed",
              description:
                "Fail to create folder because folder name is empty.",
              comment: CLICK_TO_DISMISS,
            });
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
            folderPath = `${path.dirname(node.data.filePath)}/${folderName}`;
          }
          progressRef1.current = status.loading;
          console.log(folderPath, node)
          const response = await makeFolder(userId, folderPath);
          progressRef1.current = "";
          targetNodeRef.current = null;
          if (response.success) await rerenderPersonalVolume(response.tree);
          else alert(response.error.status);
        }}
      ></ModalForm>

      {
        targetNodeRef.current && (
          <ModalForm
            isOpen={isEditNameModalOpen}
            setOpen={setIsEditNameModalOpen}
            clickOutsideToClose
            escToClose
            title="Edit Name"
            formStructure={{
              edit_name: {
                entries: {
                  name: {
                    type: "input",
                    defaultValue: targetNodeRef.current.text,
                  },
                },
              },
            }}
            onEnter={async ({ edit_name: data }: {
              edit_name: {
                name: string
              }
            }) => {
              const node = targetNodeRef.current;
              const newName = data.name;
              progressRef1.current = status.loading;
              const response = await moveFile(
                userId,
                node.data.filePath,
                `${path.dirname(node.data.filePath)}/${newName}`
              );
              progressRef1.current = "";
              targetNodeRef.current = null
              if (response.success) await rerenderPersonalVolume(response.tree);
              else alert(response.error.status);
            }}
          ></ModalForm>
        )
      }
      {/* upload modal  */}
      <ModalForm
        isOpen={isUploadModalOpen}
        setOpen={setIsUploadModalOpen}
        clickOutsideToClose
        escToClose
        title="Upload Files"
        formStructure={{

        }}
        onEnter={() => {

        }}
      ></ModalForm>
    </>
  );
}
