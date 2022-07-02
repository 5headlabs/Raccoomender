import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
export const API_URL = 'http://localhost:3001/api';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
