import { Dialog, Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { MenuIcon } from '@heroicons/react/outline'
import {useCnails} from '../../../../contexts/cnails'
import Modal from '../../../Modal'
import TemplateUpdate from './TemplateUpdate'
interface TemplateMenuProps{
    template: Template
    memLimit: number
    numCPU: number
    sectionUserID: string
}
interface Template{
    imageId: string
    id: string
    name: string
    description:string
    assignment_config_id: string
    storage: string
    containerID: string
    active: boolean
}
export default function TemplateMenu({template, memLimit, numCPU, sectionUserID}:TemplateMenuProps) {
    const {removeTemplate, addContainer, removeContainer,activateTemplate,deactivateTemplate} = useCnails();
    let [isOpen, setIsOpen] = useState(false)
    let [updateIsOpen, setUpdateIsOpen] = useState(false)

    function openModal() {
        setIsOpen(true)
    }

    function closeModal(){
        setIsOpen(false)
    }
    function openUpdateModal() {
        setUpdateIsOpen(true)
    }

    function closeUpdateModal(){
        setUpdateIsOpen(false)
    }

    console.log(template.id)

    var flag = true
    if (template.containerID == undefined){
        flag = false
    }
    
    let ref = useRef();
    return (
        <div>
            <Menu as="div" className="relative inline-block text-left">
                <Menu.Button className="inline-flex justify-end w-full py-2 text-sm font-medium rounded-md ">
                    <MenuIcon className="w-5 h-5 hover:scale-110 transition dark:text-gray-300 ease-in-out duration-300"></MenuIcon>
                </Menu.Button>
                <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute mt-1 right-0 w-24 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ">
                        <div className="px-1 py-1">
                        <Menu.Item>
                            {({ active }) => (
                            <button
                                className={`${
                                active ? 'bg-gray-200 font-semibold' : ''
                                } text-gray-900 group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                onClick ={async () => {
                                    const response = await removeTemplate(template.id)
                                    console.log(response)
                                    window.location.reload()
                                }}
                            >
                                delete
                            </button>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                            <button
                                className={`${
                                active ? 'bg-gray-200 font-semibold' : ''
                                } text-gray-900 group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                onClick ={openUpdateModal}
                            >
                                update
                            </button>
                            )}
                        </Menu.Item>
                        {flag?(
                            <Menu.Item>
                            {({ active }) => (
                            <button
                                className={`${
                                active ? 'bg-gray-200 font-semibold' : ''
                                } text-gray-900 group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                onClick ={async () => {
                                    const response = await removeContainer(template.containerID)
                                    console.log(response)
                                    window.location.reload()
                                }}
                            >
                                rmInstance
                            </button>
                            )}
                            </Menu.Item>
                        ):(
                            <Menu.Item>
                            {({ active }) => (
                                <button
                                    className={`${
                                    active ? 'bg-gray-200 font-semibold' : ''
                                    } text-gray-900 group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                    onClick ={async () => {
                                        openModal();
                                        const response = await addContainer(template.imageId,memLimit,numCPU,sectionUserID,template.id,true,"student")
                                        window.location.reload();
                                    }}
                                >
                                    instance
                                </button>
                                )}
                            </Menu.Item>
                        )}
                        
                        
                        {template.active ? (
                            <Menu.Item>
                                {({ active }) => (
                                <button
                                    className={`${
                                    active ? 'bg-gray-200 font-semibold' : ''
                                    } text-gray-900 group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                    onClick ={async () => {
                                        
                                        const response = await deactivateTemplate(template.id)
                                        console.log(response)
                                        window.location.reload();
                                    }}
                                >
                                    deactivate
                                </button>
                                )}
                            </Menu.Item>
                        ):(
                            <Menu.Item>
                                {({ active }) => (
                                <button
                                    className={`${
                                    active ? 'bg-gray-200 font-semibold' : ''
                                    } text-gray-900 group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                    onClick ={async () => {
                                        const response = await activateTemplate(template.id)
                                        console.log(response)
                                        window.location.reload();
                                    }}
                                >
                                    activate
                                </button>
                                )}
                            </Menu.Item>
                        )}
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    className={`${
                                    active ? 'bg-gray-200 font-semibold' : ''
                                    } text-gray-900 group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                    onClick ={() => 
                                    navigator.clipboard.writeText("https://codespace.ust.dev/quickAssignmentInit/"+template.id)}
                                >
                                    Share Link
                                </button>
                                )}
                        </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
            <Modal isOpen={isOpen} setOpen={setIsOpen}>
                <div className="inline-block overflow-visible w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl text-[#415A6E]">
                    <Dialog.Title
                        as="h3"
                        className="text-xl font-medium leading-6"
                    >
                        Create Workspace
                    </Dialog.Title>
                    <div className="py-2">
                    Preparing the IDE Workspace with base template, please wait
                    </div>
                    <div className="flex flex-row justify-center my-8">
                        <img src='/circle.svg'/> 
                    </div>
                </div>
            </Modal>
            <Modal isOpen={updateIsOpen} setOpen={setUpdateIsOpen}>
                <TemplateUpdate closeModal={closeUpdateModal}
                template={template}  ref={ref}
                memLimit={memLimit} numCPU={numCPU} sectionUserID={sectionUserID}/>
            </Modal>
        </div>
    )
}

{/* <button className="mt-2 font-semibold border broder-gray-200 rounded-lg text-center bg-gray-200 text-sm text-gray-800 "
        onClick ={async () => {
            const response = await removeEnvironment(image.id)
            const remove = JSON.parse(response.message)
        }}>
            remove
        </button>  */}