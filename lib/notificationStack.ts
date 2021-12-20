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
      for (let i = 0; i<stack.notifications.length; i++){
        if (stack.notifications[i].id > id){
            stack.notifications[i-1] = stack.notifications[i]
            stack.notifications[i-1].id-- 
        }
      }
      return stack
  }
}

export { notificationStack }