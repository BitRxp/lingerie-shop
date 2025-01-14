import React from 'react';
import { useFavorites } from '../store/FavoritesContext';
import './Favorites.scss';

const Favorites: React.FC = () => {
  const { favorites, removeFromFavorites } = useFavorites();

  return (
    <div className="favorites-page">
      <h2>Your Favorites</h2>
      <div className="favorites-grid">
        {favorites.length > 0 ? (
          favorites.map((product) => (
            <div key={product.id} className="favorite-card">
              <img src={product.image} alt={product.name} />
              <div className="favorite-info">
                <p>{product.name}</p>
                <p>${product.price}</p>
              </div>
              <button onClick={() => removeFromFavorites(product.id)}>Remove</button>
            </div>
          ))
        ) : (
          <p>No favorites added yet!</p>
        )}
      </div>
    </div>
  );
};

export default Favorites;
