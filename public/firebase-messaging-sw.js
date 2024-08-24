importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts(
  'https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js',
);

firebase.initializeApp({
  apiKey: 'AIzaSyDRaN8WKD1orMWZfsH_QoBOUlY1Z-VaE_0',
  authDomain: 'fcm-demo-beffd.firebaseapp.com',
  projectId: 'fcm-demo-beffd',
  storageBucket: 'fcm-demo-beffd.appspot.com',
  messagingSenderId: '634043942260',
  appId: '1:634043942260:web:90de587b3d83b19ca8d821',
  measurementId: 'G-W2GR30V9JB',
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notification = payload.data;
  const notificationOptions = {
    body: `${payload.data.body}`,
    icon: './logo/logo192.png',
  };

  self.registration.showNotification(notification.title, notificationOptions);
});
