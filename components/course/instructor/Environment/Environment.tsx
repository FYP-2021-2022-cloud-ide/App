import React from "react"
import EnvironmentMenu from "./EnvironmentMenu";
import {EnvironmentContent}  from "./EnvironmentList"

interface EnvironmentProps {
    sectionUserID: string
    environment: EnvironmentContent
}

function Environment({ environment, sectionUserID }: EnvironmentProps) {
    console.log(environment)
    return (
        <div className="border broder-gray-200 dark:border-gray-700 shadow-sm rounded-lg bg-white dark:bg-gray-600 px-4 py-4 min-h-36 h-36">
            <div className="flex flex-row items-start h-full justify-between">
                <div className="flex flex-col h-full justify-between">
                    <div>
                        <div className="font-semibold text-sm text-gray-600 dark:text-gray-300 text-left">{environment.environmentName}</div>
                        <div className="font-medium text-xs text-gray-600 dark:text-gray-300 text-left">{environment.libraries}</div>
                        <div className="font-medium text-xs text-gray-400">{environment.imageId}</div>
                    </div>
                    <div className="font-medium text-xs text-gray-400">{environment.description}</div>
                </div>
                <EnvironmentMenu sectionUserID={sectionUserID} environment={environment}></EnvironmentMenu>
            </div>
        </div>
    )
}

export default Environment

