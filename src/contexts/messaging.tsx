import { getMessaging, isSupported, onMessage, Unsubscribe } from "firebase/messaging";
import router from "next/router";
import React, { useContext, useEffect, useState } from "react";
import myToast from "../components/CustomToast";
import useInterval from "../hooks/useInterval";
import { notificationAPI } from "../lib/api/notificationAPI";
import { Message } from "../lib/cnails";
import { CLICK_TO_DISMISS, CLICK_TO_REPORT } from "../lib/constants";
import { errorToToastDescription } from "../lib/errorHelper";
import { firebaseCloudMessaging } from "../lib/webpush";
import { useCnails } from "./cnails";

interface MessagingProviderProps {
    children: JSX.Element;
}

type MessagingContextState = {
    messages: Message[];
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>
    /**
     * a function to fetch a new list of notification.
     * It will update the context and hence update all affected UI.
     * Therefore, even if this function will return an array of notifications, 
     * using the returned value is not suggested. You should use the `notifications`
     * from the context instead. 
     */
    fetchMessages: () => Promise<Message[]>;
    /**
     * @param ids the IDs of notifications 
     */
    changeMessagesRead: (ids: string[], target: boolean) => Promise<void>;
    /**
     * @param ids the IDs of notifications
     */
    deleteMessages: (ids: string[]) => Promise<void>
    /**
     * @param receiverId the user id of receiver 
     * @param sectionId the section scope of this message
     */
    sendMessage: (title: string, content: string, receiverId: string, sectionId: string, allowReply: boolean) => Promise<void>;
}

const MessagingContext = React.createContext({} as MessagingContextState);

export const useMessaging = () => useContext(MessagingContext);

export const MessagingProvider = ({ children }: MessagingProviderProps) => {
    const { userId, sub, semesterId, } = useCnails()
    const [messages, setMessages] = useState<Message[]>();
    const [unsubscribe, setUnsubscribe] = useState<Unsubscribe>();
    const { listNotifications, changeNotificationRead, removeNotification, sendNotification } = notificationAPI;

    /** 
     * this will init the firebase cloud messaging and notify the users 
     * when a new message comes in. If this is not called, users can still 
     * get the messaging on fetching but their notification is not real time.
     */
    async function initMessaging() {
        try {
            const token = await firebaseCloudMessaging.init();
            if (token) {
                console.log("test")
                const messaging = getMessaging();
                // TODO: call API to fetch lastest notification
                const notiRes = await fetch(`/api/notification/getNotificationToken`, {
                    method: "POST",
                    body: JSON.stringify({
                        sub: sub,
                    }),
                });
                const noti = await notiRes.json();
                const notification = noti.notification;
                if (token != notification) {
                    // update the DB one
                    const response = await fetch(`/api/notification/updateSubscription`, {
                        method: "POST",
                        body: JSON.stringify({
                            registrationToken: token,
                            userId,
                            semesterId,
                        }),
                    });
                }
                console.log(messaging)
                const s = onMessage(messaging, async (message) => {
                    console.log("message in ")
                    setTimeout(async () => {
                        await fetchMessages();
                        myToast.notification("You have a new notification", {}, () => {
                            router.push("/messages");
                        });
                    }, 2000);
                });
                setUnsubscribe(s);
            }
            console.log("finished")
        } catch (error) {
            console.log(error);
        }
    }

    const fetchMessages = async () => {
        const response = await listNotifications(userId);
        if (response.success) {
            console.log(response.notifications)
            setMessages(response.notifications);
            return response.notifications;
        } else console.error("[ ❌ ] : fail to fetch notifications ", response);
    };

    const changeMessagesRead = async (ids: string[], read: boolean) => {
        const response = await changeNotificationRead(userId, ids, read)
        if (!response.success) {
            console.error(read ? `Fail to read messages.` : `Fail to unread messages.`);
        }
        await fetchMessages()
    }

    const deleteMessages = async (ids: string[]) => {
        const response = await removeNotification(userId, ids);
        if (response.success) {
            myToast.success(
                ids.length == 1 ? `A message has been removed.` :
                    `${ids.length} messages have been removed.`
            );
        } else {
            myToast.error({
                title: "Fail to delete messages",
                description: errorToToastDescription(response.error),
            })
        }
        await fetchMessages();
    }


    const sendMessage = async (title: string, content: string, receiverId: string, sectionId: string, allowReply: boolean) => {
        const response = await sendNotification(
            title, //the title can change? or use "RE: <message title> // use "RE: <message title> thx
            content,
            userId,
            receiverId, //should pass the userid of the people to reply to
            allowReply,
            sectionId
        );
        if (response.success) {
            myToast.success("Your message has been delivered.")
        } else
            myToast.error({
                title: "Fail to send message",
                description: errorToToastDescription(response.error),
            })
        await fetchMessages();
    }

    const init = async () => {
        if (await isSupported()) {
            console.log("supported")
            await initMessaging()
        } else {
            console.log("not supported")
        }
        await fetchMessages()
    }

    /**
     * this hooks initiate messaging notification and fetch messages for the first time
     */
    useEffect(() => {
        init()
        // return () => { if (unsubscribe) unsubscribe() }
    }, [])

    /**
     * this hook fetch messages every one minutes
     */
    useInterval(fetchMessages, 60 * 1000)
    if (!messages) return <></>;

    return <MessagingContext.Provider
        value={
            {
                messages,
                setMessages,
                fetchMessages,
                changeMessagesRead,
                deleteMessages,
                sendMessage
            }
        }>
        {children}
    </MessagingContext.Provider>
} 