import { NodeModel } from "@minoru/react-dnd-treeview";
import path from "path";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { createContext, useContext } from "react";
import myToast from "../components/CustomToast";
import { CustomData } from "../components/CustomTree/CustomNode";
import ModalForm from "../components/ModalForm/ModalForm";
import { localFileAPI } from "../lib/api/localFile";
import { errorToToastDescription } from "../lib/errorHelper";
import FileTransferHelper, {
  convertDirectoryTree,
  convertGoogleTree,
  GoogleFolder,
  isBlacklisted,
} from "../lib/fileTransferHelper";
import { useCnails } from "./cnails";
import CreateFolderForm from "../components/forms/fileTransfer/CreateFolderForm";
import EditNameForm from "../components/forms/fileTransfer/EditNameForm";
import useInterval from "../hooks/useInterval";
import {
  HandleMoveArgs,
  Props,
} from "../components/CustomTree/customTreeContext";

/**
 * store all the status text
 */
export const status = {
  preparing: "preparing files...", // prepare files in the browser
  loading: "loading...",
  uploading: "Uploading files......",
  transfering: "transfering files in the backend...",
};

type FileTransferContextState = {
  tree1Id: string;
  tree1RootId: string;
  tree2Id: string;
  tree2RootId: string;
  treeData1: NodeModel<CustomData>[];
  treeData2: NodeModel<CustomData>[];
  setTreeData1: React.Dispatch<React.SetStateAction<NodeModel<CustomData>[]>>;
  setTreeData2: React.Dispatch<React.SetStateAction<NodeModel<CustomData>[]>>;
  progress1: string;
  setProgress1: React.Dispatch<React.SetStateAction<string>>;
  progress2: string;
  setProgress2: React.Dispatch<React.SetStateAction<string>>;
  isCreateFolderModalOpen: boolean;
  setIsCreateFolderModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isEditNameModalOpen: boolean;
  setIsEditNameModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  lastActiveNodeRef: React.MutableRefObject<{
    treeId: string;
    node: NodeModel<CustomData>;
  }>;
  changeLastActiveNode: (treeId: string, node: NodeModel<CustomData>) => void;
  /**
   * create folder in personal volume
   */
  createFolder: (
    node: NodeModel<CustomData>,
    name: string
  ) => void | Promise<void>;
  /**
   * edit a file name in personal volume
   */
  editName: (node: NodeModel<CustomData>, name: string) => void | Promise<void>;
  /**
   * this ref keep track on the Google Folder data such that we can use the helper function
   * if this is `undefined`, user has not login
   */
  googleFilesRef: React.MutableRefObject<GoogleFolder>;
  /**
   * this function fetch the data and set the tree data state
   */
  fetchPersonalVolumeRoot: () => Promise<void>;
  /**
   * if `targetFolder` is provided, the target folder will be expanded.
   * Otherwise, it will expand from root. This function also set the tree data state.
   */
  expandGoogleFolder: (targetFolder?: GoogleFolder) => Promise<void>;
} & Pick<
  Props,
  "handleUpload" | "onLastActiveNodeChange" | "onDragStart" | "onDragEnd"
>;

const FileTransferContext = createContext({} as FileTransferContextState);

export const useFileTransfer = () => useContext(FileTransferContext);

