import React from 'react'

interface WorkSpaceProps{
    container: Container
}

interface Container{
    name:string
    link:string
    description: string
    existContainer: boolean
}



function WorkSpace({container}:WorkSpaceProps){
    const baseClass = "relative inline-flex rounded-full h-3 w-3"
    const activeClass = "bg-green-400"
    const inactiveClass = "bg-gray-400"
    return(
        <button className="border broder-gray-200 shadow-sm rounded-lg bg-white
        p-4 hover:shadow-lg transition-all ease-in-out duration-300 "
        onClick ={(e) =>{
            }}
            tabIndex={0}
        >
            <div className="flex space-x-4 items-center">
                <div className="w-1/12">
                    <span className="relative flex h-3 w-3">
                        
                        {container.existContainer && <span className="absolute animate-ping inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>}
                        <span className={`${baseClass} ${container.existContainer?activeClass:inactiveClass}`}></span>
                    </span>
                </div>
                <div className="w-1/12 text-left">
                    <div className="text-[#578CB5] font-semibold text-sm">{container.name}</div>
                    <div>
                        <a href={container.link} target="_blank" 
                        className="font-medium text-xs text-gray-600 underline">{container.link}</a>
                    </div>
                    
                    <div className="flex flex-row justify-start mt-2">
                        <div className="font-medium text-xs text-gray-600">
                            {container.description}
                        </div>
                    </div>
                </div>
            </div>

        </button>
    )
}

export default WorkSpace