import { Dialog, } from "@headlessui/react";
import React, { MouseEventHandler } from "react";
import { useState } from "react";
import { useCnails } from "../../../../contexts/cnails";
import Loader from "../../../Loader";
import { EnvironmentContent as Environment } from "./EnvironmentList"
interface EnvironmentUpdateProps {
    sectionUserID: string
    environment: Environment
    closeModal: MouseEventHandler<HTMLButtonElement> | undefined
}

const EnvironmentUpdate = React.forwardRef(({ sectionUserID, environment, closeModal }: EnvironmentUpdateProps, ref) => {

    const CPU = 0.5
    const memory = 400
    const [environmentName, setEnvironmentName] = useState(environment.environmentName)
    const [description, setDescription] = useState(environment.description)
    const [finishLoading, setFinishLoading] = useState(true)
    const [containerID, setContainerID] = useState("")
    const { updateEnvironment, removeContainer, addContainer, sub } = useCnails();
    const [step, setStep] = useState(1);
    const nextStep = () => {
        setStep(step + 1);
    }

    // styles 
    const dialogClass = "inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-gray-800 shadow-xl rounded-2xl text-[#415A6E]"
    const titleClass = "text-xl font-medium leading-6 dark:text-gray-300 mb-5"
    const buttonsClass = "sm:flex sm:flex-row-reverse mt-4"
    const okButtonClass = "inline-flex justify-center w-full md:w-32 rounded-md px-4 py-2 bg-green-500 hover:bg-green-600 text-base leading-6 font-medium text-white shadow-sm focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
    const inputClass = "border dark:border-0 focus:outline-none dark:bg-gray-700 p-1 px-3 w-full text-gray-500 dark:text-gray-300 flex-row space-x-2  text-left rounded-md shadow-lg"

    switch (step) {
        case 2:
            if (containerID != "") {
                nextStep()
            }
            return (
                //@ts-ignore
                <div ref={ref} className={dialogClass}>
                    <Dialog.Title
                        as="h3"
                        className={titleClass}
                    >
                        Update Environment
                    </Dialog.Title>
                    <div className="dark:text-gray-300">
                        Preparing the IDE environment, please wait
                    </div>
                    <Loader></Loader>
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
                        Update Environment
                    </Dialog.Title>
                    <div className="py-2 m-auto ">
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
                                const response = await updateEnvironment(environment.id, environmentName, description, sectionUserID, containerID)//expect description
                                console.log(response)
                                if (response.success == true || response.success == false) {
                                    setFinishLoading(true);
                                }
                            }}
                            className={okButtonClass}>
                            Finish
                        </button>


                        <button onClick={async () => {
                            setFinishLoading(false)
                            nextStep();
                            const response = await removeContainer(containerID, sub)
                            if (response.success == true || response.success == false) {
                                setFinishLoading(true)
                            }
                        }} className={okButtonClass + ""}>
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
                        Update Environment
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
                        Update Environment
                    </Dialog.Title>

                    <div className="font-medium mt-4">
                        Environment name
                    </div>


                    <input className={inputClass}
                        placeholder="e.g. Environment 1"
                        value={environmentName}
                        onChange={(e) => setEnvironmentName(e.target.value)}></input>

                    <div className="font-medium mt-4">
                        Description
                    </div>


                    <textarea className={inputClass}
                        placeholder="e.g. Environment 1 is about ..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}></textarea>


                    <div className={buttonsClass}>
                        <button
                            onClick={async () => {
                                nextStep()
                                const response = await addContainer(environment.imageId, memory, CPU, sectionUserID, "", false, "root")//non-existent template id
                                console.log(response)
                                if (response.success) {
                                    setContainerID(response.containerID)
                                }

                            }}
                            className={okButtonClass}>
                            Edit the IDE
                        </button>


                        <button onClick={async () => {
                            const response = await updateEnvironment(environment.id, environmentName, description, sectionUserID, "")//non-existent template id
                            console.log(response)
                            if (response.success == true || response.success == false) {
                                window.location.reload();
                            }

                        }} className={okButtonClass + ""}>
                            Finish
                        </button>
                    </div>
                </div>
            )
    }

})

export default EnvironmentUpdate