export const FileTransferProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const { listFolders, uploadFiles, moveFile, makeFolder } = localFileAPI;
  const { userId, sub } = useCnails();
  const [treeData1, setTreeData1] = useState<NodeModel<CustomData>[]>([]);
  const [treeData2, setTreeData2] = useState<NodeModel<CustomData>[]>([]);
  const [progress1, setProgress1] = useState<string>("");
  const [progress2, setProgress2] = useState<string>("");
  //  modal form
  const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] =
    useState<boolean>(false);
  const [isEditNameModalOpen, setIsEditNameModalOpen] =
    useState<boolean>(false);
  const lastActiveNodeRef = useRef<{
    treeId: string;
    node: NodeModel<CustomData>;
  }>();
  const googleFilesRef = useRef<GoogleFolder>();

  const tree1Id = "personal-volume";
  const tree1RootId = `/volumes/${userId}/persist`;
  const tree2Id = "google-drive";
  const tree2RootId = "root";

  const expandGoogleFolder = useCallback(
    async (
      targetFolder: GoogleFolder = {
        id: "root",
        name: "root",
        path: "/root",
        closed: false,
      }
    ) => {
      // googleFilesRef.current = await FileTransferHelper.expandGoogleFolder(
      //   googleFilesRef.current,
      //   targetFolder,
      //   sub
      // );
      // setTreeData2(convertGoogleTree(googleFilesRef.current));
    },
    [googleFilesRef, sub, setTreeData2]
  );

  const fetchPersonalVolumeRoot = useCallback(async () => {
    const response = await listFolders(userId);
    if (response.success) setTreeData1(convertDirectoryTree(response.tree));
    else
      myToast.error({
        title: "Fail to fetch personal volume",
        description: errorToToastDescription(response.error),
      });
  }, [setTreeData1]);

  const changeLastActiveNode = useCallback(
    (treeId: string, node: NodeModel<CustomData>) => {
      lastActiveNodeRef.current = {
        treeId,
        node,
      };
    },
    [lastActiveNodeRef]
  );

  const createFolder = useCallback(
    async (node: NodeModel<CustomData>, name: string) => {
      if (name == "") {
        myToast.error({
          title: "Fail operation failed",
          description: "Fail to create folder because folder name is empty.",
        });
        return;
      }
      let folderPath: string;
      if (!node) {
        // this is a root action
        folderPath = `/volumes/${userId}/persist/${name}`;
      } else if (node && node.droppable) {
        folderPath = `${node.data.filePath}/${name}`;
      } else if (node && !node.droppable) {
        folderPath = `${path.dirname(node.data.filePath)}/${name}`;
      }
      setProgress1(status.loading);
      const response = await makeFolder(userId, folderPath);
      setProgress1("");
      if (response.success) setTreeData1(convertDirectoryTree(response.tree));
      else
        myToast.error({
          title: "Fail to create folder",
          description: errorToToastDescription(response.error),
        });
    },
    [setTreeData1, userId, setProgress1]
  );

  const editName = useCallback(
    async (node: NodeModel<CustomData>, name: string) => {
      setProgress1(status.loading);
      const response = await moveFile(
        userId,
        node.data.filePath,
        `${path.dirname(node.data.filePath)}/${name}`
      );
      setProgress1("");
      if (response.success) setTreeData1(convertDirectoryTree(response.tree));
      else
        myToast.error({
          title: "Fail to edit file name",
          description: errorToToastDescription(response.error),
        });
    },
    [setTreeData1, userId, setProgress1]
  );

  const handleUpload = useCallback(
    async (acceptedFiles, _fileRejections, _event, node) => {
      setProgress1(status.uploading);
      let totalSize = 0;
      const formData = new FormData();
      for (let file of acceptedFiles) {
        let path = (file as any).path;
        if (isBlacklisted(path)) {
          continue;
        }
        if (file.size / 1048576 > 30) {
          setProgress1("");
          alert("Error: Some file size greater than 30MB");
          return;
        }
        totalSize += file.size;
        formData.append("files", file, `${path}`);
      }
      if (totalSize / 1048576 > 200) {
        setProgress1("");
        alert("Error: Total file size greater than 200MB");
        return;
      }
      const target = node
        ? node?.droppable
          ? node.data.filePath
          : path.dirname(node.data.filePath)
        : `/volumes/${userId}/persist`;
      formData.append("filePath", target);
      let response = await uploadFiles(userId, formData);
      setProgress1("");
      if (response.success) await fetchPersonalVolumeRoot();
      else {
        myToast.error({
          title: "Fail to upload files",
          description: errorToToastDescription(response.error),
        });
        await fetchPersonalVolumeRoot();
      }
    },
    [setProgress1, fetchPersonalVolumeRoot, userId]
  );

  const onLastActiveNodeChange = useCallback(
    (node: NodeModel<CustomData>, treeId: string) => {
      lastActiveNodeRef.current = {
        treeId,
        node,
      };
    },
    [lastActiveNodeRef]
  );

  useEffect(() => {
    fetchPersonalVolumeRoot();
    expandGoogleFolder();
  }, [expandGoogleFolder]);

  useInterval(expandGoogleFolder, 1000 * 30);
  useInterval(fetchPersonalVolumeRoot, 1000 * 30);

  return (
    <FileTransferContext.Provider
      value={{
        tree1Id,
        tree1RootId,
        tree2Id,
        tree2RootId,
        treeData1,
        treeData2,
        setTreeData1,
        setTreeData2,
        progress1,
        progress2,
        setProgress1,
        setProgress2,
        lastActiveNodeRef,
        changeLastActiveNode,
        createFolder,
        editName,
        handleUpload,
        onLastActiveNodeChange,
        isCreateFolderModalOpen,
        isEditNameModalOpen,
        setIsCreateFolderModalOpen,
        setIsEditNameModalOpen,
        googleFilesRef,
        fetchPersonalVolumeRoot,
        expandGoogleFolder,
      }}
    >
      {children}
      {/* create folder modal form  */}
      <CreateFolderForm
        isOpen={isCreateFolderModalOpen}
        setOpen={setIsCreateFolderModalOpen}
      ></CreateFolderForm>

      {/* edit name modal form */}
      <EditNameForm
        isOpen={isEditNameModalOpen}
        setOpen={setIsEditNameModalOpen}
        target={
          lastActiveNodeRef.current ? lastActiveNodeRef.current.node : undefined
        }
      ></EditNameForm>
    </FileTransferContext.Provider>
  );
};
