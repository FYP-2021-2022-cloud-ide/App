import React from "react"
import { useState } from 'react'
import Menu from "../course/CardMenu";
import Modal from "../Modal"; 
import { Dialog} from '@headlessui/react'
import Loader from "../Loader"
import { sandbox } from "./SandboxList"
import SandboxUpdate from "./SandboxUpdate";
import { sandboxAPI } from "../../lib/sandboxAPI";
import { useCnails } from "../../contexts/cnails";
interface props{
    sandbox: sandbox
    memLimit:Number
    numCPU:Number
}

function LoadingBox(){
    const dialogClass = "inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-gray-800 shadow-xl rounded-2xl text-[#415A6E]"
    const titleClass = "text-xl font-medium leading-6 dark:text-gray-300 mb-5"
    return(
        <div className={dialogClass}>
            <Dialog.Title
                as="h3"
                className={titleClass}
            >
                Create Sandbox
            </Dialog.Title>
            <div className="dark:text-gray-300">
            Preparing the sandbox, please wait...
            </div>
            <Loader/>
        </div>
    )
}

function Sandbox({sandbox,memLimit,numCPU}:props){
    const baseClass = "relative inline-flex rounded-full h-3 w-3"
    const activeClass = "bg-green-400"
    const inactiveClass = "bg-gray-400"
    const [isOpen, setIsOpen] = useState(false)
    const [modalType, setModalType] = useState("loadingBox")
    let [useFreshSave, setUseFreshSave] = useState(false)
    const {userId, sub} = useCnails()
    const { addSandbox,removeSandbox,removeSandboxImage } = sandboxAPI;
    // styles 
    const closeModal = ()=>{
        setIsOpen(false)
    }

    const openModal = ()=>{
        setIsOpen(true)
    }
    
    const buttonsClass = "sm:flex sm:flex-row-reverse mt-4"
    const okButtonClass = "inline-flex justify-center w-full md:w-32 rounded-md px-4 py-2 bg-green-500 hover:bg-green-600 text-base leading-6 font-medium text-white shadow-sm focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
    const inputClass = "border dark:border-0 focus:outline-none dark:bg-gray-700 p-1 px-3 w-full text-gray-500 dark:text-gray-300 flex-row space-x-2  text-left rounded-md shadow-lg"



    var instanceFlag = true
    if (sandbox.sandboxesId == undefined){
        instanceFlag = false
    }
    const OpenSandbox= () => {
        if (instanceFlag) {
            window.open("https://codespace.ust.dev/user/container/" + sandbox.sandboxesId + "/")
        }
    }
    var meunItems = [
        {
            text:instanceFlag? "Close" :  "Open", 
            onClick :instanceFlag?async ()=>{
                setModalType('loadingBox')

                openModal()
                const response = await removeSandbox( sandbox.sandboxesId,userId)
                if (response.success) {
                    closeModal()
                    window.location.reload();
                } else {
                    alert(response.message)
                }
            }:  async ()=>{
                setModalType('loadingBox')

                openModal()
                const response = await addSandbox( memLimit,  numCPU, sandbox.id)
                if (response.success) {
                    closeModal()
                    window.location.reload();
                } else {
                    alert(response.message)
                }
            }
        },
        {
            text: "Delete" , 
            onClick : async ()=>{
                const response = await removeSandboxImage(  sandbox.id,userId)
                if (response.success) {
                    window.location.reload();
                } else {
                    window.location.reload();
                    alert(response.message)
                }
            }
        },
        {
            text: "Update" , 
            onClick : ()=>{
                setModalType('update')
                openModal()
            }
        }
    ]
    return(
        <div key={sandbox.id} onClick={OpenSandbox} className="min-h-36 h-36 border cursor-pointer border-gray-200 dark:border-gray-700 shadow-sm rounded-lg px-5 py-4 bg-white dark:bg-gray-600">
            <div className="flex flex-row space-x-4 items-start">
                <div className="w-1/12 mt-4">
                    <span className="relative flex h-3 w-3">
                        {instanceFlag && <span className="absolute animate-ping inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>}
                        <span className={`${baseClass} ${instanceFlag?activeClass:inactiveClass}`}></span>
                    </span>
                </div>
                <div className="w-full">
                    <div className="text-[#578CB5] font-semibold text-sm">{sandbox.title}</div>
                    {/* <div>
                        <a href={template.imageId} target="_blank"  rel="noreferrer"
                        className="font-medium text-xs text-gray-600 underline dark:text-gray-300">{template.imageId}</a>
                    </div> */}
                    
                    <div className="flex flex-row justify-start mt-2">
                        <div className="font-medium text-xs text-gray-600 dark:text-gray-300">
                           {sandbox.description}
                        </div>
                    </div>
                </div>
                <div className="w-1/12">
                    <Menu items={meunItems }></Menu>
                </div>
            </div>
            <Modal isOpen={isOpen} setOpen={setIsOpen}>
                    {modalType == 'loadingBox'?(
                        <LoadingBox/>
                    ):(
                        <SandboxUpdate  memLimit={memLimit} numCPU={numCPU} sandbox={sandbox} closeModal={closeModal}/>
                    )}
            </Modal>
        </div>
    )
}

export default Sandbox