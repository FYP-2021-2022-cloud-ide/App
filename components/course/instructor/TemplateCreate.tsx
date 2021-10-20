import React, { MouseEventHandler, useRef, useState } from "react"
import { Dialog, Transition } from "@headlessui/react";
import ListBox from "../../ListBox"
import { useCnails } from "../../../contexts/cnails";

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


    const prevStep = () => {
        setStep(step - 1);
    }
    const nextStep = () => {
        setStep(step + 1);
    }

    const [templateName, setTemplateName]= useState("")
    const { addTemplate,addContainer} = useCnails();
    const [containerID,setContainerID]=useState("")
    switch(step){
        case 1:
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
                    <ListBox environments={environments}/>

                    <div className="mt-2 font-medium mt-4">
                        Template name
                    </div>
                    
                    <div className="p-1 border w-full flex text-gray-500 flex-row space-x-2 focus:border-black-600 text-left rounded-xl shadow-lg">
                        <input  className="focus:outline-none" 
                        placeholder="e.g. Assignment 1"
                        value={templateName}
                        onChange={(e) => setTemplateName(e.target.value)}></input>
                    </div>

                    <div className="py-3 sm:flex sm:flex-row-reverse">
                        <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                            <button
                            type="button"
                            onClick={async()=>{
                                nextStep()
                                const fakeWindow= window.open("",'_blank')
                                const response = await addContainer("06979193acbf",100,0.5,sectionUserID,"",false)//non-existent template id
                                if(response.success){
                                    setContainerID(response.containerID)
                                    fakeWindow?.location.replace("https://codespace.ust.dev/user/container/"+response.containerID+"/")
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
        case 2:
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
                    A new container is opened in a new browser, please initialize the template and press the finish button to save the template
                    </div>
                    <div className="py-3 sm:flex sm:flex-row-reverse">
                        <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                            <button
                            type="button"
                            onClick={async()=>{
                                closeModal
                                const response = await addTemplate(templateName,"06979193acbf",sectionUserID,"Dummy string",containerID)//non-existent template id
                            }}
                            className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-[#65A9E0] text-base leading-6 font-medium text-white shadow-sm hover:text-gray-900 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                            Finish
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

    //@ts-ignore
    return(<div ref={ref}></div>)
    
})

export default TemplateCreate