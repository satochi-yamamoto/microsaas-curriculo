import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import '@/index.css';

// Remove loading fallback once React app is ready
const removeLoadingFallback = () => {
  const loadingWrapper = document.querySelector('.loading-wrapper');
  if (loadingWrapper) {
    loadingWrapper.remove();
  }
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Remove loading fallback after React hydration
setTimeout(removeLoadingFallback, 100);