import React from 'react';
import ReactDOM from 'react-dom/client'; // Використовуємо новий API для React 18
import './index.css'; // Підключення глобальних стилів
import App from './App'; // Основний компонент додатка

// Ініціалізація кореневого елемента
const rootElement = document.getElementById('root'); // Знаходимо елемент із ID 'root'
if (!rootElement) {
  throw new Error("Failed to find the root element. Make sure 'root' exists in your HTML.");
}

const root = ReactDOM.createRoot(rootElement); // Створюємо кореневий елемент для рендерингу

// Рендеримо додаток у режимі StrictMode
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
