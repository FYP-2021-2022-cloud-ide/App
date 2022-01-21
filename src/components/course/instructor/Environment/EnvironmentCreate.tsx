import { Dialog, Transition } from "@headlessui/react";
import React, { MouseEventHandler, useEffect } from "react";
import { Fragment, useState } from "react";
import Select from 'react-select';
import { finished } from "stream";
import Loader from "../../../../components/Loader"
import ListBox , {Option}from "../ListBox";
import { useCnails } from "../../../../contexts/cnails";
import {toast} from "react-hot-toast"
interface EnvironmentCreateProps {
    sectionUserID: string
    closeModal: MouseEventHandler<HTMLButtonElement> | undefined
}

const EnvironmentCreate = React.forwardRef(({ sectionUserID, closeModal }: EnvironmentCreateProps, ref) => {
    const [mode, setMode] = useState("")
    const [environmentName, setEnvironmentName] = useState("")
    const [description, setDescription] = useState("")
    const rootImage = "143.89.223.188:5000/codeserver:latest"
    const options : Option[] = [
        { value: 'C++/C', id: '143.89.223.188:5000/codeserver:latest' },
        { value: 'Python3', id: '143.89.223.188:5000/codeserver:latest' },
        { value: 'Java', id: '143.89.223.188:5000/codeserver:latest' },
    ]

    const CPU = 0.5
    const memory = 400
    const [finishLoading, setFinishLoading] = useState(true)
    const { buildEnvironment, addContainer } = useCnails();
    const [containerID, setContainerID] = useState("")
    const [selectedEnv, setSelectedEnv] = useState<Option>(options[0])
    const { addEnvironment, removeContainer, sub } = useCnails();
    const [step, setStep] = useState(1);
    const nextStep = () => {
        setStep(step + 1);
    }

    // styles 
    const dialogClass = "inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-gray-800 shadow-xl rounded-2xl text-[#415A6E]"
    const titleClass = "text-xl font-medium leading-6 dark:text-gray-300 mb-5"
    const buttonsClass = "sm:flex sm:flex-row-reverse mt-4 "
    const okButtonClass = "text-sm  mx-2 w-fit rounded-md px-4 py-2 bg-green-500 hover:bg-green-600 text-base leading-6 font-medium text-white shadow-sm focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
    const cancelButtonClass  = "text-sm mx-2 w-fit rounded-md px-4 py-2 bg-gray-400 hover:bg-gray-500 text-base leading-6 font-medium text-white shadow-sm focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
    const inputClass = "border dark:border-0 focus:outline-none dark:bg-gray-700 p-1 px-3 w-full text-gray-500 dark:text-gray-300 flex-row space-x-2  text-left rounded-md shadow-lg"
    
    switch (mode) {
        case "custom":
            switch (step) {
                case 2:
                    if (containerID != "") {
                        nextStep()
                    }
                    return (
                        //@ts-ignore
                        <div ref={ref} className={dialogClass}>

                            <Dialog.Title as="h3" className={titleClass} >Create Environment </Dialog.Title>
                            <p className="text-gray-600 dark:text-gray-300">
                                Preparing the base IDE environment, please wait...
                            </p>
                            <Loader />
                        </div>
                    )
                case 3:
                    return (
                        //@ts-ignore
                        <div ref={ref} className={dialogClass}>
                            <Dialog.Title
                                as="h3"
                                className={titleClass}
                            >
                                Create Environment
                            </Dialog.Title>
                            <div className="py-2 m-auto text-gray-600 dark:text-gray-300">
                                A new container is prepared, please click the following link and set up the environment. After finished the setting, please press the finish button to save the environment
                            </div>
                            <a className="flex text-blue-500 underline justify-center" href={"https://codespace.ust.dev/user/container/" + containerID + "/"} target="_blank" rel="noreferrer">
                                Click Here
                            </a>
                            <div className={buttonsClass}>
                                
                                <button
                                    onClick={async () => {
                                        setFinishLoading(false)
                                        nextStep()
                                        const response = await buildEnvironment(environmentName, description, sectionUserID, containerID)//expect description
                                        console.log(response)
                                        if (response.success) {
                                            setFinishLoading(true);
                                        }
                                    }}
                                    className={okButtonClass}>
                                    Finish
                                </button>
                                <button onClick={async()=>{
                                        setFinishLoading(false)
                                        nextStep();
                                        const response = await removeContainer(containerID, sub)
                                        if(response.success){
                                            setFinishLoading(true)
                                        }
                                    }} className={cancelButtonClass}>
                                    Cancel
                                </button> 
                            </div>
                        </div>
                    )
                case 4:
                    if (finishLoading) {
                        window.location.reload();
                    }
                    return (
                        <div className={dialogClass}>
                            <Dialog.Title
                                as="h3"
                                className={titleClass}
                            >
                                Create Environment
                            </Dialog.Title>
                            <Loader />
                        </div>
                    )
                default:
                    return (
                        //@ts-ignore
                        <div ref={ref} className={dialogClass}>
                            <Dialog.Title as="h3" className={titleClass}> Add Environment  </Dialog.Title>

                            <div className="font-medium mt-4 dark:text-gray-300">
                                Environment name
                            </div>

                            <input className={inputClass}
                                placeholder="e.g. Environment 1"
                                value={environmentName}
                                onChange={(e) => setEnvironmentName(e.target.value)}></input>


                            <div className=" font-medium mt-4 dark:text-gray-300">
                                Description(Optional)
                            </div>

                            <textarea className="border dark:border-0 focus:outline-none dark:bg-gray-700 p-1 px-3 w-full text-gray-500 dark:text-gray-300 flex-row space-x-2  text-left rounded-xl shadow-lg h-32"
                                placeholder="e.g. Environment 1 is about ..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}></textarea>


                            <div className={buttonsClass}>
                               
                                <button
                                    onClick={async () => {
                                        nextStep()
                                        const response = await addContainer(rootImage, memory, CPU, sectionUserID, "", false, "root",true)//non-existent template id
                                        console.log(response)
                                        if (response.success) {
                                            // const fakeWindow= window.open("",'_blank')
                                            setContainerID(response.containerID)
                                            // window.open("https://codespace.ust.dev/user/container/"+response.containerID+"/",'_blank')
                                            // fakeWindow?.location.replace("https://codespace.ust.dev/user/container/"+response.containerID+"/")
                                        } else {
                                            window.location.reload()
                                        }
                                        // open the container link from the API response
                                        // window.open('https://codespace.ust.dev', '_blank')

                                    }}
                                    className={okButtonClass}>
                                    Next
                                </button>
                                 <button className={cancelButtonClass} onClick={closeModal}>Cancel</button>
                            </div>
                        </div>
                    )
            }
        case "preset":
            switch (step) {
                case 2:
                    return (
                        //@ts-ignore
                        <div ref={ref} className={dialogClass}>
                            <Dialog.Title
                                as="h3"
                                className={titleClass}
                            >
                                Creating Environment, Please wait
                            </Dialog.Title>
                            <Loader></Loader>
                        </div>
                    )
                default:
                    return (
                        //@ts-ignore
                        <div ref={ref} className={dialogClass}>
                            <Dialog.Title
                                as="h3"
                                className={titleClass}
                            >
                                Add Environment
                            </Dialog.Title>
                            <div className="font-medium mt-4 dark:text-gray-300">
                                Pick the Programming Language
                            </div>
                            <ListBox selected={selectedEnv} setSelected={setSelectedEnv} environments={options} />
                            <div className="font-medium mt-4 dark:text-gray-300">
                                Environment name
                            </div>
                            <input className={inputClass}
                                placeholder="e.g. Environment 1"
                                value={environmentName}
                                onChange={(e) => setEnvironmentName(e.target.value)}></input>

                            <div className="font-medium mt-4 dark:text-gray-300">
                                Description(Optional)
                            </div>


                            <textarea className={inputClass}
                                placeholder="e.g. Environment 1 is about ..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}></textarea>

                            <div className={buttonsClass}>
                                
                                    <button
                                        onClick={async () => {

                                            const response = await addEnvironment([selectedEnv.value + ":" + selectedEnv.id], environmentName, description, sectionUserID)//expecting description
                                            if (response.success) {
                                                //@ts-ignore
                                                closeModal()
                                                window.location.reload();
                                            }
                                            nextStep()
                                        }}
                                        className={okButtonClass}>
                                        Next
                                    </button>
                                    <button className={cancelButtonClass} onClick={closeModal }>Cancel</button>
                            </div>
                        </div>
                    )
            }
        default:
            return (
                //@ts-ignore
                <div ref={ref} className={dialogClass}>
                    <Dialog.Title as="h3" className={titleClass} >
                        Add Environment
                    </Dialog.Title>

                    <p className="text-gray-600 dark:text-gray-300 mb-5">Use predefined environment?</p>

                    <div className="flex flex-row-reverse">
                        <button className={okButtonClass} onClick={() => { setMode("preset") }}>Yes</button>
                        <button className={cancelButtonClass} onClick={() => { setMode("custom") }}>Use Custom Environment</button>
                        <button className={cancelButtonClass} onClick={closeModal}>Cancel</button>
                    </div>
                </div>
            )
    }
})

export default EnvironmentCreate