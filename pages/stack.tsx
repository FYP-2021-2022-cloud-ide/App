import { Popover, Transition } from '@headlessui/react'
import { BellIcon } from '@heroicons/react/solid'
import React, { useEffect, useState } from 'react';
import { Fragment } from 'react'
import { notificationStack } from '../lib/notificationStack'

interface notification{
    id: number,
    title: string,
    body: string
}

export default function stack() {
    // load once when page is rendered
    const [notifications, setNotifications] = useState<notification[]>()
    // data fetching from API
    useEffect(() => {
        const fetchNotifications = async () => {
            const noti = await notificationStack.get()
            setNotifications(noti.notifications)
        }
        // while(sub == "")
        fetchNotifications()
    }, [])
    if (notifications == undefined){
        setNotifications([])
    }
    
    return (
        <div className="w-full max-w-sm px-4 fixed top-16">
        <Popover className="relative">
            {({ open }) => (
            <>
                <Popover.Button>
                    <BellIcon className='w-6 h-6 hover:scale-110 transition  ease-in-out duration-300 dark:text-gray-300'></BellIcon>
                </Popover.Button>
                <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
                >
                <Popover.Panel className="absolute z-10 w-screen max-w-sm px-4 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0 lg:max-w-3xl">
                    <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="relative grid gap-8 bg-white p-7 lg:grid-cols-2">
                            {notifications!.map((item: notification) => (
                            <a
                                className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                            >
                                <div className="ml-4">
                                <p className="text-sm font-medium text-gray-900">
                                    {item.title}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {item.body}
                                </p>
                                </div>
                            </a>
                            ))}
                        </div>
                    </div>
                </Popover.Panel>
                </Transition>
            </>
            )}
        </Popover>
        </div>
    )
}
