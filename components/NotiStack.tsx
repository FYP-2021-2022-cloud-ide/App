import { Popover, Transition } from '@headlessui/react'
import { BellIcon } from '@heroicons/react/solid'
import React, { useEffect, useState } from 'react';
import { Fragment } from 'react'
import { notificationStack } from '../lib/notificationStack'

interface notification {
    id: number,
    title: string,
    body: string
}

export default function NotiStack() {
    // load once when page is rendered
    const [notifications, setNotifications] = useState<notification[]>([])

    // data fetching from API
    useEffect(() => {
        const fetchNotifications = async () => {
            const noti = await notificationStack.get()
            setNotifications(noti.notifications)
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
                            <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                {
                                    notifications?.length == 0 ? <div className="text-gray-400 bg-white dark:text-gray-300 dark:bg-gray-700 w-96 flex flex-col items-center p-5">You have no notifications</div> :
                                        <div className="flex bg-white dark:bg-gray-700 p-4 flex-col space-y-2">
                                            {notifications!.map((item: notification) => (
                                                <div key={item.id} className="cursor-pointer flex items-center p-2 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 dark:hover:bg-gray-500 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                                                    <div >
                                                        <p className="text-sm font-medium text-gray-900 dark:text-gray-200 ">
                                                            {item.title}
                                                        </p>
                                                        <p className="text-sm text-gray-500 dark:text-gray-300">
                                                            {item.body}
                                                        </p>
                                                    </div>
                                                    <div className="ml-4 flex-shrink-0 flex">
                                                        <button
                                                            onClick={async () => {
                                                                const temp = notificationStack.remove((await notificationStack.get()), item.id)
                                                                await notificationStack.set(temp)
                                                                setNotifications(temp.notifications)
                                                            }
                                                            }
                                                            className="inline-flex text-gray-400 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150">
                                                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>

                                            ))}
                                        </div>}
                            </div>
                        </Popover.Panel>
                    </Transition>
                </>
            )}
        </Popover>
    )
}
