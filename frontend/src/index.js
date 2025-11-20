import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css'; // Make sure your global/app styles are imported

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
