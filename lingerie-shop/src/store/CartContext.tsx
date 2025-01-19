import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import axios from '../utils/axiosInstance';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  fetchCart: () => void; // Нова функція для завантаження кошика з бекенда
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Product[]>([]);

  // Завантаження кошика з бекенда
  const fetchCart = async () => {
    try {
      const response = await axios.get('/cart/');
      setCart(response.data);
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    }
  };

  // Додавання товару до кошика
  const addToCart = async (product: Product) => {
    try {
      const response = await axios.post('/cart/add/', {
        productId: product.id,
        quantity: 1, // Збільшуємо кількість на 1
      });
      setCart(response.data); // Оновлюємо кошик на основі відповіді бекенда
    } catch (error) {
      console.error('Failed to add product to cart:', error);
    }
  };

  // Видалення товару з кошика
  const removeFromCart = async (productId: number) => {
    try {
      const response = await axios.delete(`/cart/${productId}/`);
      setCart(response.data); // Оновлюємо кошик на основі відповіді бекенда
    } catch (error) {
      console.error('Failed to remove product from cart:', error);
    }
  };

  // Очищення кошика
  const clearCart = async () => {
    try {
      await axios.delete('/cart/');
      setCart([]);
    } catch (error) {
      console.error('Failed to clear cart:', error);
    }
  };

  // Завантаження кошика при першому рендері
  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
