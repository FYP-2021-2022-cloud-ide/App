import {CubeTransparentIcon} from '@heroicons/react/outline'
import {PlusCircleIcon} from "@heroicons/react/solid"
import { useState } from "react"
import WorkSpace from "./WorkSpace"

interface container{
    name:string
    link:string
    description: string
    existContainer: boolean
    existedTime: string
}

interface props{
    containers: container[]
}


const WorkSpaceList = ({containers}:props)=>{//
    var containers =[{name:'dsfas', 
    link:'https://www.google.com',
    description: 'dsf32423423423423423423as',
    existContainer: false,
    existedTime: '32423534'}]
    let [isOpen, setIsOpen] = useState(false)

    function openModal() {
        setIsOpen(true)
    }

    function closeModal(){
        setIsOpen(false)
    }
    
    return(
        <div className="flex flex-col justify-start text-gray-600">
            <div className="flex flex-row justify-start gap-x-4 pb-4">
                <CubeTransparentIcon className="w-7 h-7"></CubeTransparentIcon>
                <div className="text-lg">Workspace</div>
                <button onClick={openModal}>
                    <PlusCircleIcon className="w-7 h-7 hover:scale-110 transition transition-all ease-in-out duration-300"></PlusCircleIcon>
                </button>
            </div>
            <div className="flex flex-col space-y-5">
                {containers!=null && containers.map((container)=>{
                    return(
                        <WorkSpace container={container}></WorkSpace>
                    );
                    })
                }
                {containers== null &&
                <button className="border broder-gray-200 shadow-sm rounded-lg bg-white
                p-4 hover:shadow-lg transition-all ease-in-out duration-300 h-24"
                onClick ={(e) =>{
                    }}
                    tabIndex={0}
                >
                    <div className="ml-4 font-semibold text-sm text-gray-500 text-left">
                        You have no workspace for this course yet.
                    </div>
                </button>}
            </div>
        </div>
    )
}

export default WorkSpaceList