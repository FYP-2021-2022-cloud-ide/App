import { createContext, useContext } from "react";

type FileTransferContextState = {};

const FileTransferContext = createContext({} as FileTransferContextState);

export const useFileTransfer = () => useContext(FileTransferContext);

export const FileTransferProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  return (
    <FileTransferContext.Provider value={{}}>
      {children}
    </FileTransferContext.Provider>
  );
};
