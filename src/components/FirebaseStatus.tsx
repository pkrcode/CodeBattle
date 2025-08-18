import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Wifi, WifiOff, RefreshCw } from 'lucide-react';
import { firebaseUtils } from '../firebase/config';

const FirebaseStatus: React.FC = () => {
  const { theme } = useTheme();
  const [isOnline, setIsOnline] = useState(true);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    const checkConnection = () => {
      const online = navigator.onLine && firebaseUtils.isOnline();
      setIsOnline(online);
    };

    // Check initial connection
    checkConnection();

    // Listen for online/offline events
    window.addEventListener('online', checkConnection);
    window.addEventListener('offline', checkConnection);

    return () => {
      window.removeEventListener('online', checkConnection);
      window.removeEventListener('offline', checkConnection);
    };
  }, []);

  const handleReconnect = async () => {
    setIsConnecting(true);
    try {
      await firebaseUtils.enableNetwork();
      setIsOnline(true);
    } catch (error) {
      console.error('Failed to reconnect to Firebase:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  if (isOnline) {
    return null; // Don't show anything when online
  }

  return (
    <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg border ${
      theme === 'dark' 
        ? 'bg-red-900/90 border-red-700 text-red-100' 
        : 'bg-red-50 border-red-200 text-red-800'
    }`}>
      <div className="flex items-center space-x-3">
        <WifiOff className="w-5 h-5" />
        <div>
          <div className="font-medium">Firebase Offline</div>
          <div className="text-sm opacity-80">
            Some features may be limited. Check your internet connection.
          </div>
        </div>
        <button
          onClick={handleReconnect}
          disabled={isConnecting}
          className={`p-2 rounded-full transition-colors ${
            theme === 'dark' 
              ? 'hover:bg-red-800 disabled:opacity-50' 
              : 'hover:bg-red-100 disabled:opacity-50'
          }`}
          title="Reconnect to Firebase"
        >
          {isConnecting ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <Wifi className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
};

export default FirebaseStatus;
