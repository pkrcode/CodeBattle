import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Suppress known noisy ResizeObserver loop errors in dev (Monaco/Chrome)
if (process.env.NODE_ENV !== 'production') {
  const origError = window.console.error;
  window.console.error = function (...args) {
    const msg = args?.[0];
    if (typeof msg === 'string' && msg.includes('ResizeObserver loop completed with undelivered notifications')) {
      return; // ignore noisy ResizeObserver warning
    }
    return origError.apply(this, args as any);
  };
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);