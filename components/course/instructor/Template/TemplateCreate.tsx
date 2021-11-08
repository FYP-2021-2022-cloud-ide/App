import React, { MouseEventHandler, useRef, useState } from "react"
import { Dialog, Transition, Switch } from "@headlessui/react";
import ListBox from "../../../ListBox"
import { useCnails } from "../../../../contexts/cnails";

interface TemplateCreateProps{
    sectionUserID:string
    environments: Environment[]
    closeModal: MouseEventHandler<HTMLButtonElement> | undefined
}

interface Environment{
    name: string
    id: string
}

const TemplateCreate = React.forwardRef(({sectionUserID,environments, closeModal}:TemplateCreateProps, ref)=>{

    const [step, setStep] = useState(1);
    const [active, setActive] = useState(false)

    const prevStep = () => {
        setStep(step - 1);
    }
    const nextStep = () => {
        setStep(step + 1);
    }
    const [finishLoading, setFinishLoading] = useState(true)
    const [description, setDescription] = useState("")
    const [selectedEnv, setSelectedEnv]= useState(environments[0])
    const [templateName, setTemplateName]= useState("")
    const { addTemplate,addContainer, removeContainer} = useCnails();
    const [containerID,setContainerID]=useState("")
    // console.log(selectedEnv)
    switch(step){
        case 2:
            if (containerID!=""){
                nextStep()
            }
            return(
                //@ts-ignore
                <div ref={ref} className="inline-block overflow-visible w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl text-[#415A6E]">
                    <Dialog.Title
                        as="h3"
                        className="text-xl font-medium leading-6"
                    >
                        Create Template
                    </Dialog.Title>
                    <div className="py-2">
                    Preparing the base IDE Template with base environment, please wait
                    </div>
                    <div className="flex flex-row justify-center my-8">
                        <img src='/circle.svg'/> 
                    </div>
                </div>
            )  
        case 3:
            return(
                //@ts-ignore
                <div ref={ref} className="inline-block overflow-visible w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl text-[#415A6E]">
                    <Dialog.Title
                        as="h3"
                        className="text-xl font-medium leading-6"
                    >
                        Create Assignment Template
                    </Dialog.Title>
                    <div className="py-2">
                    A new container is prepared, please click the following link and set up the template. After finished the setting, please press the finish button to save the template
                    </div>
                    <a className="flex text-blue-500 underline justify-center" href={"https://codespace.ust.dev/user/container/"+containerID+"/"} target="_blank"> 
                        Click Here
                    </a>
                    <div className="py-3 sm:flex sm:flex-row-reverse">
                        <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                            <button
                            type="button"
                            onClick={async()=>{
                                setFinishLoading(false)
                                nextStep()
                                const response = await addTemplate(templateName,description, sectionUserID, "Dummy string", containerID, false)
                                if(response.success){
                                    setFinishLoading(true)
                                }else{
                                    setFinishLoading(true)
                                    alert(response.message)
                                }
                            }}
                            className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-[#65A9E0] text-base leading-6 font-medium text-white shadow-sm hover:text-gray-900 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                            Finish
                            </button>
                        </span>
                        <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                            <button onClick={ async()=>{
                                setFinishLoading(false)
                                nextStep();
                                const response = await removeContainer(containerID)
                                if(response.success){
                                    setFinishLoading(true)
                                }
                            }}  type="button" className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-500 shadow-sm hover:text-gray-900 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                            Cancel
                            </button>
                        </span>
                    </div>
                </div>
            )
        case 4:
            if(finishLoading){
                window.location.reload();
            }
            return(
                <div className="inline-block overflow-visible w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl text-[#415A6E]">
                    <Dialog.Title
                        as="h3"
                        className="text-xl font-medium leading-6"
                    >
                        Create Template
                    </Dialog.Title>
                    <div className="flex flex-row justify-center my-8">
                        <img src='/circle.svg'/> 
                    </div>
                </div>
            )
        default:
            return(
                //@ts-ignore
                <div ref={ref} className="inline-block overflow-visible w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl text-[#415A6E]">
                    <Dialog.Title
                        as="h3"
                        className="text-xl font-medium leading-6"
                    >
                        Create Assignment Template
                    </Dialog.Title>
                    <div className="mt-2 font-medium mt-4">
                        Environment
                    </div>
                    <ListBox selected={selectedEnv} setSelected={setSelectedEnv} environments={environments}/>

                    <div className="mt-2 font-medium mt-4">
                        Template name
                    </div>
                    
                    <div className="p-1 border w-full flex text-gray-500 flex-row space-x-2 focus:border-black-600 text-left rounded-xl shadow-lg">
                        <input className="focus:outline-none w-full" 
                        placeholder="e.g. Assignment 1"
                        value={templateName}
                        onChange={(e) => setTemplateName(e.target.value)}></input>
                    </div>

                    <div className="mt-2 font-medium mt-4">
                        Description(Optional)
                    </div>
                    
                    <div className="p-1 border w-full flex text-gray-500 flex-row space-x-2 focus:border-black-600 text-left rounded-xl shadow-lg">
                        <textarea className="focus:outline-none w-full h-32" 
                        placeholder="e.g. Assignment 1 is about ..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}></textarea>
                    </div>

                    <div className="py-3 sm:flex sm:flex-row-reverse">
                        <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                            <button
                            type="button"
                            onClick={async()=>{
                                nextStep()
                                const response = await addContainer(selectedEnv.id,100,0.5,sectionUserID,"",false,"student")//non-existent template id
                                if(response.success){
                                    setContainerID(response.containerID)
                                }
                                
                            }}
                            className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-[#65A9E0] text-base leading-6 font-medium text-white shadow-sm hover:text-gray-900 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                            Next
                            </button>
                        </span>
                        <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                            <button onClick={closeModal} type="button" className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-500 shadow-sm hover:text-gray-900 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                            Cancel
                            </button>
                        </span>
                    </div>
                </div>
            )

    }    
})

export default TemplateCreate