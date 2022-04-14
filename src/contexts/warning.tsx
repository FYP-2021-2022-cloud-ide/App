import React, { createContext, useContext, useEffect, useState } from "react";
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
  return (
    <Modal
      isOpen={isOpen}
      setOpen={setOpen}
      onClose={() => {
        warning.onCancel();
        setWarning(undefined);
      }}
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
                <button
                  onClick={() => {
                    warning.onCancel();
                    setWarning(undefined);
                    setOpen(false);
                  }}
                  id="btn-cancel"
                >
                  {warning.cancelBtnText ?? "Cancel"}
                </button>
                <button
                  onClick={() => {
                    warning.onOK();
                    setOpen(false);
                    setWarning(undefined);
                  }}
                  id="btn-ok"
                >
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
    if (open) setOpen(false);
    setOpen(true);
    setWarning(warning);
  };

  const waitForConfirm = (message: string) =>
    new Promise<boolean>((resolve, reject) => {
      showWarning({
        message: message,
        onCancel: () => {
          resolve(false);
        },
        onOK: () => resolve(true),
        okbtnText: "Confirm",
      });
    });

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
