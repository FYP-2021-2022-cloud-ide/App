import { createContext, useContext } from "react";

type CustomTreeContextState = {};

const CustomTreeContext = createContext({} as CustomTreeContextState);

export const useFileTransfer = () => useContext(CustomTreeContext);

export const CustomTreeProvider = ({ children }: { children: JSX.Element }) => {
  return (
    <CustomTreeContext.Provider value={{}}>
      {children}
    </CustomTreeContext.Provider>
  );
};
