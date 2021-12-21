import React from "react"
import {LogoutIcon} from "@heroicons/react/outline"
import {useCnails} from '../../../contexts/cnails'
import { useState } from 'react'
import Menu from "../CardMenu";
import Modal from "../../Modal"; 
import { Dialog} from '@headlessui/react'
import WorkspaceMenu from "./WorkspaceMenu"
import Loader from "../../Loader"
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
    const { addContainer ,removeContainer, sub} = useCnails();
    const [isOpen, setIsOpen] = useState(false)

    // styles 
    const dialogClass = "inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-gray-800 shadow-xl rounded-2xl text-[#415A6E]"
    const titleClass = "text-xl font-medium leading-6 dark:text-gray-300 mb-5"
    const buttonsClass = "sm:flex sm:flex-row-reverse mt-4"
    const okButtonClass = "inline-flex justify-center w-full md:w-32 rounded-md px-4 py-2 bg-green-500 hover:bg-green-600 text-base leading-6 font-medium text-white shadow-sm focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
    const inputClass = "border dark:border-0 focus:outline-none dark:bg-gray-700 p-1 px-3 w-full text-gray-500 dark:text-gray-300 flex-row space-x-2  text-left rounded-md shadow-lg"



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
                    <Menu items={[
                        {
                            text: template.containerID ? "close" : "open" , 
                            onClick : template.containerID ?  async () => {
                                const response = await removeContainer(template.containerID, sub)
                                window.location.reload()
                            } : async () => {
                                setIsOpen(true)
                                const response = await addContainer(template.imageId,memLimit,numCPU,sectionUserId,template.id,true,"student")
                                window.location.reload();
                            }
                        }
                    ]}></Menu>
                </div>
            </div>
            <Modal isOpen={isOpen} setOpen={setIsOpen}>
                <div className={dialogClass}>
                    <Dialog.Title
                        as="h3"
                        className={titleClass}
                    >
                        Create Worksapce 
                    </Dialog.Title>
                    <div className="dark:text-gray-300">
                    Preparing the workspace, please wait...
                    </div>
                    <Loader/>
                </div>
            </Modal>
        </div>
    )
}

export default Workspace