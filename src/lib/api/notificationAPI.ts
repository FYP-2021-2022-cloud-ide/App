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
           allowReply: boolean
           ): Promise<NotificationSendResponse>  => {
        var res = await fetch('/api/notification/sendNotification', {
            method: 'POST',
            body: JSON.stringify({
                "title": title,
                "body": body,
                "sender": sender,
                "receiver": receiver,
                "allowReply": allowReply,
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
    }
}

export {notificationAPI}