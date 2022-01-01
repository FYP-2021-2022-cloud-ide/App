import React from 'react'
import {ClockIcon, LogoutIcon} from "@heroicons/react/outline"

interface WorkSpaceProps{
    container: Container
}

interface Container{
    // name:string
    // link:string
    // description: string
    // existContainer: boolean 
    courseTitle: string
    assignmentName: string
    existedTime: string
    containerID: string
}



function WorkSpace({container}:WorkSpaceProps){
    const baseClass = "relative inline-flex rounded-full h-3 w-3"
    const activeClass = "bg-green-400"
    const inactiveClass = "bg-gray-400"
    const link = "https://codespace.ust.dev/user/container/"+container.containerID+"/"
    return(
        <button className="w-full border broder-gray-200 shadow-sm rounded-lg bg-white
        p-4 hover:shadow-lg transition-all ease-in-out duration-300 "
        onClick ={(e) =>{
            }}
            tabIndex={0}
        >
            <div className="flex flex-row space-x-4 items-center">
                <div className="w-1/12">
                    <span className="relative flex h-3 w-3">
                        {container.existedTime && <span className="absolute animate-ping inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>}
                        <span className={`${baseClass} ${container.existedTime?activeClass:inactiveClass}`}></span>
                    </span>
                </div>
                <div className="w-11/12 text-left">
                    <div className="text-[#578CB5] font-semibold text-sm">{container.assignmentName}</div>
                    <div>
                        <a href={link} target="_blank"  rel="noreferrer"
                        className="font-medium text-xs text-gray-600 underline">{container.containerID}</a>
                    </div>
                    <div className="flex flex-row justify-start">
                        <div className="font-medium text-xs text-gray-600">
                            {container.assignmentName}
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-row items-center space-x-1 justify-end mb-1 w-full">
                <ClockIcon className="h-5 w-5 text-gray-400"></ClockIcon>
                <div className="font-medium text-xs text-gray-400">{container.existedTime.slice(0,container.existedTime.indexOf('m')+1)}</div>
            </div>
            {/* <div className="flex space-x-4 items-center ">
                <div className="w-1/12">
                    <span className="relative flex h-3 w-3">
                        <span className="absolute animate-ping inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-400"></span>
                    </span>
                </div>
                <div className="w-9/12 my-3">
                    <div className="font-semibold text-sm text-gray-800">{container.assignmentName}</div>
                    <a href={link} target="_blank" className="font-medium text-xs text-gray-600 underline">{container.containerID}</a>
                    <div className="flex flex-row justify-start mt-2">
                        <div className="font-medium text-xs text-gray-600">
                            {container.assignmentName}
                        </div>
                    </div>
                </div>
                <div className="w-2/12">
                    <LogoutIcon className="text-gray-500 w-6 h-6"></LogoutIcon>
                </div>
            </div>
            
            <div className="flex flex-row items-center space-x-1 justify-end mb-1 w-full">
                <ClockIcon className="h-5 w-5 text-gray-400"></ClockIcon>
                <div className="font-medium text-xs text-gray-400">{container.existedTime.slice(0,container.existedTime.indexOf('m')+1)}</div>
            </div> */}

        </button>
    )
}

export default WorkSpace