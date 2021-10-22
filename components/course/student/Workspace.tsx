import React from "react"
import {LogoutIcon} from "@heroicons/react/outline"
import {useCnails} from '../../../contexts/cnails'
import { useState } from 'react'
import WorkspaceMenu from "./WorkspaceMenu"


interface WorkspaceProps{
    template: Template
    sectionUserId: string
}

interface Template{
    imageId: string
    id: string
    name: string
    description:string
    assignment_config_id: string
    storage: string
    containerID: string
    active: boolean
  }

function Workspace({template, sectionUserId}:WorkspaceProps){
    const baseClass = "relative inline-flex rounded-full h-3 w-3"
    const activeClass = "bg-green-400"
    const inactiveClass = "bg-gray-400"
    const [memLimit ,setmemLimit]= useState(100);
    const [numCPU ,setnumCPU]= useState(1);
    const {addContainer} = useCnails();


    var flag = true
    if (template.containerID == undefined){
        flag = false
    }
    return(
        <div className="border broder-gray-200 shadow-sm rounded-lg bg-white
        p-4 hover:shadow-lg transition-all ease-in-out duration-300 ">
            <div className="flex space-x-4 items-center">
                <div className="w-1/12">
                    <span className="relative flex h-3 w-3">
                        {flag && <span className="absolute animate-ping inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>}
                        <span className={`${baseClass} ${flag?activeClass:inactiveClass}`}></span>
                    </span>
                </div>
                <button onClick ={async (e) =>{
                    if(flag){
                        window.open("https://codespace.ust.dev/user/container/"+template.containerID+"/")
                    }
                }} className="w-9/12 text-left">
                    <div className="text-[#578CB5] font-semibold text-sm">{template.name}</div>
                    <div>
                        <a href={template.imageId} target="_blank" 
                        className="font-medium text-xs text-gray-600 underline">{template.imageId}</a>
                    </div>
                    
                    <div className="flex flex-row justify-start mt-2">
                        <div className="font-medium text-xs text-gray-600">
                            {template.description}
                        </div>
                    </div>
                </button>
                <div className="w-2/12">
                    <WorkspaceMenu templateID={template.id} containerID={template.containerID} sectionUserID={sectionUserId} imageID={template.imageId} memLimit={memLimit} numCPU={numCPU}></WorkspaceMenu>
                </div>
            </div>
        </div>
    )
}

export default Workspace