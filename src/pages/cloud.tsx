import { googleAPI } from "../lib/googleAPI";
import React, { useEffect, useState, Fragment, useRef, createRef } from "react";
import { MenuIcon, FolderIcon, DocumentIcon } from "@heroicons/react/outline";
import { Menu, Transition, Dialog } from "@headlessui/react";
import { useCnails } from "../contexts/cnails";
import { toast } from "react-hot-toast";
import { DropEvent, FileRejection, useDropzone } from "react-dropzone";
// two type of object (file or folder)
// folder have files property while file have no
import LocalFiles from "../components/cloud/localFiles";
import Modal from "../components/Modal";
import Loader from "../components/Loader";
import { NotificationBody, Notification } from "../components/Notification";
import {
  DragLayerMonitorProps,
  NodeModel,
  Tree,
  getDescendants,
  DropOptions,
  useOpenIdsHelper,
  TreeMethods,
} from "@minoru/react-dnd-treeview";
import { CustomData } from "../components/cloud/CustomNode";
import { CustomDragPreview } from "../components/cloud/CustomDragPreview";
import { Placeholder } from "../components/cloud/placeholder";
import FTree from "../components/cloud/FTree";
import path, { dirname } from "path";
import { DirectoryTree } from "directory-tree";
import { useTheme } from "../contexts/theme";
import { file, files } from "jszip";
import { localFileAPI } from "../lib/localFile";

// import {useE}
function Files({ files, sub }) {
  return files.map((file) => {
    return (
      <div key={file.id} className="pl-5 flex flex-row space-x-1 items-center">
        <DocumentIcon className="w-4 h-4 text-gray-500" />
        <div className="text-gray-500">{file.name}</div>
        <ItemMenu
          fileId={file.id}
          fileName={file.name}
          type={"file"}
          sub={sub}
        />
      </div>
    );
  });
}

async function updateTree(
  tree: GoogleFolder,
  id: string,
  prevPath: string,
  sub: string,
  forceUpdate?: boolean
): Promise<GoogleFolder> {
  return await new Promise(async (resolve, reject) => {
    var treeCopy = tree;
    if (treeCopy.id == id) {
      treeCopy.closed = !treeCopy.closed;
      if (treeCopy.closed == false) {
        if (
          (treeCopy.children.length == 0 && treeCopy.files.length == 0) ||
          forceUpdate
        ) {
          // fetch data
          const response = await googleAPI.expandFolder(treeCopy.id, sub);
          const {
            loadedFiles: { files, folders },
          } = response;
          treeCopy.children = folders.map((child) => ({
            id: child.id,
            name: child.name,
            path: prevPath + "/" + child.name,
            closed: true,
            children: [],
            files: [],
          }));
          treeCopy.files = files.map((file) => ({
            id: file.id,
            name: file.name,
            path: prevPath + "/" + file.name,
          }));
        }
      }
    } else {
      treeCopy.children = await Promise.all(
        treeCopy.children.map(async (child) => {
          return updateTree(child, id, prevPath, sub);
        })
      );
    }
    resolve(treeCopy); // return the newTree
  });
}

const googleFolderConvert = (
  id: string,
  name: string,
  path: string,
  closed: boolean,
  response: any
): GoogleFolder => {
  const {
    loadedFiles: { files, folders },
  } = response;
  let temp: GoogleFolder = {
    id: id,
    name: name,
    path: path,
    closed: closed,
    children: folders.map((child) => ({
      id: child.id,
      name: child.name,
      path: path + "/" + child.name,
      closed: true,
      children: [],
      files: [],
    })),
    files: files.map((file) => ({
      id: file.id,
      name: file.name,
      path: path + "/" + file.name,
    })),
  };
  return temp;
};

export type GoogleFolder = {
  id: string;
  name: string;
  path: string;
  closed: boolean;
  children: GoogleFolder[];
  files: GoogleFile[];
};

export type GoogleFile = {
  id: string;
  name: string;
  path: string;
};

