import {useCnails} from "../../../../contexts/cnails";
import React, { useEffect, useRef, useState } from 'react';
import Template from "./Template"
import {DocumentTextIcon} from "@heroicons/react/outline"
import {PlusCircleIcon} from "@heroicons/react/solid"
import { Dialog, Transition } from "@headlessui/react";
import Modal from "../../../Modal";
import ListBox from "../../../ListBox";
import TemplateCreate from "./TemplateCreate";

interface template{
    id: string
    name: string
    imageId: string
    assignment_config_id: string
    storage: string
    containerID: string
    active: boolean
}

interface props{
    templates: template[]
    environments: environment[]
    sectionUserID:string
}

interface environment{
    id:string
    imageId:string
    environmentName: string
    description: string
}


const TemplateList = ({templates,sectionUserID, environments}:props)=>{//{
    // var templates=[
    //     { name: "fdgsdd",
    //     imageId: 'asdasdasd',
    //     id: "asdasdas",
    //     assignment_config_id: "321312312",
    //     storage: "asdasdas"
    //     },
    //     { name: "fdgsdd",
    //     imageId: 'asdasdasd',
    //     id: "asdasdas",
    //     assignment_config_id: "321312312",
    //     storage: "asdasdas"
    //     },
    // ]
    // var templates = []
    const [memLimit ,setmemLimit]= useState(100);
    const [numCPU ,setnumCPU]= useState(1);
    const { addContainer} = useCnails();
    let [isOpen, setIsOpen] = useState(false)

    function openModal() {
        setIsOpen(true)
    }

    function closeModal(){
        setIsOpen(false)
    }
    
    var environmentsList=[]
    for (let i =0; i< environments.length; i++){
        environmentsList.push({
            name: environments[i].environmentName + " ("+ environments[i].imageId +")",
            id: environments[i].imageId
        })
    }

    
    let ref = useRef();
    return(
        <div className="flex flex-col justify-start text-gray-600 ">
            <div className="flex flex-row justify-start gap-x-4 pb-4">
                <DocumentTextIcon className="w-7 h-7"></DocumentTextIcon>
                <div className="text-lg">Templates</div>
                <button onClick={openModal}>
                    <PlusCircleIcon className="w-7 h-7 hover:scale-110 transition transition-all ease-in-out duration-300"></PlusCircleIcon>
                </button>
            </div>
            {templates?.length? 
            <div className="grid grid-cols-2 gap-8">
                {templates.map((template: template)=>{
                    return(
                        <Template template={template} memLimit={memLimit} numCPU={numCPU} sectionUserID={sectionUserID}></Template>
                    );
                })}</div>
                :
                <button className="border broder-gray-200 shadow-sm rounded-lg bg-white
                p-4 hover:shadow-lg transition-all ease-in-out duration-300 h-24"
                onClick ={(e) =>{
                    }}
                    tabIndex={0}
                >
                    <div className="ml-4 font-semibold text-sm text-gray-500 text-left">
                    There is no project template for this course yet.
                    </div>
                </button>}
                <Modal isOpen={isOpen} setOpen={setIsOpen}>
                    <TemplateCreate closeModal={closeModal} environments={environmentsList} ref={ref} sectionUserID={sectionUserID}></TemplateCreate>
                </Modal>
        </div>
    )
}

export default TemplateList