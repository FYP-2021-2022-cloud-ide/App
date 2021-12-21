import { Transition } from "@headlessui/react";
import { Toast } from "react-hot-toast/dist/core/types"; 
import toast from "react-hot-toast";

import {CheckIcon,XIcon} from "@heroicons/react/solid"
import { useTheme } from "../contexts/theme";


interface NotificationProps {
  children: React.ReactNode
  trigger: Toast
}

interface NotificationBodyProps{
    id: string | undefined
    title: String
    body: String
    success: boolean
}

export function Notification({ children, trigger }: NotificationProps) {
  const {isDark } =  useTheme() 
  return (
      <Transition
        show={trigger.visible}
        enter="transform ease-out duration-300 transition"
        enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enterTo="translate-y-0 opacity-100 sm:translate-x-0"
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className={`max-w-md w-full bg-white shadow-lg rounded-xl pointer-events-auto ${isDark && "dark"}`}
      >
        <div className={`rounded-xl shadow-xs overflow-hidden  ${isDark && "dark"} bg-white dark:bg-gray-700`}>
          <div className="p-4 w-full">
            { children }
          </div>
        </div>
      </Transition>
    // </div>
  )
}

export function NotificationBody({id, title, body, success}:NotificationBodyProps) {
  // const dispatch = useLayoutDispatch();
  // const { notification } = useLayoutState();
  return (
    <div className="flex flex-row items-start">
        {
          success?<CheckIcon className="text-green-400 w-4 h-4" />: <XIcon className="text-red-400 w-4 h-4" />
        }
      
      <div className="ml-3 w-0 flex-1 pt-0.5">
        <p className="text-sm leading-5 font-medium text-gray-900 dark:text-gray-200">
          {title}
        </p>
        <p className="mt-1 text-sm leading-5 text-gray-500 dark:text-gray-300">
          {body}
        </p>
      </div>
      <div className="ml-4 flex">
        <button
          onClick={() => toast.dismiss(id)}
          className="inline-flex text-gray-400 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150">
          {/* Heroicon name: x */}
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  )
}