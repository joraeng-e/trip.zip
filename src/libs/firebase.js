import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

let messaging;

if (typeof window !== 'undefined') {
  const app = initializeApp(firebaseConfig);
  messaging = getMessaging(app);

  onMessage(messaging, (payload) => {
    new Notification(payload.data.title, {
      body: payload.data.body,
      icon: '/logo/logo192.png',
    });
  });
}

export const requestForToken = () => {
  if (messaging) {
    return getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
    })
      .then((currentToken) => {
        if (currentToken) {
          return currentToken;
        } else {
          alert(
            'No registration token available. Request permission to generate one.',
          );
          return null;
        }
      })
      .catch((err) => {
        alert('An error occurred while retrieving token - ' + err);
        return null;
      });
  }
};
