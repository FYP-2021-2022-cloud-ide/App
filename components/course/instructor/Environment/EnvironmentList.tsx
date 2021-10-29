import Environment from "./Environment"
import EnvironmentCreate from "./EnvironmentCreate"
import {CubeIcon} from "@heroicons/react/outline"
import {PlusCircleIcon} from "@heroicons/react/solid"
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import Modal from "../../../Modal"
import ListBox from "../../../ListBox"
import Select from 'react-select'

import { useCnails } from "../../../../contexts/cnails";

interface EnvironmentContent{
    id:string
    imageId:string
    environmentName: string
    libraries:string
    description: string
}

interface props{
    sectionUserID:string
    environments: EnvironmentContent[]
}
 
const EnvironmentList = ({sectionUserID,environments}:props)=>{//
    // var images=[
    //     { name: "fdgsdd",
    //     description: "sdfgdga gdfgggfdgdgdfgdf dfg sdfgsfd gsd gs dd"},
    //     { name: "fdgsdd",
    //     description: "sdfgdga gdfgggfdgdgdfgdf dfg sdfgsfd gsd gs dd"}
    // ]
    
    let [isOpen, setIsOpen] = useState(false)
    function openModal() {
        setIsOpen(true)
    }

    function closeModal(){
        setIsOpen(false)
    }


    return(
        <div className="flex flex-col justify-start">
            <div className="flex flex-row text-gray-600 justify-start gap-x-4 pb-4">
                {/* <img src="/coursePage/dockerWhale.svg"  className="" /> */}
                <CubeIcon className="w-7 h-7"></CubeIcon>
                <div className="text-lg">Environments</div>
                <button onClick={openModal}>
                    <PlusCircleIcon className="w-7 h-7 hover:scale-110 transition transition-all ease-in-out duration-300"></PlusCircleIcon>
                </button>
            </div>
            {environments?.length? 
            <div className="grid grid-cols-2 gap-8"> {environments.map((environment)=>{
                return(
                    <Environment sectionUserID={sectionUserID} environment={environment}></Environment>
                );
                })}</div>
                :
            <button className="border broder-gray-200 shadow-sm rounded-lg bg-white
            p-4 hover:shadow-lg transition-all ease-in-out duration-300 h-24"
            onClick ={(e) =>{
                }}
                tabIndex={0}
            >
                <div className="ml-4 mt-2 font-semibold text-sm text-gray-500">
                    There is no environment for this course yet.
                </div>
            </button>}
            <Modal isOpen={isOpen} setOpen={setIsOpen}>
                <EnvironmentCreate sectionUserID = {sectionUserID} closeModal={closeModal}></EnvironmentCreate>
            </Modal>
        </div>
    )
}

export default EnvironmentList