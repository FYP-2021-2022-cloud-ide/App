importScripts('https://www.gstatic.com/firebasejs/7.24.0/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/7.24.0/firebase-messaging.js')
// importScripts('../lib/notificationStack')
// import noti from '../lib/notificationStack';
// import localforage from 'localforage'


if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyBeaQh0WK8j7SF_1vjkm7JFR4a9zXUBWho",
    projectId: "cnails-524ee",
    messagingSenderId: "724781215995",
    appId: "1:724781215995:web:e539d1a943aee7851ec05e"
  })

  firebase.messaging();
  firebase.messaging().onBackgroundMessage(function (payload) {
    // Customize notification here
    const { title, body } = payload.data
    // set(push((await get()),title, body))
    const notificationTitle = title;
    const notificationOptions = {
      body,
    };

    self.registration.showNotification(notificationTitle,
      notificationOptions);
  })
}

// import { initializeApp } from "firebase/app";
// import { getMessaging, onBackgroundMessage } from "firebase/messaging/sw";


// // Initialize the Firebase app in the service worker by passing in
// // your app's Firebase config object.
// // https://firebase.google.com/docs/web/setup#config-object
// const firebaseApp = initializeApp({
//   apiKey: "AIzaSyBeaQh0WK8j7SF_1vjkm7JFR4a9zXUBWho",
//   projectId: "cnails-524ee",
//   messagingSenderId: "724781215995",
//   appId: "1:724781215995:web:e539d1a943aee7851ec05e"
// });

// // Retrieve an instance of Firebase Messaging so that it can handle background
// // messages.
// const messaging = getMessaging(firebaseApp);
// onBackgroundMessage(messaging, (payload) => {
//   console.log('[firebase-messaging-sw.js] Received background message ', payload);
//   // Customize notification here
//   // const {title, body} = payload.data
//   const notificationTitle = payload.data.title;
//   const notificationOptions = {
//     body: payload.data.body
//   };

//   self.registration.showNotification(notificationTitle,
//     notificationOptions);
// });