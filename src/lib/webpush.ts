import { getMessaging, getToken } from "firebase/messaging";
import * as firebase from 'firebase/app'
import localforage from 'localforage'

import { generalAPI } from "../lib/api/generalAPI";
const firebaseCloudMessaging = {
  tokenInlocalforage: async () => {
    return localforage.getItem('fcm_token')
  },

  init: async function () {
    const {getEnv} = generalAPI;
    var res = await getEnv()
    var {FirebaseApiKey,FirebaseProjectId,FirebaseMessagingSenderId,FirebaseAppId}=res
    firebase.initializeApp({
        apiKey: FirebaseApiKey,
        projectId:FirebaseProjectId,
        messagingSenderId:FirebaseMessagingSenderId,
        appId:FirebaseAppId
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