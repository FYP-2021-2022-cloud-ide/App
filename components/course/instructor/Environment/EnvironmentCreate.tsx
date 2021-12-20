import { Dialog, Transition } from "@headlessui/react";
import React, { MouseEventHandler, useEffect } from "react";
import { Fragment, useState } from "react";
import Select from 'react-select';
import { finished } from "stream";
import ListBox from "./ListBox";
import { useCnails } from "../../../../contexts/cnails";

interface EnvironmentCreateProps {
    sectionUserID: string
    closeModal: MouseEventHandler<HTMLButtonElement> | undefined
}

const EnvironmentCreate = React.forwardRef(({ sectionUserID, closeModal }: EnvironmentCreateProps, ref) => {
    const [mode, setMode] = useState("")
    const [environmentName, setEnvironmentName] = useState("")
    const [description, setDescription] = useState("")
    const rootImage = "78c40a8078d2"
    const options = [
        { value: 'C++/C', image: 'a2f570bc987f' },
        { value: 'Python3', image: '4610218071a3' },
        { value: 'Java', image: '78c40a8078d2' },
    ]

    const CPU = 0.5
    const memory = 400
    const [finishLoading, setFinishLoading] = useState(true)
    const { buildEnvironment, addContainer } = useCnails();
    const [containerID, setContainerID] = useState("")
    const [selectedEnv, setSelectedEnv] = useState(options[0])
    const { addEnvironment, removeContainer, sub } = useCnails();
    const [step, setStep] = useState(1);
    const nextStep = () => {
        setStep(step + 1);
    }

    // styles 
    const dialogClass = "inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-gray-800 shadow-xl rounded-2xl text-[#415A6E]"
    const titleClass = "text-xl font-medium leading-6 dark:text-gray-300 mb-5"
    const buttonsClass = "sm:flex sm:flex-row-reverse mt-4"
    const okButtonClass = "inline-flex justify-center w-full md:w-32 rounded-md px-4 py-2 bg-green-400 hover:bg-green-500 text-base leading-6 font-medium text-white shadow-sm focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"

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
                            <p className="py-2 text-gray-600 dark:text-gray-300">
                                Preparing the base IDE environment, please wait
                            </p>
                            <div className="flex flex-row justify-center my-8">
                                <img src='/circle.svg' />
                            </div>
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
                            <a className="flex text-blue-500 underline justify-center" href={"https://codespace.ust.dev/user/container/" + containerID + "/"} target="_blank">
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
                            </div>
                        </div>
                    )
                case 4:
                    if (finishLoading) {
                        window.location.reload();
                    }
                    return (
                        <div className="inline-block overflow-visible w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl text-[#415A6E]">
                            <Dialog.Title
                                as="h3"
                                className="text-xl font-medium leading-6"
                            >
                                Create Environment
                            </Dialog.Title>
                            <div className="flex flex-row justify-center my-8">
                                <img src='/circle.svg' />
                            </div>
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

                            <input className="border dark:border-0 focus:outline-none dark:bg-gray-700 p-1 px-3 w-full text-gray-500 dark:text-gray-300 flex-row space-x-2  text-left rounded-xl shadow-lg"
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
                                        const response = await addContainer(rootImage, memory, CPU, sectionUserID, "", false, "root")//non-existent template id
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

                            </div>
                        </div>
                    )
            }
        case "preset":
            switch (step) {
                case 2:
                    return (
                        //@ts-ignore
                        <div ref={ref} className="inline-block overflow-visible w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl text-[#415A6E]">
                            <Dialog.Title
                                as="h3"
                                className="text-xl font-medium leading-6 "
                            >
                                Creating Environment, Please wait
                            </Dialog.Title>
                            <div className="flex flex-row justify-center my-8">
                                <img src='/circle.svg' />
                            </div>
                        </div>
                    )
                default:
                    return (
                        //@ts-ignore
                        <div ref={ref} className="inline-block overflow-visible w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl text-[#415A6E]">
                            <Dialog.Title
                                as="h3"
                                className="text-xl font-medium leading-6"
                            >
                                Add Environment
                            </Dialog.Title>
                            <div className="mt-2 font-medium mt-4">
                                Pick the Programming Language
                            </div>
                            {/* <Select options={options} isMulti onChange={(value)=>{
                                setLibaries(value.map((libary)=>{
                                    return (libary.value)
                                }))
                            }}/> */}
                            <ListBox selected={selectedEnv} setSelected={setSelectedEnv} environments={options} />


                            <div className="mt-2 font-medium mt-4">
                                Environment name
                            </div>

                            <div className="p-1 border w-full flex text-gray-500 flex-row space-x-2 focus:border-black-600 text-left rounded-xl shadow-lg">
                                <input className="focus:outline-none"
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
                                        onClick={async () => {

                                            const response = await addEnvironment([selectedEnv.value + ":" + selectedEnv.image], environmentName, description, sectionUserID)//expecting description
                                            if (response.success) {
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
            return (
                //@ts-ignore
                <div ref={ref} className={dialogClass}>
                    <Dialog.Title as="h3" className={titleClass} >
                        Add Environment
                    </Dialog.Title>

                    <p className="text-gray-600 dark:text-gray-300 mb-5">Use predefined environment?</p>

                    <div className="flex flex-row-reverse">
                        <button className="px-4 py-2 bg-green-400 text-white rounded-md mx-2" onClick={() => { setMode("preset") }}>Yes</button>
                        <button className="px-4 py-2 bg-gray-400 text-white rounded-md mx-2" onClick={() => { setMode("custom") }}>Use Custom Environment</button>
                    </div>
                </div>
            )
    }
})

export default EnvironmentCreate