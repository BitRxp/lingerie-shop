import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import { useCart } from '../store/CartContext';
import './ProductPage.scss';
import axiosInstance from '../utils/axiosInstance';

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
}

interface Product {
  id: number;
  name: string;
  imageUrl: string; // або image, залежно від API
  price: number;
  quantity?: number; // Додайте, якщо необов'язкове поле
}

const ProductPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get<Product>(`/products/${productId}`);
        setProduct(response.data);
        setSelectedColor(response.data.colorOptions[0]); // Вибираємо перший колір за замовчуванням
        setSelectedSize(response.data.sizes[0]); // Вибираємо перший розмір за замовчуванням
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleQuantityChange = (operation: 'increment' | 'decrement') => {
    setQuantity((prev) =>
      operation === 'increment' ? prev + 1 : Math.max(1, prev - 1)
    );
  };

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      setError('Please select a color and size before adding to cart.');
      return;
    }
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity,
      });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!product) {
    return null;
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
                src={`/assets/images/products/${color}.png`}
                alt={`Thumbnail ${color}`}
                className={`thumbnail ${selectedColor === color ? 'active' : ''}`}
                onClick={() => setSelectedColor(color)}
              />
            ))}
          </div>
          <img src={product.image} alt={product.name} className="main-image" />
        </div>

        <div className="product-details">
          <h1>{product.name}</h1>
          <p className="product-code">Code: {product.id}</p>

          <div className="product-colors">
            <h4>Colour</h4>
            <div className="color-options">
              {product.colorOptions.map((color, index) => (
                <span
                  key={index}
                  className={`color-dot ${selectedColor === color ? 'active' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                ></span>
              ))}
            </div>
          </div>

          <div className="product-sizes">
            <h4>Size</h4>
            <div className="size-options">
              {product.sizes.map((size, index) => (
                <span
                  key={index}
                  className={`size-option ${selectedSize === size ? 'active' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
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

          <button className="add-to-cart-button" onClick={handleAddToCart}>
            ADD TO CART
          </button>
        </div>
      </div>

      <div className="product-description">
        <h3>Description</h3>
        <p>{product.description}</p>
      </div>
    </div>
  );
};

export default ProductPage;
