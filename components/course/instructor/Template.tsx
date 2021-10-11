import React from "react"
import { useCnails } from "../../../contexts/cnails";

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
    assignment_config_id: string
    storage: string
}

function Template({template, memLimit, numCPU, sectionUserID}: TemplateProps){
    const { addContainer} = useCnails();
    return(
        <button className="border broder-gray-200 shadow-sm rounded-lg bg-white
        p-4 hover:shadow-lg transition-all ease-in-out duration-300"           
        onClick ={async () => {
            const fakeWindow= window.open("",'_blank')
            const response = await addContainer(template.imageId,memLimit,numCPU,sectionUserID,template.id)
            const container = JSON.parse(response.message)
            if(container.success){
                fakeWindow?.location.replace("https://codespace.ust.dev/user/container/"+container.containerId+"/")
            }
        }}
            tabIndex={0}
        >
            <div className="ml-4 text-left">
                <div className="font-semibold text-sm text-gray-800 ">{template.name}</div>
                <div className="font-medium text-xs text-gray-600  underline">
                    {/* <a href={template.imageId}  target="_blank" 
                        >{template.imageId}</a> */}
                    from {template.imageId}
                </div>
                <div className="mt-2 font-semibold border broder-gray-200 rounded-lg text-center bg-gray-200 text-sm text-gray-800 ">
                Enter IDE
                </div>
                {/* <div className="flex flex-row justify-start mt-4">
                    <div className="font-medium text-xs text-gray-600 ">
                    assignment_config_id: {template.assignment_config_id}
                    </div>
                </div>
                <div className="font-medium text-sm text-gray-600 ">
                    Storage: {template.storage}
                </div> */}
            </div>
        </button>
    )
}

export default Template