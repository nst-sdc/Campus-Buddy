import React, { createContext, useContext, useState, useCallback } from 'react';
import { nanoid } from 'nanoid';
import Toast from './Toast';
import './Toast.css';

const ToastContext = createContext();
export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(
    ({ type = 'info', message, duration = 5000 }) => {
      const id = nanoid();
      setToasts(prev => [...prev, { id, type, message, duration }]);

      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, duration);
    },
    []
  );

  const removeToast = id =>
    setToasts(prev => prev.filter(t => t.id !== id));

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}

      <div className="toast-container">
        {toasts.map(({ id, type, message, duration }) => (
          <Toast
            key={id}
            type={type}
            message={message}
            duration={duration}
            onClose={() => removeToast(id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};
