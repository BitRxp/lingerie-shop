import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Product.scss';

// Інтерфейси для типізації продуктів
export interface Product {
    id: number;
    name: string;
    price: number;
    imageUrl: string; // Переконайтесь, що це поле є
    category: string;
    quantity?: number; // Якщо потрібно для кошика
  }
  

export interface ProductGetRequest {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

export interface ProductPutRequest {
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

export interface ProductResponse {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

// Головний компонент для відображення списку продуктів
const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Запит до бекенду для отримання списку продуктів
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<ProductGetRequest[]>('/api/v1/products');
        const mappedProducts = response.data.map((product) => ({
          id: product.id,
          name: product.name,
          price: product.price,
          imageUrl: product.imageUrl,
          category: product.category,
        }));
        setProducts(mappedProducts);
      } catch (err) {
        setError('Failed to fetch products');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="product-list">
      <h1>Our Products</h1>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.imageUrl} alt={product.name} className="product-image" />
            <h2 className="product-name">{product.name}</h2>
            <p className="product-category">Category: {product.category}</p>
            <p className="product-price">${product.price.toFixed(2)}</p>
            <button className="add-to-cart-button">Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
