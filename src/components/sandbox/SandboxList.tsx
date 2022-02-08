import { CubeTransparentIcon } from "@heroicons/react/outline"
import { PlusCircleIcon } from "@heroicons/react/solid"
import Sandbox from "./Sandbox"
import EmptyDiv from "../EmptyDiv"
import { useState } from "react"
import Modal from "../Modal"
import SandboxCreate from "./SandboxCreate"

// interface props {
//     templates: template[]
//     sectionUserId: string
// }

export interface sandbox {
    id: string
    title: string
    description: string
    imageId: string
    sandboxesId: string
}

interface props{
    sandboxes: sandbox[]
}

const SandboxList = ({sandboxes}:props) => {
    let [isOpen, setIsOpen] = useState(false)
    const [memLimit ,setmemLimit]= useState(300);
    const [numCPU ,setnumCPU]= useState(1);
    function openModal() {
        setIsOpen(true)
    }
    function closeModal() {
        setIsOpen(false)
    }
    console.log(sandboxes)
    // for testing
    // sandboxes = [
    //     {
    //         id:"testing1",
    //         name:"testing1",
    //         description:"testing1",
    //         imageId:"testing1",
    //         containerID:"testing1"
    //     },
    //     {
    //         id:"haha2",
    //         name:"haha2",
    //         description:"haha2",
    //         imageId:"haha2",
    //         containerID:"haha2"
    //     },
    //     {
    //         id:"byebye3",
    //         name:"byebye3",
    //         description:"byebye3",
    //         imageId:"byebye3",
    //         containerID:"byebye3"
    //     }
    // ]
    return (
        <div className="flex flex-col justify-start w-full">
            <div className="text-gray-600 flex flex-row justify-start gap-x-4 pb-4 dark:text-gray-300">
                {/* <img src="/coursePage/workspacesLogo.svg"  className="" /> */}
                <CubeTransparentIcon className="w-7 h-7"></CubeTransparentIcon>
                <div className="text-lg ">Sandbox</div>
                <button onClick={openModal}>
                    <PlusCircleIcon className="w-7 h-7 hover:scale-110 transition ease-in-out duration-300"></PlusCircleIcon>
                </button>
            </div>
            {(sandboxes?.length == 0) ? <EmptyDiv message="There is no sandboxes yet."></EmptyDiv> :
                <div className="grid grid-cols-2 gap-8">
                    {sandboxes.map((sandbox) => {
                        return <Sandbox memLimit={memLimit} numCPU={numCPU} sandbox={sandbox}/>
                    })}
                </div>
            }
            <Modal isOpen={isOpen} setOpen={setIsOpen}>
                <SandboxCreate memLimit={memLimit} numCPU={numCPU} closeModal={closeModal}/>
            </Modal>
        </div>
    )
}

export default SandboxList