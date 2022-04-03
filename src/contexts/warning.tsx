import { createContext, useContext, useState } from "react";

type WarningProviderProps = {
    children: JSX.Element
}

type Warning = {
    message: string;
    onCancel: () => void;
    onOK: () => void;
}


type WarningContextState = {
}

const WarningContext = createContext({} as WarningContextState);
export const useWarning = () => useContext(WarningContext);

export const WarningProvider = ({ children }: WarningProviderProps) => {
    const [warning, setWarning] = useState<Warning>();
    return <WarningContext.Provider value={{}}>{children}

    </WarningContext.Provider>
}


