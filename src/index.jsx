import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './context/AuthContext';
import App from './App';
import './assets/styles/main.scss';

// ایجاد ریشه React
const root = ReactDOM.createRoot(document.getElementById('root'));

// رندر برنامه اصلی
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);