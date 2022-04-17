import { NodeModel } from "@minoru/react-dnd-treeview";
import { useRef, useState } from "react";
import { createContext, useContext } from "react";
import { CustomData } from "../components/CustomTree/CustomNode";

type FileTransferContextState = {};

const FileTransferContext = createContext({} as FileTransferContextState);

export const useFileTransfer = () => useContext(FileTransferContext);

export const FileTransferProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const [treeData1, setTreeData1] = useState<NodeModel<CustomData>[]>([]);
  const [treeData2, setTreeData2] = useState<NodeModel<CustomData>[]>([]);
  const [progress1, setProgress1] = useState<string>();
  const [progress2, setProgress2] = useState<string>();
  const lastActiveNodeRef = useRef<{
    treeId: string;
    node: NodeModel<CustomData>;
  }>();

  return (
    <FileTransferContext.Provider value={{}}>
      {children}
    </FileTransferContext.Provider>
  );
};
