import React from 'react'
import {LogoutIcon, ClockIcon} from "@heroicons/react/outline"
import { useCnails } from "../../contexts/cnails";
interface CodeSpaceItemProps{
    item: Item
}

interface Item{
    courseTitle: string
    assignmentName: string
    existedTime: string
    containerID: string
}

function CodeSpace({item}:CodeSpaceItemProps){
    // const { removeContainer} = useCnails();
    return(
        <div>
        <a href={"https://codespace.ust.dev/user/container/"+item.containerID+"/"}  
        target="_blank"
        className="flex flex-col justify-between border
        rounded-xl border-gray-200 border shadow-sm hover:shadow-lg min-w-max mr-4 transition-all ease-in-out duration-300 p-4" 
        >
            <div className="flex space-x-4 items-center">
                <div className="w-1/12">
                    <span className="relative flex h-3 w-3">
                        <span className="absolute animate-ping inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-400"></span>
                    </span>
                </div>
                <div className="w-9/12 my-3">
                    <div className="font-semibold text-sm text-gray-800">{item.assignmentName}</div>
                    <div className="font-medium text-xs text-gray-600">{item.courseTitle}</div>
                </div>
                <div className="w-2/12">
                    <LogoutIcon className="text-gray-500 w-6 h-6"></LogoutIcon>
                </div>
            </div>
            <div className="w-12/12 flex flex-row justify-end items-center space-x-1 mb-1">
                <ClockIcon className="h-4 w-4 text-gray-600"></ClockIcon>
                <div className="font-medium text-xs text-gray-600">{item.existedTime.slice(0,item.existedTime.indexOf('m')+1)}</div>
            </div>     
        </a> 
        {/* <button className="border broder-gray-200 "           
                onClick ={async () => {
                    const response = await removeContainer(item.containerId as string)
                    const res = JSON.parse(response.message)
                }}
                    tabIndex={0}
        >delete</button>  */}
        </div>
    )
}

export default CodeSpace