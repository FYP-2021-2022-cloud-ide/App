import React from "react"

import { useCnails } from "../../../contexts/cnails";
interface EnvironmentProps{
    image: Image
}

interface Image{
    id:string
    imageName: string
    description: string
    imageId: string
}

function Environment({image}:EnvironmentProps){
    const { removeEnvironment} = useCnails();
    return(
        <div className="flex flex-col">
        <button className="border broder-gray-200 shadow-sm rounded-lg bg-white
        p-4 hover:shadow-lg transition-all ease-in-out duration-300"
        onClick ={(e) =>{
            }}
            tabIndex={0}
        >
            <div className="ml-4">
                <div className="font-semibold text-sm text-[#578CB5] text-left">{image.imageName}</div>
                <div className="font-medium text-xs text-gray-600 text-[#775FBD] text-left">{image.description}</div>
                <div className="flex flex-row justify-start gap-x-6 mt-4">
                    <div className="font-medium text-xs text-gray-400">
                        {image.imageId}
                    </div>
                </div>
            </div>
        </button>  
        <button className="mt-2 font-semibold border broder-gray-200 rounded-lg text-center bg-gray-200 text-sm text-gray-800 "
        onClick ={async () => {
            const response = await removeEnvironment(image.id)
            const remove = JSON.parse(response.message)
        }}>
            remove
        </button> 
        </div>
    )
}

export default Environment