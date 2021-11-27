import { Menu, Transition } from '@headlessui/react'
import { Fragment, useRef, useState } from 'react'
import { MenuIcon } from '@heroicons/react/outline'
import {useCnails} from '../../../../contexts/cnails'
import Modal from '../../../Modal'
import EnvironmentUpdate from './EnivronmentUpdate'
import {EnvironmentContent as Environment}  from "./EnvironmentList"
interface EnvironmentMenuProps{
    sectionUserID: string
    environment: Environment
}

export default function EnvironmentMenu({sectionUserID,environment}:EnvironmentMenuProps) {
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
        <div>
            <Menu as="div" className="relative inline-block text-left">
                <Menu.Button className="inline-flex justify-end w-full py-2 text-sm font-medium rounded-md ">
                    <MenuIcon className="w-5 h-5 hover:scale-110 transition text-gray-600 dark:text-gray-300 ease-in-out duration-300"></MenuIcon>
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
                    <Menu.Items className="absolute w-24 right-0 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ">
                        <div className="px-1 py-1">
                        <Menu.Item>
                            {({ active }) => (
                            <button
                                className={`${
                                active ? 'bg-gray-200 font-semibold' : ''
                                } text-gray-900 group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                onClick ={async () => {
                                    const response = await removeEnvironment(environment.id)
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
                        {/* <Menu.Item>
                            {({ active }) => (
                            <button
                                className={`${
                                active ? 'bg-gray-200 font-semibold' : ''
                                } text-gray-900 group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                onClick ={async () => {
                                    // const response = await removeEnvironment(imageID)
                                    // console.log(response)
                                    // const remove = JSON.parse(response.message)
                                }}
                            >
                                activate
                            </button>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                            <button
                                className={`${
                                active ? 'bg-gray-200 font-semibold' : ''
                                } text-gray-900 group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                onClick ={async () => {
                                    // const response = await removeEnvironment(imageID)
                                    // console.log(response)
                                    // const remove = JSON.parse(response.message)
                                }}
                            >
                                deactivate
                            </button>
                            )}
                        </Menu.Item> */}
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
            <Modal isOpen={updateIsOpen} setOpen={setUpdateIsOpen}>
                <EnvironmentUpdate closeModal={closeUpdateModal}
                environment={environment}  ref={ref} sectionUserID={sectionUserID}/>
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