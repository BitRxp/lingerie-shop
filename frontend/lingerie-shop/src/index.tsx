import React from 'react';
import ReactDOM from 'react-dom/client'; // Використовуємо новий API для рендерингу
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')!); // Створюємо кореневий елемент
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
