import React , {useState, useRef} from "react"
import Menu from "../../CardMenu";
import {EnvironmentContent}  from "./EnvironmentList"
import { useCnails } from "../../../../contexts/cnails";
import Modal from "../../../Modal";
import EnvironmentUpdate from "./EnvironmentUpdate";

interface EnvironmentProps {
    sectionUserID: string
    environment: EnvironmentContent
}

function Environment({ environment, sectionUserID }: EnvironmentProps) {
    const { removeEnvironment} = useCnails();
    let [updateIsOpen, setUpdateIsOpen] = useState(false)
    function openUpdateModal() {
        setUpdateIsOpen(true)
    }

    function closeUpdateModal(){
        setUpdateIsOpen(false)
    }
    let ref = useRef();
    
    return (
        <div className="border broder-gray-200 dark:border-gray-700 shadow-sm rounded-lg bg-white dark:bg-gray-600 px-4 py-4 min-h-36 h-36">
            <div className="flex flex-row items-start h-full justify-between">
                <div className="flex flex-col h-full justify-between">
                    <div>
                        <div className="font-semibold text-sm text-gray-600 dark:text-gray-300 text-left">{environment.environmentName}</div>
                        <div className="font-medium text-xs text-gray-600 dark:text-gray-300 text-left">{environment.libraries}</div>
                        <div className="font-medium text-xs text-gray-400">{environment.imageId}</div>
                    </div>
                    <div className="font-medium text-xs text-gray-400">{environment.description}</div>
                </div>
                <Menu items={[
                    {
                        text: "delete" , 
                        onClick : async () => {
                            const response = await removeEnvironment(environment.id,sectionUserID)
                            console.log(response)
                            window.location.reload()
                        }
                    }, 
                    {
                        text : "update" , 
                        onClick : ()=> openUpdateModal()
                    }
                ]}></Menu>
            </div>
            <Modal isOpen={updateIsOpen} setOpen={setUpdateIsOpen}>
                <EnvironmentUpdate closeModal={closeUpdateModal}
                environment={environment}  ref={ref} sectionUserID={sectionUserID}/>
            </Modal>
        </div>
    )
}

export default Environment

