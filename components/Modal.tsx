import React, { useRef } from "react"
import { Dialog, Transition } from "@headlessui/react";
import { Fragment} from "react";
import { useTheme } from "../contexts/theme";

type CloseModal = (...args: Boolean[]) => void

interface ModalProps {
    children: React.ReactNode;
    isOpen: Boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>> , 
    outsideToClose? : boolean
 }

function Modal({children, isOpen, setOpen , outsideToClose = false}:ModalProps){
    const {isDark} = useTheme(); 
    return(
        //@ts-ignore
        <Transition show={isOpen!}>
            <div className="fixed z-10 inset-0 overflow-y-auto pointer-events-none">
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
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </Transition.Child>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
                <Dialog
                as="div"
                className={`fixed inset-0 z-10 overflow-y-auto ${isDark? "dark": ""}`}
                onClose={()=>{
                    if(outsideToClose)
                        setOpen(false)
                }}
                >
                    <div className="min-h-screen w-full px-4 text-center">
                        <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        >
                        <Dialog.Overlay className="fixed inset-0 dark:bg-black dark:opacity-70" />
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
    )
}

export default Modal