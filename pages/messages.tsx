import { Disclosure, Transition } from '@headlessui/react'
import { Fragment, useState, useEffect } from 'react'
import { ReplyIcon, TrashIcon } from '@heroicons/react/outline'
import Pagination from '../components/Pagination'
import Modal from '../components/Modal'
import NotificationSend from '../components/NotificationSend'
import { useCnails } from '../contexts/cnails'
import EmptyDiv from '../components/EmptyDiv'

interface notification{
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

export default function Messages(){
    const cols = ["Sender","Title", "Time", "Reply", "Delete" ]
    // const test = [
    //     {
    //         id: 1,
    //         sender: {
    //             id: 1,
    //             name: "Chin Tian You",
    //             sub: "tychin"
    //         },
    //         title: "welcome to our course!",
    //         body: "hello world",
    //         updatedAt: "10-2-2012",
    //         reply: true
    //     },
    //     {
    //         id: 2,
    //         sender: {
    //             id: 1,
    //             name: "Chin Tian You",
    //             sub: "tychin"
    //         },
    //         title: "welcome to our course!",
    //         body: "hello world",
    //         updatedAt: "10-2-2012",
    //         reply: true
    //     },
    //     {
    //         id: 3,
    //         sender: {
    //             id: 1,
    //             name: "Chin Tian You",
    //             sub: "tychin"
    //         },
    //         title: "The end of semester",
    //         body: "Bye",
    //         updatedAt: "10-2-2012",
    //         reply: false
    //     },
    //     {
    //         id: 4,
    //         sender: {
    //             id: 1,
    //             name: "Chin Tian You",
    //             sub: "tychin"
    //         },
    //         title: "See you next time",
    //         body: "GG",
    //         updatedAt: "10-2-2012",
    //         reply: true
    //     }
    // ]
    const [notifications, setNotifications] = useState<notification[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [notificationsPerPage, setNotificationsPerPage] = useState(4)
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [receiver, setReceiver] = useState("")
    const {listNotifications,sendNotification,removeNotification, userId,listFolders} = useCnails()

    useEffect(()=>{
        const fetchNotifications = async ()=>{
            const response = await listNotifications(userId)
            setNotifications(response.notifications)
        }
        fetchNotifications()
    },[])

    let [isOpen, setIsOpen] = useState(false)
    function openModal() {
        setIsOpen(true)
    }

    function closeModal() {
        setIsOpen(false)
    }
    function removeNotificationLocal(notiId :string){
        setNotifications(notifications.filter(noti => noti.id != notiId))
    }

    const indexOfLastNotification = currentPage * notificationsPerPage
    const indexOfFirstNotification = indexOfLastNotification - notificationsPerPage
    const currentPosts = notifications.slice(indexOfFirstNotification, indexOfLastNotification)

    return (
        <div className="mt-10 px-10">
            <button onClick={async()=>{
                 const response = await sendNotification("test","test body",userId,userId, true)
                 if(response.success){
                    window.location.reload()
                 }
        }}>send something</button>
        {
            notifications.length == 0 ? <EmptyDiv message="You have no notifications."></EmptyDiv> :
            <div>
                <div className="w-full border rounded-lg overflow-hidden" >
                    <div className="w-full overflow-x-auto">
                    <table className="w-full whitespace-no-wrap table-auto rounded-lg overflow-hidden border">
                        <thead>
                        <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-100 dark:text-gray-400 dark:bg-gray-900">
                            {cols.map(item=>{
                                return(
                                    <th className="px-4 py-3" key={item}>{item}</th>
                                )
                            })}
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                            {currentPosts.map((notification)=>{
                                return(
                                    <Disclosure as={Fragment} key={notification.id}> 
                                        <Disclosure.Button as="tr" className="text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600">
                                            <td className="px-4 py-3 text-sm ">
                                                <div className="flex items-center text-sm">
                                                    <div>
                                                        <p className="font-semibold">{notification.sender.name}</p>
                                                        <p className="text-xs text-gray-600 dark:text-gray-400">
                                                        {notification.sender.sub}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-sm">
                                                {notification.title}
                                            </td>
                                            <td className="px-4 py-3 text-sm">
                                                {notification.updatedAt}
                                            </td>
                                            <td className="px-6 py-3 text-sm">
                                                {
                                                    notification.allow_reply?(
                                                        <button onClick={()=>{
                                                            setTitle(notification.title)
                                                            setBody(notification.body)
                                                            setReceiver(notification.sender.id)
                                                            openModal()
                                                        }}>
                                                            <ReplyIcon className="w-4 h-4 hover:scale-110 transition ease-in-out duration-300 "></ReplyIcon>
                                                        </button>
                                                    ):(
                                                        <div></div>
                                                    )
                                                }
                                            </td>
                                            <td className="px-8 py-3 text-sm">
                                                <button onClick={async()=>{
                                                            const response = await removeNotification(userId, notification.id)
                                                            if(response.success){
                                                                removeNotificationLocal(notification.id)
                                                            }
                                                    }}>
                                                    <TrashIcon className="w-4 h-4 hover:scale-110 transition ease-in-out duration-300 "></TrashIcon>
                                                </button>
                                            </td>
                                        </Disclosure.Button>
                                        <Disclosure.Panel as="tr" className="text-gray-600 bg-gray-200 dark:bg-[#18243B] dark:text-gray-300  text-sm ">
                                            <td colSpan={cols.length}>
                                                <div className="flex flex-col mt-2 space-y-2 px-2 mb-2">
                                                    <label className="font-bold inline">Content: </label>
                                                    <div className="w-full">
                                                        {notification.body}
                                                    </div>
                                                </div>
                                            </td>
                                        </Disclosure.Panel>
                                    </Disclosure>
                                )
                            })}
                        </tbody>
                    </table>
                    <Pagination notificationsPerPage={notificationsPerPage} totalNotifications={notifications.length} setPageNumber={setCurrentPage}></Pagination>
                    </div>
                </div>
                <Modal isOpen={isOpen} setOpen={setIsOpen}>
                    <NotificationSend closeModal={closeModal} defaultTitle={title} defaultBody={body} receiver={receiver}></NotificationSend>
                </Modal>   
            </div>
        }
        </div>
 
            

        
    )
}