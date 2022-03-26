import React, { useEffect, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useWindowEvent } from "./useWindowEvent";
import { Fragment } from "react";

export type ModalProps = {
  isOpen: Boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  clickOutsideToClose?: boolean;
  escToClose?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
};

function Modal({
  children,
  isOpen,
  setOpen,
  clickOutsideToClose = false,
  escToClose = false,
  onOpen,
  onClose,
}: ModalProps & { children: React.ReactNode }) {
  useWindowEvent("keydown", (event) => {
    if (event.key !== "Escape") return;
    if (escToClose) {
      if (onClose) onClose();
      setOpen(false);
    }
  });
  useEffect(() => {
    if (isOpen) {
      if (onOpen) onOpen();
    }
  }, [isOpen]);
  return (
    <Transition as={Fragment} show={Boolean(isOpen!)}>
      <div className="fixed z-[999] inset-0 overflow-y-auto pointer-events-none">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            className="fixed inset-0 transition-opacity pointer-events-none"
          >
            {/* This element is to trick the browser into centering the modal contents. */}

            <div className="absolute inset-0 transparent"></div>
          </Transition.Child>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
          &#8203;
          <Dialog
            as="div"
            className={`fixed inset-0 z-[10] overflow-y-auto `}
            open={Boolean(isOpen)}
            // this will disable the orginal useWindowEvent
            onClose={() => null}
          >
            <div className="min-h-screen w-full px-4 text-center z-[100]">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                {/* use a custom div instead of Dialog.overlay such that onClick is working */}
                <div
                  className="fixed inset-0 bg-black opacity-70 "
                  id="modal-overlay"
                  onClick={() => {
                    if (clickOutsideToClose) {
                      if (onClose) onClose();
                      setOpen(false);
                    }
                  }}
                ></div>
              </Transition.Child>

              {/* This element is to trick the browser into centering the modal contents. */}
              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                {children}
              </Transition.Child>
            </div>
          </Dialog>
        </div>
      </div>
    </Transition>
  );
}

export default Modal;
