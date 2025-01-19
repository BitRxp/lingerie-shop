import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance'; // Використовуємо конфігурований axios
import './Product.scss';

// Інтерфейси для типізації продуктів
export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  quantity?: number; // Поле для кошика
}

// Відповідь від API
export interface ProductGetResponse {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Отримання списку продуктів
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get<ProductGetResponse[]>('/api/v1/products');
        const mappedProducts: Product[] = response.data.map((product) => ({
          id: product.id,
          name: product.name,
          price: product.price,
          imageUrl: product.imageUrl,
          category: product.category,
        }));
        setProducts(mappedProducts);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to fetch products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="product">
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
