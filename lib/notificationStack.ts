import localforage from 'localforage'

interface stack{
    notifications : notification[]
}

interface notification{
    id: number
    title: string
    body: string
}

const notificationStack = {
  get: async () => {
      const stack : string | null = await localforage.getItem('notificationStack')
      if (stack == "" || stack == null){
          return {
              notifications: []
          }
      }
      return JSON.parse(stack!)
  },
  set: async (stack: stack) => {
      localforage.setItem("notificationStack", JSON.stringify(stack))
  },
  push: (stack:stack, title: string, body:string) => {
      stack.notifications.push({
          id: stack.notifications.length,
          title,
          body
      })
      return stack
  },
  remove: (stack:stack, id:number) => {
      var temp: stack = {
          notifications: []
      }
      for (let i = 0; i<stack.notifications.length; i++){
        var notification = stack.notifications[i]
        if (notification.id != id){
            if (notification.id > id)
                notification.id--
            temp.notifications.push(notification)
        }
      }
      return temp
  }
}

export { notificationStack }