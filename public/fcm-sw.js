importScripts('https://www.gstatic.com/firebasejs/7.24.0/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/7.24.0/firebase-messaging.js')
var notificationStack = require('../lib/notificationStack').notificationStack

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyBeaQh0WK8j7SF_1vjkm7JFR4a9zXUBWho",
    projectId: "cnails-524ee",
    messagingSenderId: "724781215995",
    appId: "1:724781215995:web:e539d1a943aee7851ec05e"
  })

  firebase.messaging();
  firebase.messaging().onBackgroundMessage(function (payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const {title, body} = payload.data
    notificationStack.set(notificationStack.push((await notificationStack.get()),title, body))
    const notificationTitle = title;
    const notificationOptions = {
      body,
    };

    self.registration.showNotification(notificationTitle,
      notificationOptions);
  })
}