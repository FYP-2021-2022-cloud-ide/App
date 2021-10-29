import { Dialog, Transition } from "@headlessui/react";
import React, { MouseEventHandler, useEffect } from "react";
import { Fragment, useState}from "react";
import Select from 'react-select';
import { finished } from "stream";
import { useCnails } from "../../../../contexts/cnails";

interface EnvironmentCreateProps{
    sectionUserID: string
    closeModal: MouseEventHandler<HTMLButtonElement> | undefined
}

const EnvironmentCreate = React.forwardRef(({sectionUserID, closeModal}:EnvironmentCreateProps, ref)=>{
    const [mode, setMode] = useState("")
    const [environmentName, setEnvironmentName] = useState("")
    const [description, setDescription] = useState("")
    const options = [
        { value: 'g++', label: 'g++' },
        { value: 'gcc', label: 'gcc' },
        { value: 'python', label: 'python' },
        { value: 'python3', label: 'python3' },
    ]
    const [finishLoading, setFinishLoading] = useState(true)
    const {buildEnvironment,addContainer} = useCnails();
    const [containerID,setContainerID]=useState("")
    const [libaries, setLibaries] = useState([""])
    const {addEnvironment, removeContainer} = useCnails();
    const [step, setStep] = useState(1);
    const nextStep = () => {
        setStep(step + 1);
    }
    switch(mode){
        case "custom":
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
                                Create Environment
                            </Dialog.Title>
                            <div className="py-2">
                            Preparing the base IDE environment, please wait
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
                                Create Environment
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
                                        const response = await buildEnvironment(environmentName,description,sectionUserID,containerID)//expect description
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
                            Add Environment
                        </Dialog.Title>

                        <div className="mt-2 font-medium mt-4">
                            Environment name
                        </div>
                        
                        <div className="p-1 border w-full flex text-gray-500 flex-row space-x-2 focus:border-black-600 text-left rounded-xl shadow-lg">
                            <input  className="focus:outline-none" 
                            placeholder="e.g. Environment 1"
                            value={environmentName}
                            onChange={(e) => setEnvironmentName(e.target.value)}></input>
                        </div>

                        <div className="mt-2 font-medium mt-4">
                            Description(Optional)
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
                                    const response = await addContainer("06979193acbf",100,0.5,sectionUserID,"",false)//non-existent template id
                                    console.log(response)
                                    if(response.success){
                                        // const fakeWindow= window.open("",'_blank')
                                        setContainerID(response.containerID)
                                        // window.open("https://codespace.ust.dev/user/container/"+response.containerID+"/",'_blank')
                                        // fakeWindow?.location.replace("https://codespace.ust.dev/user/container/"+response.containerID+"/")
                                    }
                                    // open the container link from the API response
                                    // window.open('https://codespace.ust.dev', '_blank')
                                    
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
        case "preset":
            switch(step){
                case 2:
                    return(
                        //@ts-ignore
                        <div ref={ref} className="inline-block overflow-visible w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl text-[#415A6E]">
                            <Dialog.Title
                                as="h3"
                                className="text-xl font-medium leading-6 "
                            >
                                Creating Environment, Please wait
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
                                Add Environment
                            </Dialog.Title>
                            <div className="mt-2 font-medium mt-4">
                                Pick Libray needed
                            </div>
                            <Select options={options} isMulti onChange={(value)=>{
                                setLibaries(value.map((libary)=>{
                                    return (libary.value)
                                }))
                            }}/>
                
                            <div className="mt-2 font-medium mt-4">
                                Environment name
                            </div>
                            
                            <div className="p-1 border w-full flex text-gray-500 flex-row space-x-2 focus:border-black-600 text-left rounded-xl shadow-lg">
                                <input  className="focus:outline-none" 
                                placeholder="e.g. Environment 1"
                                value={environmentName}
                                onChange={(e) => setEnvironmentName(e.target.value)}></input>
                            </div>
                            <div className="mt-2 font-medium mt-4">
                                Description(Optional)
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
                                        const response = await addEnvironment(libaries, environmentName,description,sectionUserID)//expecting description
                                        if(response.success){
                                            //@ts-ignore
                                            closeModal()
                                            window.location.reload();
                                        }
                                        nextStep()
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
        default:
            return(
                //@ts-ignore
                <div ref={ref} className="inline-block overflow-visible w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl text-[#415A6E]">
                    <Dialog.Title
                        as="h3"
                        className="text-xl font-medium leading-6"
                    >
                        Add Environment
                    </Dialog.Title>
                    <div className="flex flex-col my-4 space-y-3">
                        <button onClick={(e)=>{
                            setMode("custom")
                        }} className="border rounded-md mx-16 py-2 hover:shadow-lg transition-all ease-in-out duration-300">Custom Environment</button>
                        <button onClick={(e)=>{
                            setMode("preset")
                        }} className="border rounded-md mx-16 py-2 hover:shadow-lg transition-all ease-in-out duration-300">Preset Environment</button>
                    </div>
                    
                    <div className="py-3 sm:flex sm:flex-row-reverse">
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

export default EnvironmentCreate