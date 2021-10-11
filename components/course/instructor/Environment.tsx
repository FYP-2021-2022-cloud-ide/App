import React from "react"

interface EnvironmentProps{
    image: Image
}

interface Image{
    imageName: string
    description: string
    imageId: string
}

function Environment({image}:EnvironmentProps){
    return(
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
    )
}

export default Environment