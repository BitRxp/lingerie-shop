import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { getNewCollection, getBestSellers, getTailoringProducts } from '../services/ProductService';

import './Homepage.scss';
import ArrowIcon from '../components/ArrowIcon';

// Функція для отримання продуктів зі знижками
const getProductsOnSale = async () => {
  try {
    const response = await axios.get(
      'http://116.203.195.165:8080/api/v1/products/on-sale'
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching sale products:', error);
    throw error;
  }
};

// Масив брендів (завантаження на фронтенді)
const brands = [
  { id: 1, name: '', imageUrl: '/images/brand1.png' },
  { id: 2, name: '', imageUrl: '/images/brand2.png' },
  { id: 3, name: "", imageUrl: '/images/brand3.png' },
  { id: 4, name: '', imageUrl: '/images/brand4.png' },
  { id: 5, name: '', imageUrl: '/images/brand5.png' },
  { id: 6, name: '', imageUrl: '/images/brand6.png' },
];

// Інтерфейс для продуктів
interface Product {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
}

const Homepage: React.FC = () => {
  const [newCollectionProducts, setNewCollectionProducts] = useState<Product[]>([]);
  const [bestSellers, setBestSellers] = useState<Product[]>([]);
  const [saleProducts, setSaleProducts] = useState<Product[]>([]);
  const [tailoringProducts, setTailoringProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentBrandPage, setCurrentBrandPage] = useState(0);
  const brandsPerPage = 4; // Кількість брендів на сторінку

  // Завантаження даних з API
  useEffect(() => {
    getNewCollection().then((response) => setNewCollectionProducts(response.data));
    getBestSellers().then((response) => setBestSellers(response.data));
    getProductsOnSale()
      .then((products) => setSaleProducts(products))
      .catch((error) => {
        console.error('Error fetching sale products:', error);
        setError('Failed to load sale products.');
      });

    getTailoringProducts().then((response) => setTailoringProducts(response.data));
  }, []);

  // Відображення брендів для поточної сторінки
  const displayedBrands = brands.slice(
    currentBrandPage * brandsPerPage,
    currentBrandPage * brandsPerPage + brandsPerPage
  );

  // Логіка пагінації
  const handleBrandPagination = (direction: 'next' | 'prev') => {
    setCurrentBrandPage((prevPage) => {
      if (direction === 'next') {
        return prevPage + 1 < Math.ceil(brands.length / brandsPerPage)
          ? prevPage + 1
          : prevPage;
      } else {
        return prevPage > 0 ? prevPage - 1 : 0;
      }
    });
  };


  return (
    <div className="homepage">
      {/* Banner Section */}
      <section className="banner-section">
        <div className="banner-content">
          <h1 className="banner-title">
            BREAK PATTERNS <span className="highlight">WITH US</span>
          </h1>
          <p className="banner-description">
            In our store, you can buy ready-made designer underwear or bring to life any
            of your sketches. You can also choose a gift for your loved one.
          </p>
          <Link to="/catalog" className="shop-now-button">
            <ArrowIcon color="#1F1F21" /> SHOP NOW
          </Link>
        </div>
        <div className="help-desk-button">HELP DESK</div>
      </section>

      {/* New Collection Section */}
      <section className="collection-section">
        <h2 className="section-title">New Collection</h2>
        <div className="product-grid">
          {newCollectionProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.imageUrl} alt={product.name} className="product-image" />
              <button className="product-button">{product.name.toUpperCase()}</button>
            </div>
          ))}
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="best-sellers-section">
        <h2 className="section-title">Best Sellers</h2>
        <div className="product-grid">
          {bestSellers.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.imageUrl} alt={product.name} className="product-image" />
              <div className="product-info">
                <p>{product.name}</p>
                <p>${product.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Brands Section */}
      <section className="brands-banner">
        <h2 className="section-title">Our Brands</h2>
        <div className="brands-carousel">
          <button
            className="carousel-arrow left-arrow"
            onClick={() => handleBrandPagination('prev')}
            disabled={currentBrandPage === 0}
          >
            ←
          </button>
          <div className="brands-container">
            {displayedBrands.map((brand) => (
              <div key={brand.id} className="brand-logo">
                <img src={brand.imageUrl} alt={brand.name} />
                <p>{brand.name}</p>
              </div>
            ))}
          </div>
          <button
            className="carousel-arrow right-arrow"
            onClick={() => handleBrandPagination('next')}
            disabled={currentBrandPage + 1 >= Math.ceil(brands.length / brandsPerPage)}
          >
            →
          </button>
        </div>
      </section>

      {/* Sale Section */}
      <section className="sale-section">
        <h2 className="section-title">Sale</h2>
        {error ? (
          <p className="error-message">{error}</p>
        ) : (
          <div className="product-grid">
            {saleProducts.map((product) => (
              <div key={product.id} className="product-card">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="product-image"
                />
                <div className="product-info">
                  <p>{product.name}</p>
                  <p>${product.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* About Us Section */}
      <section className="about-us-section">
        <div className="about-us-container">
          <div className="advantages">
            <h2 className="section-title">Our Shop Advantages</h2>
            <div className="advantages-grid">
              <div className="advantage">
                <img src="/images/free-shipping.png" alt="Free Shipping" />
                <p>Free Shipping</p>
              </div>
              <div className="advantage">
                <img src="/images/secure-payment.png" alt="Secure Payment" />
                <p>Secure Payment</p>
              </div>
              <div className="advantage">
                <img src="/images/purchase-bonuses.png" alt="Purchase Bonuses" />
                <p>Purchase Bonuses</p>
              </div>
              <div className="advantage">
                <img src="/images/easy-return.png" alt="Easy Return" />
                <p>Easy Return</p>
              </div>
            </div>
          </div>

          <div className="about-us-text">
            <h2 className="section-title">Few Words About Us</h2>
            <p className="section-subtitle">
              We care about women and create a great service to make them feel comfortable
              in the right lingerie.
            </p>
            <button className="instagram-button">
              <span>Our Instagram</span>
              <ArrowIcon color="#AC643E" />
            </button>
            <div className="instagram-photos">
              <img src="/images/ins1.png" alt=" " />
              <img src="/images/ins2.png" alt=" " />
              <img src="/images/ins3.png" alt=" " />
            </div>
          </div>
        </div>
      </section>           
    </div>
  );
};

export default Homepage;
