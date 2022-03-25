import { 
    NotificationListResponse ,
    NotificationSendResponse,
    SuccessStringResponse
  } from "./api";
  

const notificationAPI = {
    sendNotification: async (
        title: string, 
        body: string,
         sender: string,
          receiver: string,
           allowReply: boolean,
           sectionId:string
           ): Promise<NotificationSendResponse>  => {
        var res = await fetch('/api/notification/sendNotification', {
            method: 'POST',
            body: JSON.stringify({
                "title": title,
                "body": body,
                "sender": sender,
                "receiver": receiver,
                "allowReply": allowReply,
                sectionId,
            }),
        })
        return res.json()
    },
    listNotifications: async (userId: string) : Promise<NotificationListResponse>  => {
        var res = await fetch('/api/notification/listNotifications?userId=' + userId, {
            method: 'GET',
        })
        return res.json()
    },
    removeNotification: async (userId: string, notificationIds: string[]) : Promise<SuccessStringResponse>  => {
        var res = await fetch('/api/notification/removeNotification', {
            method: 'POST',
            body: JSON.stringify({
                "userId": userId,
                "notificationIds": notificationIds,
            }),
        })
        return res.json()
    }   ,
    changeNotificationRead: async (userId: string, notificationIds: string[],read:boolean) : Promise<SuccessStringResponse>  => {
        var res = await fetch('/api/notification/changeNotificationRead', {
            method: 'POST',
            body: JSON.stringify({
                "userId": userId,
                "notificationIds": notificationIds,
                read,
            }),
        })
        return res.json()
    }
}

export {notificationAPI}