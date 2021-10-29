import { Dialog, } from "@headlessui/react";
import React, { MouseEventHandler } from "react";
import {  useState}from "react";
import { useCnails } from "../../../../contexts/cnails";

interface EnvironmentUpdateProps{
    sectionUserID: string
    environment:EnvironmentContent
    closeModal: MouseEventHandler<HTMLButtonElement> | undefined
}
interface EnvironmentContent{
    id:string
    imageId:string
    environmentName: string
    libraries:string
    description: string
}
const EnvironmentUpdate = React.forwardRef(({sectionUserID,environment, closeModal}:EnvironmentUpdateProps, ref)=>{

    const [environmentName, setEnvironmentName] = useState("")
    const [description, setDescription] = useState("")
    const [finishLoading, setFinishLoading] = useState(true)
    const [containerID,setContainerID]=useState("")
    const {updateEnvironment, removeContainer,addContainer} = useCnails();
    const [step, setStep] = useState(1);
    const nextStep = () => {
        setStep(step + 1);
    }

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
                        Update Environment
                    </Dialog.Title>
                    <div className="py-2">
                    Preparing the IDE environment, please wait
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
                        Update Environment
                    </Dialog.Title>
                    <div className="py-2 m-auto ">
                    A new container is prepared, please click the following link and set up the environment. After finished the setting, please press the finish button to save the environment
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
                                const response = await updateEnvironment(environment.id,environmentName,description,sectionUserID,containerID)//expect description
                                console.log(response)
                                if(response.success){
                                    setFinishLoading(true);
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
                            }} type="button" className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-500 shadow-sm hover:text-gray-900 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5">
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
                        Create Environment
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
                    Update Environment
                </Dialog.Title>

                <div className="mt-2 font-medium mt-4">
                    Environment name (Leave empty for unchanged)
                </div>
                
                <div className="p-1 border w-full flex text-gray-500 flex-row space-x-2 focus:border-black-600 text-left rounded-xl shadow-lg">
                    <input  className="focus:outline-none" 
                    placeholder="e.g. Environment 1"
                    value={environmentName}
                    onChange={(e) => setEnvironmentName(e.target.value)}></input>
                </div>

                <div className="mt-2 font-medium mt-4">
                    Description (Leave empty for unchanged)
                </div>
                
                <div className="p-1 border w-full flex text-gray-500 flex-row space-x-2 focus:border-black-600 text-left rounded-xl shadow-lg">
                    <textarea className="focus:outline-none w-full h-32" 
                    placeholder="e.g. Environment 1 is about ..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>

                <div className="py-3 sm:flex sm:flex-row-reverse">
                    <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                        <button
                        type="button"
                        onClick={async()=>{
                            nextStep()
                            const response = await addContainer(environment.imageId,100,0.5,sectionUserID,"",false)//non-existent template id
                            console.log(response)
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

export default EnvironmentUpdate