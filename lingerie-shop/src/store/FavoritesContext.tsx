// src/store/FavoritesContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import axios from '../utils/axiosInstance';

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
}

interface FavoritesContextType {
  favorites: Product[];
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: number) => void;
  fetchFavorites: () => void; // Завантаження улюблених товарів з бекенда
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Product[]>([]);

  // Завантаження улюблених товарів з бекенда
  const fetchFavorites = async () => {
    try {
      const response = await axios.get('/favorites/');
      setFavorites(response.data);
    } catch (error) {
      console.error('Failed to fetch favorites:', error);
    }
  };

  // Додавання товару до списку улюблених
  const addToFavorites = async (product: Product) => {
    try {
      if (!favorites.some((fav) => fav.id === product.id)) {
        const response = await axios.post('/favorites/add/', { productId: product.id });
        setFavorites(response.data); // Оновлення списку улюблених
      }
    } catch (error) {
      console.error('Failed to add product to favorites:', error);
    }
  };

  // Видалення товару зі списку улюблених
  const removeFromFavorites = async (productId: number) => {
    try {
      const response = await axios.delete(`/favorites/${productId}/`);
      setFavorites(response.data); // Оновлення списку улюблених
    } catch (error) {
      console.error('Failed to remove product from favorites:', error);
    }
  };

  // Завантаження улюблених товарів при першому рендері
  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <FavoritesContext.Provider
      value={{ favorites, addToFavorites, removeFromFavorites, fetchFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
