import React from "react"
import { useCnails } from "../../../../contexts/cnails";
import TemplateMenu from "./TemplateMenu"

interface TemplateProps{
    template: Template
    memLimit: number
    numCPU: number
    sectionUserID: string
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

function Template({template, memLimit, numCPU, sectionUserID}: TemplateProps){
    const { addContainer,removeTemplate} = useCnails();
    const instanceBaseClass = "relative inline-flex rounded-full h-3 w-3"
    const instanceActiveClass = "bg-green-400"
    const instanceInactiveClass = "bg-gray-400"
    const baseClass = 'w-full border broder-gray-200 shadow-sm rounded-lg hover:shadow-lg transition-all ease-in-out duration-300 px-5 py-4'
    const activeClass = "bg-white"
    const inactiveClass = "bg-gray-100"
    console.log(template.containerID)
    var instanceFlag = true
    if (template.containerID == undefined){
        instanceFlag = false
    }
    if (template.description == ""){
        template.description = "blank"
    }
    return(  
        <div className={`${baseClass} ${template.active?activeClass:inactiveClass}`}>
            <div className="flex flex-row items-center space-x-3">
            <div className="w-1/12">
                    <span className="relative flex h-3 w-3">
                        {instanceFlag && <span className="absolute animate-ping inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>}
                        <span className={`${instanceBaseClass} ${instanceFlag?instanceActiveClass:instanceInactiveClass}`}></span>
                    </span>
                </div>
                <button onClick={()=>{
                    if (instanceFlag){
                        window.open("https://codespace.ust.dev/user/container/"+template.containerID+"/")
                    }
                }}  className="text-left w-10/12">
                    <div className="font-semibold text-sm text-[#578CB5] text-left ">{template.name}</div>
                    <div className="font-medium text-xs text-gray-400  ">
                        {/* <a href={template.imageId}  target="_blank" 
                            >{template.imageId}</a> */}
                        Image id: {template.imageId}
                    </div>
                    <div className="font-medium text-xs text-gray-400 mt-4">
                        {template.description}
                    </div>
                </button>
                
                <div className="w-1/12">
                    <TemplateMenu template={template} memLimit={memLimit} numCPU={numCPU} sectionUserID={sectionUserID}></TemplateMenu>
                </div>
            </div>
            
        </div>
    )
}

export default Template