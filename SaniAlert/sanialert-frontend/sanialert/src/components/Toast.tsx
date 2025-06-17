import React, { useEffect } from 'react';
import './Toast.css';

interface ToastProps {
  message: string;
  show: boolean;
  onClose: () => void;
  type?: 'success' | 'error'; 
}

const Toast: React.FC<ToastProps> = ({ message, show, onClose, type = 'error' }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); 
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) {
    return null;
  }

  return (
    <div className={`toast-container ${type === 'success' ? 'success' : ''}`}>
      {message}
    </div>
  );
};

export default Toast;
