import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { useCart } from '../store/CartContext'; // Контекст для додавання в кошик
import './ProductList.scss';

interface Product {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  description?: string; // Якщо опис є необов'язковим
  quantity?: number;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart(); // Функція додавання до кошика

  // Отримання даних з бекенду
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get<Product[]>('/products');
        setProducts(response.data);
      } catch (err) {
        setError('Failed to fetch products. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (isLoading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!products.length) {
    return <div className="no-products">No products available.</div>;
  }

  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <img src={product.imageUrl} alt={product.name} className="product-image" />
          <div className="product-info">
            <h3 className="product-name">{product.name}</h3>
            {product.description && <p className="product-description">{product.description}</p>}
            <p className="product-price">${product.price.toFixed(2)}</p>
          </div>
          <button
            className="add-to-cart-button"
            onClick={() => addToCart({ ...product, quantity: 1 })} // Передаємо продукт із кількістю
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
