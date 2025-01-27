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
import MiniCart from './components/MiniCart'; // Додаємо MiniCart
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
    <FavoritesProvider>
      <CartProvider>
        <Router>
          {isMiniCartOpen && <MiniCart onClose={toggleMiniCart} />} {/* Перевіряємо відкриття MiniCart */}
          <Routes>
            <Route
              path="/"
              element={
                <Layout>
                  <Homepage /> {/* Видалено toggleMiniCart, оскільки він не використовується */}
                </Layout>
              }
            />
            <Route
              path="/sign-in"
              element={
                <Layout>
                  <SignIn />
                </Layout>
              }
            />
            <Route
              path="/sign-up"
              element={
                <Layout>
                  <SignUp />
                </Layout>
              }
            />
            <Route
              path="/search"
              element={
                <Layout>
                  <Search />
                </Layout>
              }
            />
            <Route
              path="/profile"
              element={
                <Layout>
                  <Profile />
                </Layout>
              }
            />
            <Route
              path="/favorites"
              element={
                <Layout>
                  <Favorites />
                </Layout>
              }
            />
            <Route
              path="/cart"
              element={
                <Layout>
                  <Cart />
                </Layout>
              }
            />
            <Route
              path="/catalog"
              element={
                <Layout>
                  <CatalogPage />
                </Layout>
              }
            />
            <Route
              path="/checkout"
              element={
                <Layout>
                  <CheckoutPage />
                </Layout>
              }
            />
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
