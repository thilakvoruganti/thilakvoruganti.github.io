import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import { initAnalytics } from './lib/firebaseAnalytics';

initAnalytics();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
