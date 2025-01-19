import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../store/FavoritesContext';
import axios from 'axios';
import './Homepage.scss';
import ArrowIcon from '../components/ArrowIcon';

interface Product {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
}

const Homepage: React.FC = () => {
  const [newCollection, setNewCollection] = useState<Product[]>([]);
  const [bestSellers, setBestSellers] = useState<Product[]>([]);
  const [saleProducts, setSaleProducts] = useState<Product[]>([]);
  const [currentBrandPage, setCurrentBrandPage] = useState(0);
  const brandsPerPage = 4;
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();

  const brands = [
    { id: 1, name: 'Agent Provocateur', logo: '/images/brand1.png' },
    { id: 2, name: 'Calvin Klein', logo: '/images/brand2.png' },
    { id: 3, name: "Victoria's Secret", logo: '/images/brand3.png' },
    { id: 4, name: 'Cosabella', logo: '/images/brand4.png' },
  ];

  useEffect(() => {
    axios.get('http://127.0.0.1:8080/api/v1/products/new-collection').then(({ data }) => setNewCollection(data));
    axios.get('http://127.0.0.1:8080/api/v1/products/best-sellers').then(({ data }) => setBestSellers(data));
    axios.get('http://127.0.0.1:8080/api/v1/products/on-sales').then(({ data }) => setSaleProducts(data));
  }, []);

  const isFavorite = (id: number) => favorites.some((product) => product.id === id);

  const toggleFavorite = (product: Product) => {
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  return (
    <div className="homepage">
      {/* Banner Section */}
      <section className="banner-section">
        <div className="banner-content">
          <h1>
            BREAK PATTERNS <span className="highlight">WITH US</span>
          </h1>
          <p>
            In our store, you can buy as ready-made designer underwear or bring to life any of your sketches. You can also choose a gift for your loved one.
          </p>
          <Link to="/shop" className="shop-now">
            <ArrowIcon /> Shop Now
          </Link>
        </div>
        <div className="help-desk">Help Desk</div>
      </section>

      {/* New Collection */}
      <section className="collection-section">
        <h2>New Collection</h2>
        <div className="product-grid">
          {newCollection.slice(0, 4).map((item) => (
            <div key={item.id} className="product-card">
              <img src={item.imageUrl} alt={item.name} />
              <div className="product-info">
                <h3>{item.name}</h3>
                <p>${item.price.toFixed(2)}</p>
                <button
                  className={`favorite-button ${isFavorite(item.id) ? 'favorited' : ''}`}
                  onClick={() => toggleFavorite(item)}
                >
                  ❤️
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="best-sellers-section">
        <h2>Best Sellers</h2>
        <div className="product-grid">
          {bestSellers.map((item) => (
            <div key={item.id} className="product-card">
              <img src={item.imageUrl} alt={item.name} />
              <div className="product-info">
                <h3>{item.name}</h3>
                <p>${item.price.toFixed(2)}</p>
                <button
                  className={`favorite-button ${isFavorite(item.id) ? 'favorited' : ''}`}
                  onClick={() => toggleFavorite(item)}
                >
                  ❤️
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sale Section */}
      <section className="sale-section">
        <h2>Sale</h2>
        <div className="product-grid">
          {saleProducts.map((item) => (
            <div key={item.id} className="product-card">
              <img src={item.imageUrl} alt={item.name} />
              <div className="product-info">
                <h3>{item.name}</h3>
                <p>${item.price.toFixed(2)}</p>
                <button
                  className={`favorite-button ${isFavorite(item.id) ? 'favorited' : ''}`}
                  onClick={() => toggleFavorite(item)}
                >
                  ❤️
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Homepage;
