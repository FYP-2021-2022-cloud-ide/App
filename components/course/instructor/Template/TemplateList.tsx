import { useCnails } from "../../../../contexts/cnails";
import React, { useEffect, useRef, useState } from 'react';
import Template from "./Template"
import { DocumentTextIcon } from "@heroicons/react/outline"
import { PlusCircleIcon } from "@heroicons/react/solid"
import { Dialog, Transition } from "@headlessui/react";
import Modal from "../../../Modal";
import ListBox, {Option} from "../ListBox"
import TemplateCreate from "./TemplateCreate";

//testing
import templateData from "../../../../data/testing/templateList"
import EmptyDiv from "../../../EmptyDiv";
import {EnvironmentContent as environment} from "../Environment/EnvironmentList"


export interface template {
    id: string
    name: string
    description: string
    imageId: string
    assignment_config_id: string
    storage: string
    containerID: string
    active: boolean
    isExam:boolean
    timeLimit:Number
}


export interface props {
    templates: template[]
    environments: environment[]
    sectionUserID: string
}

const TemplateList = ({ templates, sectionUserID, environments }: props) => {
    const [memLimit, setmemLimit] = useState(400);
    const [numCPU, setnumCPU] = useState(0.5);
    const { addContainer } = useCnails();
    let [isOpen, setIsOpen] = useState(false)

    function openModal() {
        setIsOpen(true)
    }

    function closeModal() {
        setIsOpen(false)
    }

    // building the environemnts list
    var environmentsList : Option[] = []
    for (let i = 0; i < environments.length; i++) {
        environmentsList.push({
            value: environments[i].environmentName + " (" + environments[i].imageId + ")",
            id: environments[i].imageId
        } as Option )
    }

    console.log(environments.length)
    let ref = useRef();
    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-row text-gray-700 dark:text-gray-300 justify-start gap-x-4 pb-4">
                <DocumentTextIcon className="w-7 h-7"></DocumentTextIcon>
                <div className="text-lg">Templates</div>
                <button onClick={() => {
                    if (environments.length > 0) {
                        openModal()
                    }
                }}>
                    <PlusCircleIcon className="w-7 h-7 hover:scale-110 transition ease-in-out duration-300"></PlusCircleIcon>
                </button>
            </div>
            {
                // generate the templates
                templates?.length == 0 ? <EmptyDiv message="There is no template for this course yet." /> :
                    <div className="grid grid-cols-2 gap-8">
                        {
                            templates.map((template: template) => {
                                return (
                                    <Template template={template} memLimit={memLimit} numCPU={numCPU} sectionUserID={sectionUserID}></Template>
                                );
                            })
                        }
                    </div>
            }
            <Modal isOpen={isOpen} setOpen={setIsOpen}>
                <TemplateCreate closeModal={closeModal} memLimit={memLimit} numCPU={numCPU} environments={environmentsList} ref={ref} sectionUserID={sectionUserID}></TemplateCreate>
            </Modal>
        </div>
    )
}

export default TemplateList