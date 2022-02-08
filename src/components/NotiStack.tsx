import { Popover, Transition } from '@headlessui/react'
import { BellIcon , MailIcon } from '@heroicons/react/solid'
import React, { useEffect, useState } from 'react';
import { Fragment } from 'react'
// import { notificationStack } from '../lib/notificationStack'
import { useCnails } from '../contexts/cnails'
import Link from "next/link";
import {notificationAPI} from "../lib/notificationAPI"

interface notification {
    id: string
    sender: {
        id: string
        name: string
        sub: string
    },
    title: string
    body: string
    updatedAt: string
    allow_reply: boolean
}


export default function NotiStack() {
    // load once when page is rendered
    const test = [
        {
            id: "soemthe",
            sender: {
                id: "osdkf",
                name: "sender name ",
                sub: "send sub",
            },
            title: "noti title htieitoewjroewhtieitoewjroewhtieitoewjroewhtieitoewjroewhtieitoewjroewhtieitoewjroewhtieitoewjroew",
            body: "noti body htieitoewjroewhtieitoewjroewhtieitoewjroewhtie itoewjroewhtieitoewjr oewhtieitoewjroewhtieitoewjroewhtieitoewjroewh tieitoewjroewhtieitoewjroewhtieitoewjroewhtieitoewjroewhtieitoewjroew",
            updatedAt: "sdkfoskdf",
            allow_reply: false
        }
    ] as notification[]
    const [notifications, setNotifications] = useState<notification[]>([])
    const { userId } = useCnails()
    const {listNotifications} = notificationAPI

    // data fetching from API
    useEffect(() => {
        const fetchNotifications = async () => {
            const response = await listNotifications(userId)
            setNotifications(response.notifications)
        }
        // while(sub == "")
        fetchNotifications()
    }, [])
    if (notifications == undefined) {
        setNotifications([])
    }

    return (
        <Popover className="relative">
            {({ open }) => (
                <>
                    <div className="flex item-center">
                        <Popover.Button className="indicator">
                            {notifications?.length == 0 || <div className="indicator-item badge badge-info">{notifications?.length}</div>}
                            <BellIcon className='w-6 h-6 hover:scale-110 transition ease-in-out duration-300 dark:text-gray-300'></BellIcon>
                        </Popover.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                    >
                        <Popover.Panel className="absolute z-10 min-w-fit px-4 mt-3 transform -translate-x-full left-1/2 sm:px-0">
                            <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white dark:bg-gray-700 p-2">
                                {
                                    notifications?.length == 0 ? <div className="text-gray-400 bg-white dark:text-gray-300 dark:bg-gray-700 w-96 flex flex-col items-center p-5">You have no notifications</div> :
                                        <div className="flex  flex-col space-y-2">
                                            {notifications!.slice(0, 6).map((item: notification) => (
                                                <div key={item.id} className="cursor-pointer flex items-center p-2 transition duration-150 ease-in-out rounded-lg hover:bg-gray-200 dark:hover:bg-gray-500 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                                                    <div>
                                                        <p className="w-96 whitespace-nowrap truncate text-sm font-medium text-gray-900 dark:text-gray-200 ">
                                                            {item.title}
                                                        </p>
                                                        <p className="w-96 text-sm text-gray-500 dark:text-gray-300 text-ellipsis overflow-hidden">
                                                            {item.body}
                                                        </p>

                                                    </div>
                                                </div>
                                            ))}
                                            <Link href="/messages"><div className="text-sm flex  justify-center cursor-pointer py-3 rounded-lg  text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-500 ring-opacity-5">more messages<span><MailIcon className="text-gray-600 dark:text-gray-300 w-4 h-4 ml-2"></MailIcon></span></div></Link>
                                        </div>
                                }
                            </div>
                        </Popover.Panel>
                    </Transition>
                </>
            )}
        </Popover>
    )
}
