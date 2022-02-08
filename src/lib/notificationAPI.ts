const notificationAPI = {
    sendNotification: async (title: string, body: string, sender: string, receiver: string, allowReply: boolean) => {
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
    listNotifications: async (userId: string) => {
        var res = await fetch('/api/notification/listNotifications?userId=' + userId, {
            method: 'GET',
        })
        return res.json()
    },
    removeNotification: async (userId: string, notificationId: string) => {
        var res = await fetch('/api/notification/removeNotification', {
            method: 'POST',
            body: JSON.stringify({
                "userId": userId,
                "notificationId": notificationId,
            }),
        })
        return res.json()
    }
}

export {notificationAPI}