import { getMessaging, getToken, isSupported } from "firebase/messaging";
import * as firebase from "firebase/app";
import localforage from "localforage";

import { generalAPI } from "../lib/api/generalAPI";
const firebaseCloudMessaging = {
  tokenInlocalforage: async () => {
    return localforage.getItem("fcm_token");
  },

  /**
   * this funtion initialized the firebase app and return the token for firebase messaging from local storage .
   */
  init: async function () {
    const { getEnv } = generalAPI;
    var res = await getEnv();
    var {
      FirebaseApiKey,
      FirebaseProjectId,
      FirebaseMessagingSenderId,
      FirebaseAppId,
    } = res;
    if (isSupported()) {
      firebase.initializeApp({
        apiKey: FirebaseApiKey,
        projectId: FirebaseProjectId,
        messagingSenderId: FirebaseMessagingSenderId,
        appId: FirebaseAppId,
      });
    } else {
      console.log("not supported");
    }

    try {
      if (await isSupported()) {
        if ((await this.tokenInlocalforage()) !== null) {
          return this.tokenInlocalforage();
        }

        const messaging = getMessaging();
        const status = await Notification.requestPermission();
        if (status && status === "granted") {
          console.log("granted permission");
          const token = await getToken(messaging);
          localforage.setItem("fcm_token", token);
          console.log(token);
          return token;
        }
      }
    } catch (error) {
      console.error(error);
    }
  },
};

export { firebaseCloudMessaging };
