import { Dialog} from "@headlessui/react";
import React, { MouseEventHandler, useState } from "react";
import {toast} from "react-hot-toast"
import {Notification, NotificationBody} from './Notification'
import { Switch } from '@headlessui/react'

interface NotificationReplyProps {
    defaultBody: string
    defaultTitle: string
    receiver: string
    closeModal: MouseEventHandler<HTMLButtonElement> | undefined
}

const NotificationSend = React.forwardRef(({ closeModal, defaultTitle, defaultBody, receiver }: NotificationReplyProps, ref) => {
    const [title, setTitle] = useState("Re: "+defaultTitle)
    const [body, setBody] = useState("```" + defaultBody + "``` \n")
    const [allowReply, setAllowReply] = useState(false)
    
    // styles 
    const dialogClass = "inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-gray-800 shadow-xl rounded-2xl text-[#415A6E]"
    const titleClass = "text-xl font-medium leading-6 dark:text-gray-300 mb-5"
    const buttonsClass = "flex flex-row-reverse mt-4 "
    const okButtonClass = "inline-flex justify-center w-full md:w-32 rounded-md px-4 py-2 bg-green-500 hover:bg-green-600 text-base leading-6 font-medium text-white shadow-sm focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
    const inputClass = "border dark:border-0 focus:outline-none dark:bg-gray-700 p-1 px-3 w-full text-gray-500 dark:text-gray-300 flex-row space-x-2  text-left rounded-md shadow-lg"

    return (
        //@ts-ignore
        <div ref={ref} className={dialogClass}>
            <Dialog.Title
                as="h3"
                className={titleClass}
            >
                Notification Send
            </Dialog.Title>
            <div className=" font-medium mt-4 dark:text-gray-300 mb-2">
                Title
            </div>
            <input className={inputClass}
            placeholder="e.g. Environment 1"
            value={title}
            onChange={(e) => setTitle(e.target.value)}></input>
            <div className=" font-medium mt-4 dark:text-gray-300 my-2">
                Body
            </div>
            <textarea className="border dark:border-0 focus:outline-none dark:bg-gray-700 p-1 px-3 w-full text-gray-500 dark:text-gray-300 flex-row space-x-2  text-left rounded-xl shadow-lg h-32"
            placeholder="e.g. Environment 1 is about ..."
            value={body}
            onChange={(e) => setBody(e.target.value)}></textarea>
            <div className="flex flex-row py-3 items-center space-x-2">
                <div className=" font-medium dark:text-gray-300">
                    Allow Reply :
                </div>
                <Switch
                    checked={allowReply}
                    onChange={setAllowReply}
                    className={`${allowReply ? 'bg-green-500' : 'bg-gray-200'}
                    relative inline-flex flex-shrink-0 h-[22px] w-[37px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                >
                    <span className="sr-only">Use setting</span>
                    <span
                    aria-hidden="true"
                    className={`${allowReply ? 'translate-x-4' : 'translate-x-0'}
                        pointer-events-none inline-block h-[18px] w-[18px] rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
                    />
                </Switch>
            </div>
            
            <div className={buttonsClass}>
                 <button onClick={async()=>{
                    //@ts-ignore
                    closeModal()
                }} 
                type="button" className={okButtonClass + " ml-4"}>
                    Cancel
                </button> 
                <button
                    onClick={async () => {
                        //@ts-ignore
                        closeModal()
                        toast.custom((t) =>(
                            <Notification trigger={t}>
                              <NotificationBody title="Message sent" body="Reply success" success={true} id = {t.id}></NotificationBody>
                            </Notification>
                        ))
                    }}
                    className={okButtonClass}>
                    Send
                </button>
            </div>
        </div>
    )
})
NotificationSend.displayName='NotificationSend';
export default NotificationSend;
