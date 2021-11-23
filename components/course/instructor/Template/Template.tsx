import React from "react"
import { useCnails } from "../../../../contexts/cnails";
import TemplateMenu from "./TemplateMenu"

interface TemplateProps {
    template: Template
    memLimit: number
    numCPU: number
    sectionUserID: string
}

interface Template {
    imageId: string
    id: string
    name: string
    description: string
    assignment_config_id: string
    storage: string
    containerID: string
    active: boolean
}

function Template({ template, memLimit, numCPU, sectionUserID }: TemplateProps) {
    var instanceFlag = true
    if (template.containerID == undefined) {
        instanceFlag = false
    }

    const OpenContainer = () => {
        if (instanceFlag) {
            window.open("https://codespace.ust.dev/user/container/" + template.containerID + "/")
        }
    }

    return (
        <div onClick={OpenContainer} className={`min-h-36 h-36 border cursor-pointer border-gray-200 dark:border-gray-700 shadow-sm rounded-lg hover:shadow-lg px-5 py-4 ${template.active? "bg-white dark:bg-gray-600" : "bg-gray-200 dark:bg-gray-900"}`}>
            <div className="flex flex-row items-start space-x-3 h-full ">
                <div className="w-1/12 mt-4">
                    <span className="relative flex h-3 w-3">
                        {instanceFlag && <span className="absolute animate-ping inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>}
                        <span className={`relative inline-flex rounded-full h-3 w-3 ${instanceFlag ? "bg-green-400" : "bg-gray-400"}`}></span>
                    </span>
                </div>
                <div className="flex flex-col h-full justify-between">
                    <div>
                        <div className="font-semibold text-sm text-gray-600 dark:text-gray-300  text-left ">{template.name}</div>
                        <div className="font-medium text-xs text-gray-400  ">{template.imageId}</div>
                    </div>
                    <div className="font-medium text-xs text-gray-400 justify-self-end">{template.description}</div>
                </div>

                <div className="w-1/12">
                    <TemplateMenu template={template} memLimit={memLimit} numCPU={numCPU} sectionUserID={sectionUserID}></TemplateMenu>
                </div>
            </div>



        </div>
    )
}

export default Template