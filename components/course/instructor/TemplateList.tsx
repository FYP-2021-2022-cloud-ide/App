import {useCnails} from "../../../contexts/cnails";
import React, { useEffect, useState } from 'react';
import Template from "./Template"
import {DocumentTextIcon} from "@heroicons/react/outline"
import {PlusCircleIcon} from "@heroicons/react/solid"

interface template{
    id: string
    name: string
    imageId: string
    assignment_config_id: string
    storage: string
}

interface props{
   templates: template[]
    sectionUserID:string
}


const TemplateList = ({templates,sectionUserID}:props)=>{//{
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

    return(
        <div className="flex flex-col justify-start text-gray-600 ">
            <div className="flex flex-row justify-start gap-x-4 pb-4">
                <DocumentTextIcon className="w-7 h-7"></DocumentTextIcon>
                <div className="text-lg">Templates</div>
                <button >
                    <PlusCircleIcon className="w-7 h-7 hover:scale-110 transition-all ease-in-out duration-300"></PlusCircleIcon>                
                </button>
            </div>
            {templates?.length? 
            <div className="grid grid-cols-2 gap-8 pr-4">
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
            
        </div>
    )
}

export default TemplateList