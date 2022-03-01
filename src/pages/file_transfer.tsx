import { googleAPI } from "../lib/api/googleAPI";
import React, { useEffect, useState, Fragment, useRef } from "react";
import { MenuIcon } from "@heroicons/react/outline";
import { Menu, Transition } from "@headlessui/react";
import { useCnails } from "../contexts/cnails";
import { toast } from "react-hot-toast";
import Modal from "../components/Modal";
import Loader from "../components/Loader";
import { NotificationBody, Notification } from "../components/Notification";
import { NodeModel, TreeMethods } from "@minoru/react-dnd-treeview";
import { CustomData } from "../components/cloud/CustomNode";
import FTree from "../components/cloud/FTree";
import path, { dirname } from "path";
import { DirectoryTree } from "directory-tree";
import { localFileAPI } from "../lib/api/localFile";

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
    <div className="grid grid-cols-2 text-black max-h-screen h-full min-h-fit gap-6 px-10 mb-10 bottom-0 w-full whitespace-nowrap">
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
            if (data.success) return convertTree(data.tree);
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
            if (data.success) return convertTree(data.tree);
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
            if (data.success) return convertTree(data.tree);
            else alert(JSON.stringify(data.error.status));
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
            else alert(data.error.status);
          }}
          remove={async function (
            node: NodeModel<CustomData>
          ): Promise<NodeModel<CustomData>[]> {
            progressRef1.current = status.loading;
            const data = await removeFile(userId, node.data.filePath);
            progressRef1.current = "";
            if (data.success) return convertTree(data.tree);
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
            if (data.success) return convertTree(data.tree);
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
              return convertMTree(filesRef.current, "root");
            }}
            progressRef={progressRef2}
            canDrop={(_tree, { dragSource }) => {
              if (dragSource == undefined) return true;
              else return false;
            }}
          ></FTree>
        )}
      </div>
      <Modal isOpen={isOpen} setOpen={setIsOpen}>
        <FunctionLoader ref={modalRef} />
      </Modal>
    </div>
  );
}
