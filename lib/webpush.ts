import { getMessaging, getToken } from "firebase/messaging";
import * as firebase from 'firebase/app'
import localforage from 'localforage'

const firebaseCloudMessaging = {
  tokenInlocalforage: async () => {
    return localforage.getItem('fcm_token')
  },

  init: async function () {

    firebase.initializeApp({
        apiKey: "AIzaSyBeaQh0WK8j7SF_1vjkm7JFR4a9zXUBWho",
        projectId: "cnails-524ee",
        messagingSenderId: "724781215995",
        appId: "1:724781215995:web:e539d1a943aee7851ec05e"
    })

    try {
      if ((await this.tokenInlocalforage()) !== null) {
        return this.tokenInlocalforage();
      }

      const messaging = getMessaging();
      const status = await Notification.requestPermission();
      if (status && status === 'granted') {
        console.log('granted permission')
        const token = await getToken(messaging);
        localforage.setItem('fcm_token', token);
        console.log(token);
        return token;
      }
    } catch (error) {
      console.error(error)
    }
  },
}

export { firebaseCloudMessaging }