function ItemMenu({ fileId, fileName, type, sub }) {
  const [loading, setLoading] = useState(false);
  return (
    <Menu as="div" className="relative text-left">
      <div className="flex flex-row space-x-2">
        <Menu.Button>
          <MenuIcon className="w-4 h-4" />
        </Menu.Button>
        {loading ? <div>loading</div> : <div>finished</div>}
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute left-0 w-56 border rounded bg-white z-40">
          <Menu.Item
            as="div"
            className="w-full flex justify-center hover:bg-gray-200"
          >
            <button
              className="w-full"
              onClick={async () => {
                setLoading(true);
                const { success, message } = await googleAPI.downloadFiles(
                  sub,
                  fileId,
                  fileName,
                  "/volumes/7fac6d26-4f01-41c8-9b40-a9f372c7a691/persist/3",
                  type
                );
                setLoading(false);
                if (success) {
                  toast.custom((t) => (
                    <Notification trigger={t}>
                      <NotificationBody
                        title={"Download File"}
                        body={"Download file success"}
                        success={true}
                        id={t.id}
                      ></NotificationBody>
                    </Notification>
                  ));
                } else {
                  toast.custom((t) => (
                    <Notification trigger={t}>
                      <NotificationBody
                        title={"Download File"}
                        body={message}
                        success={false}
                        id={t.id}
                      ></NotificationBody>
                    </Notification>
                  ));
                }
              }}
            >
              download
            </button>
          </Menu.Item>
          {type == "folder" ? (
            <Menu.Item
              as="div"
              className="w-full flex justify-center hover:bg-gray-200"
            >
              <button
                className="w-full"
                onClick={async () => {
                  setLoading(true);
                  if (type == "folder") {
                    const { success, message } = await googleAPI.uploadFiles(
                      sub,
                      "/volumes/7fac6d26-4f01-41c8-9b40-a9f372c7a691/persist/3",
                      fileId,
                      "folder"
                    );
                    setLoading(false);
                    console.log(success, message);
                    if (success) {
                      toast.custom((t) => (
                        <Notification trigger={t}>
                          <NotificationBody
                            title={"Upload File"}
                            body={"Upload file success"}
                            success={true}
                            id={t.id}
                          ></NotificationBody>
                        </Notification>
                      ));
                    } else {
                      toast.custom((t) => (
                        <Notification trigger={t}>
                          <NotificationBody
                            title={"Upload File"}
                            body={message}
                            success={false}
                            id={t.id}
                          ></NotificationBody>
                        </Notification>
                      ));
                    }
                  }
                  // else
                  // await googleAPI.uploadFiles(sub, "/volumes/7fac6d26-4f01-41c8-9b40-a9f372c7a691/persist/1",fileId, "file")
                }}
              >
                upload
              </button>
            </Menu.Item>
          ) : (
            <></>
          )}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

function Display({ allTree, tree, setFiles, prevPath, sub }) {
  const childrenList = tree.children;
  return (
    <div>
      <div className="flex flex-row space-x-1 items-center">
        <FolderIcon className="w-4 h-4 text-gray-500" />
        <button
          onClick={async () => {
            await updateTree(allTree, tree.id, prevPath, sub);
            setFiles({
              name: "root",
              id: "root",
              closed: false,
              children: [],
              files: [],
            });
            setFiles(allTree);
          }}
          className="font-bold"
        >
          {tree.name}
        </button>
        <ItemMenu
          fileId={tree.id}
          fileName={tree.name}
          type={"folder"}
          sub={sub}
        />
      </div>

      {childrenList.map((child) => {
        return (
          <div key={child.id} className="pl-5">
            {child.closed ? (
              <div className="flex flex-row space-x-1 items-center">
                <FolderIcon className="w-4 h-4 text-gray-500" />
                <button
                  onClick={async () => {
                    await updateTree(
                      allTree,
                      child.id,
                      prevPath + "/" + tree.name + "/" + child.name,
                      sub
                    );
                    setFiles(allTree);
                  }}
                  className="font-bold"
                >
                  {child.name}
                </button>
                <ItemMenu
                  fileId={child.id}
                  fileName={child.name}
                  type={"folder"}
                  sub={sub}
                />
              </div>
            ) : (
              <div>
                <Display
                  allTree={allTree}
                  tree={child}
                  setFiles={setFiles}
                  prevPath={prevPath + "/" + tree.name}
                  sub={sub}
                ></Display>
              </div>
            )}
          </div>
        );
      })}
      <div>
        <Files files={tree.files} sub={sub}></Files>
      </div>
    </div>
  );
}

const FunctionLoader = React.forwardRef(({}, ref) => {
  const dialogClass =
    "inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-gray-800 shadow-xl rounded-2xl text-[#415A6E]";
  return (
    //@ts-ignore
    <div ref={ref} className={dialogClass}>
      <Loader></Loader>
    </div>
  );
});

FunctionLoader.displayName = "FunctionLoader";

function encode(string: string) {
  var number = "0x";
  var length = string.length;
  for (var i = 0; i < length; i++) number += string.charCodeAt(i).toString(16);
  return number;
}

function treeToUITree(
  tree: DirectoryTree,
  parent: string | number
): NodeModel<CustomData>[] {
  let temp: NodeModel<CustomData>[] = [];
  temp.push({
    id: encode(tree.path),
    parent: parent,
    text: tree.name,
    droppable: tree.children != undefined,
    data: {
      fileName: tree.name,
      filePath: tree.path,
      fileSize: String(tree.size),
      fileType: tree.type,
    },
  });
  if (tree.children != undefined) {
    for (let t of tree.children) {
      const a = treeToUITree(t, encode(tree.path));
      temp = temp.concat(a);
    }
  }
  return temp;
}

const convertTree = (tree: DirectoryTree): NodeModel<CustomData>[] => {
  if (tree != undefined) {
    let children = tree.children;
    if (children != undefined) {
      let uitree: NodeModel<CustomData>[] = [];
      // console.log(tree.children)
      for (let t of children) uitree = uitree.concat(treeToUITree(t, 0));
      return uitree;
    }
  }
  return undefined;
};

const convertMTree = (
  tree: GoogleFolder,
  parent: string | number
): NodeModel<CustomData>[] => {
  if (tree != undefined) {
    let children = tree.children;
    let uitree: NodeModel<CustomData>[] = [];
    if (children != undefined) {
      for (let child of children) {
        uitree.push({
          id: child.id,
          parent: parent,
          text: child.name,
          droppable: true,
          data: {
            fileName: child.name,
            filePath: child.path,
            fileType: "directory",
          },
        });
        uitree = uitree.concat(convertMTree(child, child.id));
      }
    }
    for (let file of tree.files) {
      uitree.push({
        id: file.id,
        parent: parent,
        text: file.name,
        droppable: false,
        data: {
          fileName: file.name,
          filePath: file.path,
          fileType: "file",
        },
      });
    }
    return uitree;
  }
  return undefined;
};

const status = {
  preparing: "preparing files...",
  loading: "loading...",
  uploading: "Uploading files......",
  transfering: "transfering files in the backend...",
};

const newTree = (
  oldTree: GoogleFolder,
  newItem: GoogleFolder
): GoogleFolder => {
  // find the corresponding item in the old tree and replace it
  if (oldTree.id == newItem.id) return newItem;
  let temp: GoogleFolder = {
    id: oldTree.id,
    name: oldTree.name,
    path: oldTree.path,
    closed: oldTree.closed,
    children: oldTree.children.map((child) => {
      if (child.id == newItem.id) {
        // console.log(`replacing\n ${JSON.stringify(child)}\n to\n ${JSON.stringify(newItem)}`)
        return newItem;
      } else return newTree(child, newItem);
    }),
    files: oldTree.files,
  };
  return temp;
};

const getFolderById = (tree: GoogleFolder, id: string): GoogleFolder => {
  if (tree.id == id) return tree;
  for (let child of tree.children) {
    let result = getFolderById(child, id);
    if (result) return result;
  }
  return undefined;
};

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

const blacklistedFolders = ["node_modules"];

const blacklistedFiles = [];

const blacklist = (path: string): boolean => {
  return path.includes("node_modules");
};

const isBlacklisted = (path: string): boolean => {
  // TODO
  // should check blacklisted Files , folders and custom blacklisted
  return blacklist(path);
};

export default function Cloud() {
  const { userId, sub } = useCnails();
  const {
    listFolders,
    uploadFiles,
    moveFile,
    makeFolder,
    removeFile,
    downloadFileToUser,
  } = localFileAPI;
  const [isLogin, setIsLogin] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const filesRef = useRef<GoogleFolder>(undefined);
  useEffect(() => {
    const firstFetch = async () => {
      const response = await googleAPI.expandFolder("root", sub);
      if (response.success) {
        const {
          loadedFiles: { files, folders },
        } = response;
        filesRef.current = {
          name: "root",
          id: "root",
          closed: false,
          path: "/root",
          children: folders.map((child) => ({
            id: child.id,
            name: child.name,
            path: "/root/" + child.name,
            closed: true,
            children: [],
            files: [],
          })),
          files: files.map((file) => ({
            id: file.id,
            name: file.name,
            path: "/root/" + file.name,
          })),
        };
        setIsLogin(true);
      }
    };
    firstFetch();
  }, []);

  let ref1 = useRef<TreeMethods>();
  let ref2 = useRef<TreeMethods>();
  let progressRef1 = useRef<any>("");
  let progressRef2 = useRef<any>("");
  let draggingRef = useRef<{ tree: string; node: NodeModel<CustomData> }>();
  let modalRef = useRef<any>();
  return (
    <div className="grid grid-cols-2 text-black max-h-screen h-full min-h-fit gap-6 p-10 bottom-0 w-full whitespace-nowrap">
      {/* local  */}
      <div className=" flex flex-col ">
        <p className="text-gray-600 font-bold text-xl dark:text-gray-300 h-fit">
          Personal Volume
        </p>
        <FTree
          disabled={userId ? false : true}
          ref={ref1}
          fastDropCallback={() => {
            progressRef1.current = status.preparing;
          }}
          handleDropzone={async (
            acceptedFiles,
            fileRejections,
            event,
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
              alert(data.message);
              return undefined;
            }
          }}
          handleMoveWithinTree={async (
            treeData,
            { dragSourceId, dropTargetId, dragSource, dropTarget }
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
            if (data.success) return convertTree(data.tree);
            else alert(JSON.stringify(data.message));
          }}
          handleMoveFromAnotherTree={async (treeData, dropTarget) => {
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
            if (data.success) return convertTree(data.root);
            else alert(JSON.stringify(data.message));
          }}
          handleCloseAll={() => {
            ref1.current.closeAll();
          }}
          handleOpenAll={() => {
            ref1.current.openAll();
          }}
          onDragStart={async (treeData, node) => {
            draggingRef.current = {
              tree: "tree 1",
              node: node,
            };
          }}
          onDragEnd={async (node) => {
            draggingRef.current = null;
          }}
          getFiles={async () => {
            progressRef1.current = status.loading;
            const data = await listFolders(userId);
            progressRef1.current = "";
            if (data.success) return convertTree(data.tree);
            else alert(JSON.stringify(data.message));
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
            if (data.success) return convertTree(data.tree);
            else alert(data.message);
          }}
          remove={async function (
            node: NodeModel<CustomData>
          ): Promise<NodeModel<CustomData>[]> {
            progressRef1.current = status.loading;
            const data = await removeFile(userId, node.data.filePath);
            progressRef1.current = "";
            if (data.success) return convertTree(data.tree);
            else alert(data.message);
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
            if (data.success) return convertTree(data.tree);
            else alert(data.message);
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
            if (data != undefined) {
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
          canDrop={(
            tree,
            { dragSourceId, dragSource, dropTarget, dropTargetId }
          ) => {
            if (dropTarget == undefined || dragSource == undefined) return true;
            if (dropTarget.data.filePath.includes(dragSource.data.filePath))
              return false;
            if (dragSource.id == dropTarget.id) return false;
            if (dragSource.parent == dropTarget.parent && !dropTarget.droppable)
              return false;
            if (dragSource.parent == dropTarget.id) return false;
            // if (isDescedent(String(dragSource.id), dropTarget)) return false
            if (dropTarget.data.fileType == "file") return false;
            return true;
          }}
        ></FTree>
      </div>
      {/* cloud  */}
      <div className="flex flex-col">
        <p className="text-gray-600 font-bold text-xl dark:text-gray-300 h-fit">
          Cloud Volume (Google Drive)
        </p>
        {!filesRef.current ? (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-fit"
            onClick={async () => {
              setIsOpen(true);
              await googleAPI.auth();
              setIsOpen(false);
            }}
          >
            Login first{" "}
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
                const response2 = await googleAPI.expandFolder(dropTarget, sub);
                const temp = googleFolderConvert(
                  String(dropTarget.id),
                  dropTarget.text,
                  dropTarget.data.filePath,
                  false,
                  response2
                );
                console.log(temp);
                filesRef.current = newTree(filesRef.current, temp);
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
                const temp = googleFolderConvert(
                  String(dropTarget.parent),
                  dropTarget.text,
                  dropTarget.data.filePath,
                  false,
                  response2
                );
                console.log(temp);
                filesRef.current = newTree(filesRef.current, temp);
              }
              progressRef2.current = "";
              console.log(filesRef.current);
              return convertMTree(filesRef.current, "root");
            }}
            onClick={async (treeData, node) => {
              if (
                node.droppable &&
                getFolderById(filesRef.current, String(node.id)).children
                  .length == 0
              ) {
                progressRef2.current = status.loading;
                const response = await googleAPI.expandFolder(node.id, sub);
                const newItems = googleFolderConvert(
                  String(node.id),
                  node.text,
                  node.data.filePath,
                  false,
                  response
                );
                console.log(newItems);
                filesRef.current = newTree(filesRef.current, newItems);
                progressRef2.current = "";
                return convertMTree(filesRef.current, "root");
              }
              return treeData;
            }}
            onDragStart={async (treeData, node) => {
              draggingRef.current = {
                tree: "tree 2",
                node: node,
              };
            }}
            onDragEnd={async () => {
              draggingRef.current = null;
            }}
            getFiles={async () => {
              return convertMTree(filesRef.current, "root");
            }}
            progressRef={progressRef2}
            canDrop={(
              tree,
              { dragSourceId, dragSource, dropTarget, dropTargetId }
            ) => {
              if (dragSource == undefined) return true;
              else return false;
            }}
          ></FTree>
        )}
      </div>
      {/* @ts-ignore */}
      {/* <LocalFiles opened={true} tree={localFolders!} ></LocalFiles> */}
      {/* <div className="border rounded-lg h-96 flex flex-col space-y-2">
                <div>
                    Local volume
                </div>
                <div className="flex flex-row space-x-2 font-medium text-sm text-gray-500">
                    <label>Upload source: </label>
                    <input className="border rounded text-black px-2" value={source} onChange={(e) => {
                        setSource(e.target.value)
                    }} />
                </div>
                <div className="flex flex-row space-x-2 font-medium text-sm text-gray-500">
                    <label>Upload destination (folder parent id): </label>
                    <input className="border rounded text-black px-2" value={dest} onChange={(e) => {
                        setDest(e.target.value)
                    }} />
                </div>
                <button className="border rounded px-2 py-1 bg-blue-600 hover:bg-blue-500 text-white" onClick={async () => {
                    // await googleAPI.uploadFiles(source)
                }}>
                    upload file
                </button>
                <button className="border rounded px-2 py-1 bg-blue-600 hover:bg-blue-500 text-white" onClick={async () => {
                    // const response = await googleAPI.uploadFolder(source, dest)
                    // console.log(response)
                }}>
                    upload folder
                </button>
            </div> */}
      {/* <div className="border rounded-lg h-96 overflow-scroll">
                cloud drive
                {flag ? (
                    <div>
                        <h2>active</h2>
                        <Display allTree={files} tree={files} setFiles={setFiles} prevPath={''} sub={sub}></Display>
                    </div>
                ) : (
                    <div>
                        <div>Please login to Google to access the file in drive</div>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={async () => {
                                setIsOpen(true)
                                await googleAPI.auth()
                                setIsOpen(false)
                            }}
                        >Click here
                        </button>
                    </div>
                )}
            </div> */}
      <Modal isOpen={isOpen} setOpen={setIsOpen}>
        <FunctionLoader ref={modalRef} />
      </Modal>
    </div>
  );
}
