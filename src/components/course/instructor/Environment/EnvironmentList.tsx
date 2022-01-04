import Environment from "./Environment"
import EnvironmentCreate from "./EnvironmentCreate"
import { CubeIcon } from "@heroicons/react/outline"
import { PlusCircleIcon } from "@heroicons/react/solid"
import React, {  useState } from "react";
import Modal from "../../../Modal"
import EmptyDiv from "../../../EmptyDiv";

export interface EnvironmentContent {
    id: string
    imageId: string
    environmentName: string
    libraries: string
    description: string
}

export interface props {
    sectionUserID: string
    environments: EnvironmentContent[]
}

const EnvironmentList = ({ sectionUserID, environments }: props) => {
    let [isOpen, setIsOpen] = useState(false)
    function openModal() {
        setIsOpen(true)
    }

    function closeModal() {
        setIsOpen(false)
    }
    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-row text-gray-700 dark:text-gray-300 justify-start gap-x-4 pb-4">
                <CubeIcon className="w-7 h-7"></CubeIcon>
                <div className="text-lg">Environments</div>
                <button onClick={openModal}>
                    <PlusCircleIcon className="w-7 h-7 hover:scale-110 transition  ease-in-out duration-300"></PlusCircleIcon>
                </button>

                
            </div>
            {
                // generate the environment cards
                environments?.length == 0 ? <EmptyDiv message="There is no environment for this course yet." /> :
                    <div className="grid grid-cols-2 gap-4">
                        {
                            environments.map(environment => {
                                return <Environment key={environment.id} sectionUserID={sectionUserID} environment={environment}></Environment>
                            })
                        }
                    </div>
            }
            <Modal isOpen={isOpen} setOpen={setIsOpen}>
                <EnvironmentCreate sectionUserID={sectionUserID} closeModal={closeModal}></EnvironmentCreate>
            </Modal>
        </div>
    )
}

export default EnvironmentList