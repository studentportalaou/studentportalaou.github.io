importScripts("https://www.gstatic.com/firebasejs/7.15.5/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.15.5/firebase-messaging.js");

//Using singleton breaks instantiating messaging()
// App firebase = FirebaseWeb.instance.app;


firebase.initializeApp({
    apiKey: "AIzaSyAKuOf9u31eOYwEl35lcgRuJcWadl1wri8",
    authDomain: "students-management-syst-84e5e.firebaseapp.com",
    projectId: "students-management-syst-84e5e",
    storageBucket: "students-management-syst-84e5e.appspot.com",
    messagingSenderId: "641100430972",
    appId: "1:641100430972:web:a885b7c454d01852acd3f9",
    measurementId: "G-6DZJFDT9R4"
});

const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function (payload) {
    const promiseChain = clients
        .matchAll({
            type: "window",
            includeUncontrolled: true
        })
        .then(windowClients => {
            for (let i = 0; i < windowClients.length; i++) {
                const windowClient = windowClients[i];
                windowClient.postMessage(payload);
            }
        })
        .then(() => {
            return registration.showNotification("New Message");
        });
    return promiseChain;
});
self.addEventListener('notificationclick', function (event) {
    console.log('notification received: ', event)
});