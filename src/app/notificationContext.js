'use client';

import { createContext, useState, useContext } from 'react';

const NotificationContext = createContext();

export const useNotification = () => {
  return useContext(NotificationContext);
};

export const NotificationProvider = ({ children }) => {
  const [message, setMessage] = useState(null);

  const sendNotification = (msg) => {
    setMessage(msg);
  };

  return (
    <NotificationContext.Provider value={{ message, sendNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};