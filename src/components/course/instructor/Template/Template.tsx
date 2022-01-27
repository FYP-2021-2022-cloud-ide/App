import React , {useState, useRef} from "react"
import { useCnails } from "../../../../contexts/cnails";
import Menu from "../../CardMenu"
import Modal from "../../../Modal"
import { template } from "./TemplateList"
import TemplateUpdate from "./TemplateUpdate";
import { Dialog } from "@headlessui/react";
import Loader from "../../../Loader" ; 
import ReactTooltip from "react-tooltip";
import { InformationCircleIcon } from "@heroicons/react/solid";
import Toggle from "../../../Toggle";
interface TemplateProps {
    template: template
    memLimit: number
    numCPU: number
    sectionUserID: string
}



function Template({ template, memLimit, numCPU, sectionUserID }: TemplateProps) {
    const {removeTemplate, addContainer, removeContainer,activateTemplate,deactivateTemplate, sub} = useCnails();
    let [isOpen, setIsOpen] = useState(false)
    let [updateIsOpen, setUpdateIsOpen] = useState(false)
    let ref = useRef( )
    let [useFreshSave, setUseFreshSave] = useState(false)
    var instanceFlag = true
    if (template.containerID == undefined) {
        instanceFlag = false
    }

    const dialogClass = "inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-gray-800 shadow-xl rounded-2xl text-[#415A6E]"
    const titleClass = "text-xl font-medium leading-6 dark:text-gray-300 mb-5"
    const buttonsClass = "sm:flex sm:flex-row-reverse mt-4"
    const okButtonClass = "inline-flex justify-center w-full md:w-32 rounded-md px-4 py-2 bg-green-500 hover:bg-green-600 text-base leading-6 font-medium text-white shadow-sm focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
    const inputClass = "border dark:border-0 focus:outline-none dark:bg-gray-700 p-1 px-3 w-full text-gray-500 dark:text-gray-300 flex-row space-x-2  text-left rounded-md shadow-lg"

    const OpenContainer = () => {
        if (instanceFlag) {
            window.open("https://codespace.ust.dev/user/container/" + template.containerID + "/")
        }
    }

    var meunItems = [
        {
            text : "delete" , 
            onClick : async () => {
                const response = await removeTemplate(template.id,sectionUserID)
                console.log(response)
                window.location.reload()
            } , 
        }, 
        { 
            text : "update" , 
            onClick : ()=> setUpdateIsOpen(true)
        }, 
        {
            text :instanceFlag? "close" :  "open", 
            onClick :instanceFlag?   async () => {
                const response = await removeContainer(template.containerID, sub)
                console.log(response)
                window.location.reload()
            }:async () => {
                setIsOpen(true) ; 
                const response = await addContainer(template.imageId,memLimit,numCPU,sectionUserID,template.id,true,"student",useFreshSave)
                window.location.reload();
            }
        }, 
        {
            text : template.active ? "deactivate" : "activate" , 
            onClick : template.active ? async () => {
                        
                const response = await deactivateTemplate(template.id,sectionUserID)
                console.log(response)
                window.location.reload();
            }: async () => {
                const response = await activateTemplate(template.id,sectionUserID)
                console.log(response)
                window.location.reload();
            }
        },
    ]
    if (template.active){
        meunItems.push({
            text :  "share link" , 
            onClick : () => {
                navigator.clipboard.writeText("https://codespace.ust.dev/quickAssignmentInit/"+template.id)
            }
        })
    }

    return (
        <div onClick={OpenContainer} className={`min-h-36 h-36 border cursor-pointer border-gray-200 dark:border-gray-700 shadow-sm rounded-lg px-5 py-4 ${template.active ? "bg-white dark:bg-gray-600" : "bg-gray-200 dark:bg-gray-900"}`}>
            <div className="flex flex-row  justify-between h-full">
                <div className=" flex flex-row  space-x-3 ">
                    <div className="w-1/12 mt-4">
                        <span className="relative flex h-3 w-3">
                            {instanceFlag && <span className="absolute animate-ping inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>}
                            <span className={`relative inline-flex rounded-full h-3 w-3 ${instanceFlag ? "bg-green-400" : "bg-gray-400"}`}></span>
                        </span>
                    </div>
                    <div className="flex flex-col h-full justify-between w-full">
                        <div>
                            <div className="font-semibold text-sm text-gray-600 dark:text-gray-300  text-left ">{template.name}</div>
                            <div className="font-medium text-xs text-gray-400  ">{template.imageId}</div>
                        </div>
                        <div className="font-medium text-xs text-gray-400 justify-self-end">{template.description}</div>
                        {!template.isExam &&
                        <div>
                        <div className="flex flex-row font-medium mt-4 dark:text-gray-300">
                            <span>Use fresh new save</span>
                            <span >
                                <InformationCircleIcon data-for="messageTip" data-tip className="w-6 h-6"></InformationCircleIcon>
                                <ReactTooltip id="messageTip" place="top" effect="solid">
                                    this will overwrite the previous save(if exist)
                                </ReactTooltip>
                            </span>
                        </div>
                        <Toggle enabled={useFreshSave} onChange={() => setUseFreshSave(!useFreshSave)} />
                        </div>}
                        {template.isExam && <div className="badge border-0 dark:bg-gray-300 dark:text-gray-600">Exam</div>}
                    </div>
                </div>

                <div className="w-1/12">
                    <Menu items={meunItems}></Menu>
                </div>
            </div>
            <Modal isOpen={isOpen} setOpen={setIsOpen}>
                <div className={dialogClass}>
                    <Dialog.Title as="h3" className={titleClass} >
                        Create Workspace
                    </Dialog.Title>
                    <div className="text-gray-600 dark:text-gray-300">
                    Preparing the IDE Workspace with base template, please wait
                    </div>
                    <Loader></Loader>
                </div>
            </Modal>
            <Modal isOpen={updateIsOpen} setOpen={setUpdateIsOpen}>
                <TemplateUpdate closeModal={()=>setUpdateIsOpen(false)}
                template={template}  ref={ref}
                memLimit={memLimit} numCPU={numCPU} sectionUserID={sectionUserID}/>
            </Modal>
        </div>
    )
}

export default Template