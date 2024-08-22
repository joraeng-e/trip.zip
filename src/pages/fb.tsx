import { requestForToken } from '@/libs/firebase';
import { SetStateAction, useEffect, useState } from 'react';

function App() {
  const [token, setToken] = useState('');
  const [id, setId] = useState(0);
  const [adminId, setAdminId] = useState(0);

  const sendSubscriptionToServer = async () => {
    if (!id || !token) return;

    try {
      const response = await fetch('http://localhost:3000/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, token }),
      });

      if (!response.ok) {
        throw new Error('Failed to send subscription to server');
      }
    } catch (error) {
      console.error('Error sending subscription to server:', error);
    }
  };

  const sendNotification = async () => {
    try {
      const response = await fetch('http://localhost:3000/send-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: adminId, title: 'fuck', body: 'you' }),
      });

      if (!response.ok) {
        throw new Error('Failed to send subscription to server');
      }
    } catch (error) {
      console.error('Error sending subscription to server:', error);
    }
  };

  useEffect(() => {
    const getToken = async () => {
      const permission = await Notification.requestPermission();
      console.log(permission);
      if (permission === 'granted') {
        const token = await requestForToken();
        if (token) setToken(token);
      }
    };

    getToken();
  }, []);

  return (
    <div className="App">
      <h1>Push Notification with React & FCM</h1>
      <p>
        Device Token 👉 <span style={{ fontSize: '11px' }}> {token} </span>
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendSubscriptionToServer();
        }}
      >
        <input
          type="number"
          value={id}
          onChange={(e) => {
            setId(e.currentTarget.value as unknown as SetStateAction<number>);
          }}
        />
        <button type="submit">구독</button>
      </form>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendNotification();
        }}
      >
        <input
          type="number"
          value={adminId}
          onChange={(e) => {
            setAdminId(
              e.currentTarget.value as unknown as SetStateAction<number>,
            );
          }}
        />
        <button type="submit">알림 발송</button>
      </form>

      {token && <h2>Notification permission enabled 👍🏻</h2>}
      {!token && <h2>Need notification permission ❗️ </h2>}
    </div>
  );
}

export default App;
