import React from "react"
import {MenuIcon} from "@heroicons/react/outline"

import { useCnails } from "../../../../contexts/cnails";
import EnvironmentMenu from "./EnvironmentMenu";
interface EnvironmentProps{
    sectionUserID: string
    environment: Environment
}

interface Environment{
    id:string
    environmentName: string
    libraries:string
    description: string
    imageId: string
}

function Environment({environment,sectionUserID}:EnvironmentProps){
    console.log(environment)
    return(
        <div className="border broder-gray-200 shadow-sm rounded-lg bg-white px-7 py-4">
            <div className="flex flex-row items-center">
                <div className="w-11/12">
                    <div className="font-semibold text-sm text-[#578CB5] text-left">{environment.environmentName}</div>
                    <div className="font-medium text-xs text-gray-600 text-[#775FBD] text-left">{environment.libraries}</div>
                    {/* <div className="flex flex-col justify-start gap-x-6 mt-4"> */}
                        <div className="font-medium text-xs text-gray-400">
                            Image id: {environment.imageId}
                        </div>
                        <div className="font-medium text-xs text-gray-400 mt-4">
                            {environment.description}
                        </div>
                    {/* </div> */}
                </div>
                <div className="w-1/12">
                    <EnvironmentMenu sectionUserID={sectionUserID} environment={environment}></EnvironmentMenu>
                </div>
            </div>
        </div>  
    )
}

export default Environment

{/* <button className="mt-2 font-semibold border broder-gray-200 rounded-lg text-center bg-gray-200 text-sm text-gray-800 "
        onClick ={async () => {
            const response = await removeEnvironment(image.id)
            const remove = JSON.parse(response.message)
        }}>
            remove
        </button>  */}
