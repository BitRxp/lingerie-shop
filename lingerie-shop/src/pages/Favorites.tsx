import React from 'react';
import { useFavorites } from '../store/FavoritesContext';
import './Favorites.scss';

const Favorites: React.FC = () => {
  const { favorites, removeFromFavorites } = useFavorites();

  return (
    <div className="favorites-page">
      <h2>Your Favorites</h2>
      {favorites.length > 0 ? (
        <div className="favorites-grid">
          {favorites.map((product) => (
            <div key={product.id} className="favorite-card">
              <img src={product.image} alt={product.name} className="favorite-image" />
              <div className="favorite-info">
                <p className="favorite-name">{product.name}</p>
                <p className="favorite-price">${product.price.toFixed(2)}</p>
              </div>
              <button
                className="remove-button"
                onClick={() => removeFromFavorites(product.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="empty-message">No favorites added yet!</p>
      )}
    </div>
  );
};

export default Favorites;
