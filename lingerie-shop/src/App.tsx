import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout'; // Обгортка Layout
import Homepage from './pages/Homepage';
import CatalogPage from './pages/CatalogPage';
import Search from './pages/Search';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import Favorites from './pages/Favorites';
import CheckoutPage from './pages/CheckoutPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import NotFound from './pages/NotFound';
import MiniCart from './pages/MiniCart'; // Додаємо MiniCart
import { FavoritesProvider } from './store/FavoritesContext';
import { CartProvider } from './store/CartContext';

const App: React.FC = () => {
  const [isMiniCartOpen, setMiniCartOpen] = useState(false); // Стан для відкриття MiniCart

  const toggleMiniCart = () => {
    setMiniCartOpen((prev) => !prev); // Функція для перемикання стану MiniCart
  };

  if (process.env.NODE_ENV === 'development') {
    console.log('API URL:', process.env.REACT_APP_API_URL); // Логування URL API у режимі розробки
  }

  return (
    <FavoritesProvider> {/* Контекст для роботи з обраними товарами */}
      <CartProvider> {/* Контекст для роботи з кошиком */}
        <Router>
          {/* Відображення MiniCart за умовою */}
          {isMiniCartOpen && <MiniCart onClose={toggleMiniCart} />}
          <Routes>
            {/* Головна сторінка */}
            <Route
              path="/"
              element={
                <Layout>
            
                  <Homepage toggleMiniCart={toggleMiniCart} /> {/* Передаємо toggleMiniCart */}
                </Layout>
              }
            />
            {/* Сторінка входу */}
            <Route
              path="/sign-in"
              element={
                <Layout>
                  <SignIn />
                </Layout>
              }
            />
            {/* Сторінка реєстрації */}
            <Route
              path="/sign-up"
              element={
                <Layout>
                  <SignUp />
                </Layout>
              }
            />
            {/* Сторінка пошуку */}
            <Route
              path="/search"
              element={
                <Layout>
                  <Search />
                </Layout>
              }
            />
            {/* Профіль користувача */}
            <Route
              path="/profile"
              element={
                <Layout>
                  <Profile />
                </Layout>
              }
            />
            {/* Сторінка обраного */}
            <Route
              path="/favorites"
              element={
                <Layout>
                  <Favorites />
                </Layout>
              }
            />
            {/* Сторінка кошика */}
            <Route
              path="/cart"
              element={
                <Layout>
                  <Cart />
                </Layout>
              }
            />
            {/* Каталог товарів */}
            <Route
              path="/catalog"
              element={
                <Layout>
                  <CatalogPage />
                </Layout>
              }
            />
            {/* Сторінка оформлення замовлення */}
            <Route
              path="/checkout"
              element={
                <Layout>
                  <CheckoutPage />
                </Layout>
              }
            />
            {/* Сторінка 404 */}
            <Route
              path="*"
              element={
                <Layout>
                  <NotFound />
                </Layout>
              }
            />
          </Routes>
        </Router>
      </CartProvider>
    </FavoritesProvider>
  );
};

export default App;
