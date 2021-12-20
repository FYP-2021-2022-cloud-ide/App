import React from "react"
import {LogoutIcon} from "@heroicons/react/outline"
import {useCnails} from '../../../contexts/cnails'
import { useState } from 'react'
import WorkspaceMenu from "./WorkspaceMenu"
import {template}from "../instructor/Template/TemplateList"

interface WorkspaceProps{
    template: template
    sectionUserId: string
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
        <div onClick={async (e) =>{
            if(flag){
                window.open("https://codespace.ust.dev/user/container/"+template.containerID+"/")
            }
        }} className="min-h-36 h-36 border cursor-pointer border-gray-200 dark:border-gray-700 shadow-sm rounded-lg px-5 py-4 bg-white dark:bg-gray-600">
            <div className="flex flex-row space-x-4 items-start">
                <div className="w-1/12 mt-4">
                    <span className="relative flex h-3 w-3">
                        {flag && <span className="absolute animate-ping inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>}
                        <span className={`${baseClass} ${flag?activeClass:inactiveClass}`}></span>
                    </span>
                </div>
                <div className="w-full">
                    <div className="text-[#578CB5] font-semibold text-sm">{template.name}</div>
                    <div>
                        <a href={template.imageId} target="_blank" 
                        className="font-medium text-xs text-gray-600 underline dark:text-gray-300">{template.imageId}</a>
                    </div>
                    
                    <div className="flex flex-row justify-start mt-2">
                        <div className="font-medium text-xs text-gray-600 dark:text-gray-300">
                            {template.description}
                        </div>
                    </div>
                </div>
                <div className="w-1/12">
                    <WorkspaceMenu template={template} containerID={template.containerID} sectionUserID={sectionUserId} memLimit={memLimit} numCPU={numCPU}></WorkspaceMenu>
                </div>
            </div>
        </div>
    )
}

export default Workspace