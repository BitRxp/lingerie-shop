import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import './ProductPage.scss';
import axios from 'axios';

import BASE_URL from '../config';


interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  description: string;
  laundryCare: string[];
  colorOptions: string[];
  sizes: string[];
  rating: number;
  reviews: Review[];
}

interface Review {
  name: string;
  rating: number;
  comment: string;
  date: string;
}

const ProductPage: React.FC = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/v1/products/${productId}`)
      .then((response) => setProduct(response.data))
      .catch((err) => {
        console.error('Error fetching product:', err);
        setError('Failed to load product. Please try again.');
      });
  }, [productId]);

  const handleQuantityChange = (operation: 'increment' | 'decrement') => {
    setQuantity((prev) =>
      operation === 'increment' ? prev + 1 : Math.max(1, prev - 1)
    );
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-page">
      <Breadcrumb
        paths={[
          { label: 'Home', path: '/' },
          { label: 'Catalog', path: '/catalog' },
          { label: product.name, path: `/product/${product.id}` },
        ]}
      />

      <div className="product-container">
        <div className="product-images">
          <div className="thumbnail-list">
            {product.colorOptions.map((color, index) => (
              <img
                key={index}
                src={`${BASE_URL}/images/products/${color}.png`}
                alt={`Thumbnail ${color}`}
                className="thumbnail"
              />
            ))}
          </div>
          <img src={product.image} alt={product.name} className="main-image" />
        </div>

        <div className="product-details">
          <h1>{product.name.toUpperCase()}</h1>
          <p className="product-code">Code: {product.id}</p>

          <div className="product-colors">
            <h4>Colour</h4>
            <div className="color-options">
              {product.colorOptions.map((color, index) => (
                <span
                  key={index}
                  className="color-dot"
                  style={{ backgroundColor: color }}
                ></span>
              ))}
            </div>
          </div>

          <div className="product-sizes">
            <h4>Size</h4>
            <div className="size-options">
              {product.sizes.map((size, index) => (
                <span key={index} className="size-option">
                  {size}
                </span>
              ))}
            </div>
          </div>

          <div className="product-price">
            <h4>Price</h4>
            <p>${product.price.toFixed(2)}</p>
          </div>

          <div className="quantity-selector">
            <button onClick={() => handleQuantityChange('decrement')}>-</button>
            <span>{quantity}</span>
            <button onClick={() => handleQuantityChange('increment')}>+</button>
          </div>

          <button className="add-to-cart-button">ADD TO CART</button>
        </div>
      </div>

      <div className="product-description">
        <h3>Description</h3>
        <p>{product.description}</p>
      </div>

      <div className="reviews">
        <h3>Reviews ({product.reviews.length})</h3>
        {product.reviews.slice(0, 2).map((review, index) => (
          <div key={index} className="review">
            <p>{review.comment}</p>
            <span>
              <strong>{review.name}</strong> - {review.date}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
