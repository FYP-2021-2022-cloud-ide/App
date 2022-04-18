import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import Twemoji from "react-twemoji";
import Modal from "../components/Modal";

type WarningProviderProps = {
  children: JSX.Element;
};

type Warning = {
  message: string;
  onCancel: () => void;
  onOK: () => void;
  okbtnText?: string;
  cancelBtnText?: string;
};

type WarningContextState = {
  showWarning: (warning: Warning) => void;
  /**
   * one step further than showWarning
   */
  waitForConfirm: (message: string) => Promise<boolean>;
};

const WarningContext = createContext({} as WarningContextState);
/**
 * this is a top level context to show a warning in the app
 * @returns
 */
export const useWarning = () => useContext(WarningContext);

type Props = {
  warning: Warning;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setWarning: React.Dispatch<React.SetStateAction<Warning>>;
  isOpen: boolean;
};

const WarningModal = ({ warning, setOpen, isOpen, setWarning }: Props) => {
  const onCancel = useCallback(() => {
    warning.onCancel();
  }, [warning, setWarning, setOpen]);

  const onOK = useCallback(() => {
    warning.onOK();
  }, [warning, setOpen, setWarning]);

  const onClose = useCallback(() => {
    warning.onCancel();
  }, [warning, setWarning]);

  useEffect(() => {
    warning;
  });

  return (
    <Modal
      isOpen={isOpen}
      setOpen={setOpen}
      onClose={onClose}
      escToClose
      clickOutsideToClose
    >
      <div data-warning className="modal-form ">
        <Twemoji noWrapper options={{ className: "twemoji" }}>
          {warning ? (
            <div className="flex flex-col">
              <div className="flex flex-row space-x-2 max-w-md">
                {"⚠️"}
                <span className="text-sm">{warning.message}</span>
              </div>
              <div id="btn-group">
                <button onClick={onCancel} id="btn-cancel">
                  {warning.cancelBtnText ?? "Cancel"}
                </button>
                <button onClick={onOK} id="btn-ok">
                  {warning.okbtnText ?? "OK"}
                </button>
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </Twemoji>
      </div>
    </Modal>
  );
};

export const WarningProvider = ({ children }: WarningProviderProps) => {
  const [warning, setWarning] = useState<Warning>();
  const [open, setOpen] = useState<boolean>(false);

  const showWarning = (warning: Warning) => {
    setOpen(true);
    setWarning(warning);
  };

  const waitForConfirm = (message: string) =>
    new Promise<boolean>((resolve, reject) => {
      showWarning({
        message: message,
        onCancel: () => {
          resolve(false);
          setOpen(false);
        },
        onOK: () => {
          resolve(true);
          setOpen(false);
        },
        okbtnText: "Confirm",
      });
    });

  useEffect(() => {
    if (!open) setWarning(undefined);
  }, [open]);

  return (
    <WarningContext.Provider
      value={{
        showWarning,
        waitForConfirm,
      }}
    >
      {children}
      <WarningModal
        isOpen={open}
        setOpen={setOpen}
        warning={warning}
        setWarning={setWarning}
      ></WarningModal>
    </WarningContext.Provider>
  );
};
