import { useState, Fragment } from 'react';
import { useCnails } from '../../contexts/cnails'

import { MenuIcon } from "@heroicons/react/outline"
import { Menu, Transition } from "@headlessui/react"
import Modal from "../Modal";
import { Dialog } from '@headlessui/react'
import{localFileAPI} from '../../lib/localFile'
export function ItemMenu({ item, type, root, setMkdirNameOpen }) {
    const { userId } = useCnails()
    const {uploadFiles, downloadFileToUser, removeFile, moveFile}=localFileAPI
    const [loading, setLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [filesUpload, setFilesUpload] = useState(new FormData())
    const dialogClass = "inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-gray-800 shadow-xl rounded-2xl text-[#415A6E]"
    const titleClass = "text-xl font-medium leading-6 dark:text-gray-300 mb-5"
    const okButtonClass = "text-sm  mx-2 w-fit rounded-md px-4 py-2 bg-green-500 hover:bg-green-600 text-base leading-6 font-medium text-white shadow-sm focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
    const cancelButtonClass = "text-sm mx-2 w-fit rounded-md px-4 py-2 bg-gray-400 hover:bg-gray-500 text-base leading-6 font-medium text-white shadow-sm focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"

    const setFiles = async (event: any) => {
        const files = await uploadToClient(event)
        if (files != undefined) {
            setFilesUpload(files)
        }
    }



    return (
        <div>
            <Menu as="div" className="relative text-left pl-1 pt-1">
                <div className="flex flex-row space-x-2">
                    <Menu.Button>
                        <MenuIcon className="w-4 h-4" />
                    </Menu.Button>
                    {/* {loading?(<div>loading</div>):(<div>finished</div>)} */}
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute left-0 w-56 border rounded bg-white z-40">
                        <Menu.Item as="div" className="w-full flex justify-center hover:bg-gray-200">
                            <button className="w-full" onClick={async () => {
                                setLoading(true)
                                const res = await downloadFileToUser(userId, item.path, type)
                                if (res != undefined) {
                                    // console.log(res)
                                    var decodedByte = Buffer.from(res.file, 'base64')
                                    var b = new Blob([decodedByte]);
                                    await downloadFileURL(b, res.fileName)
                                    setLoading(false)
                                }
                            }}>
                                Download
                            </button>
                        </Menu.Item>
                        {type == "folder" ?
                            <Menu.Item as="div" className="w-full flex justify-center hover:bg-gray-200">
                                <button className="w-full" onClick={async () => {
                                    setIsOpen(true)

                                }}>
                                    Upload files/folder
                                </button>
                            </Menu.Item> : <div></div>}
                        {type == "folder" ?
                            <Menu.Item as="div" className="w-full flex justify-center hover:bg-gray-200">

                                <button className='w-full '
                                    onClick={() => {
                                        setMkdirNameOpen(true)
                                    }}
                                >
                                    Make Directory
                                </button>
                            </Menu.Item> : <div></div>
                        }
                        {root ? <div></div> :
                            <Menu.Item as="div" className="w-full flex justify-center hover:bg-gray-200">
                                <button className='w-full'
                                    onClick={async () => {
                                        const res = await removeFile(userId, item.path)
                                        if (res.success) {
                                            console.log(res)
                                            window.location.reload()
                                        }
                                    }}>Remove</button>
                            </Menu.Item>}
                    </Menu.Items>
                </Transition>
            </Menu>
            <Modal isOpen={isOpen} setOpen={setIsOpen}>

                <div className={dialogClass}>
                    <Dialog.Title
                        as="h3"
                        className={titleClass}
                    >
                        Upload Files
                    </Dialog.Title>
                    <div>upload file/s</div>
                    <input type="file" multiple name="file/s" onChange={setFiles} />
                    <div>upload folder</div>

                    <input type="file" multiple webkitdirectory="true" name="folder" onChange={setFiles} />
                    <div className="flex flex-row-reverse">
                        <button className={okButtonClass} onClick={
                            async () => {
                                setLoading(true)
                                filesUpload.append("filePath", item.path)
                                const res = await uploadFiles(userId, filesUpload)
                                // @ts-ignore
                                if (res.success) {
                                    console.log(res)
                                    setLoading(false)
                                    window.location.reload()
                                }
                            }
                        } >Upload</button>
                        <button className={cancelButtonClass} onClick={() => { setIsOpen(false) }}>Cancel</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

async function downloadFileURL(file: Blob, fileName: string) {
    var link = document.createElement('a');
    link.href = URL.createObjectURL(file);
    link.download = fileName
    link.click();
}

const uploadToClient = async (event: any) => {
    var filesUpload = new FormData()
    if (event.target.files && event.target.files[0]) {
        let files = event.target.files;
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            if (file.webkitRelativePath != '') {//when the input is folder
                filesUpload.append("file" + i, file);
            } else {//when the input is a bunch of files
                filesUpload.append("file" + i, file);
            }
        };
    }
    // console.log(filesUpload)
    return filesUpload
};