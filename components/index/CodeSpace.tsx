import React from 'react'
import { LogoutIcon, ClockIcon } from "@heroicons/react/outline"
import { useCnails } from "../../contexts/cnails";
interface CodeSpaceItemProps {
    item: Item
}

interface Item {
    courseTitle: string
    assignmentName: string
    existedTime: string
    containerID: string
}

function CodeSpace({ item }: CodeSpaceItemProps) {
    // const { removeContainer} = useCnails();
    return (
        <a target="_blank" href={"https://codespace.ust.dev/user/container/" + item.containerID + "/"} className="my-3 flex flex-col h-full justify-between
        rounded-xl border-gray-200 dark:border-gray-700 border shadow-sm hover:shadow-lg min-w-max mr-4 transition-all ease-in-out duration-300 p-4 bg-white dark:bg-gray-600">

            <div className="flex flex-row  space-x-4 items-start ">
                <div className="w-1/12 mt-4">
                    <span className="relative flex h-3 w-3">
                        <span className="absolute animate-ping inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-400"></span>
                    </span>
                </div>
                <div className="w-9/12">
                    <div className="font-semibold text-sm text-gray-800 dark:text-gray-200">{item.assignmentName}</div>
                    <div className="font-medium text-xs text-gray-600 dark:text-gray-300" >{item.courseTitle}</div>
                </div>
                <div className="w-2/12 mt-1">
                    <LogoutIcon className="text-gray-500 dark:text-gray-300 w-6 h-6"></LogoutIcon>
                </div>
            </div>
            <div className="w-12/12 flex flex-row justify-end items-center space-x-1 mb-3">
                <ClockIcon className="h-4 w-4 text-gray-600 dark:text-gray-300 "></ClockIcon>
                <div className="font-medium text-xs text-gray-600 dark:text-gray-300">{item.existedTime.slice(0, item.existedTime.indexOf('m') + 1)}</div>
            </div>

        </a>
    )
}

export default CodeSpace