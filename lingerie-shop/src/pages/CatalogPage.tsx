import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CatalogPage.scss'; // Стилі для каталогу
import { useFavorites } from '../store/FavoritesContext'; // Контекст для обраних товарів
import { useCart } from '../store/CartContext'; // Контекст для корзини
import axiosInstance from '../utils/axiosInstance'; // Імпорт HTTP-клієнта для роботи з API

// Інтерфейс для опису продукту
interface Product {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  isAvailable: boolean;
  brand: string;
  size: string;
  color: string;
}

const CatalogPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]); // Масив усіх продуктів
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]); // Масив відфільтрованих продуктів
  const [filters, setFilters] = useState({
    brand: '',
    color: '',
    size: '',
    availability: '',
    minPrice: 0,
    maxPrice: 1000,
  }); // Стан для зберігання активних фільтрів

  const { favorites, addToFavorites, removeFromFavorites } = useFavorites(); // Функції для роботи з обраними товарами
  const { addToCart } = useCart(); // Функція для додавання до корзини

  // Завантаження продуктів із серверу при першому рендері
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get<Product[]>('/products'); // Отримання даних продуктів з API
        setProducts(response.data); // Збереження отриманих продуктів
        setFilteredProducts(response.data); // Відображення всіх продуктів за замовчуванням
      } catch (error) {
        console.error('Failed to fetch products:', error); // Логування помилок
      }
    };

    fetchProducts();
  }, []);

  // Застосування фільтрів
  const applyFilters = () => {
    let filtered = [...products];

    // Фільтр за брендом
    if (filters.brand) {
      filtered = filtered.filter((product) => product.brand === filters.brand);
    }

    // Фільтр за кольором
    if (filters.color) {
      filtered = filtered.filter((product) => product.color === filters.color);
    }

    // Фільтр за розміром
    if (filters.size) {
      filtered = filtered.filter((product) => product.size === filters.size);
    }

    // Фільтр за доступністю
    if (filters.availability === 'available') {
      filtered = filtered.filter((product) => product.isAvailable);
    }

    if (filters.availability === 'not-available') {
      filtered = filtered.filter((product) => !product.isAvailable);
    }

    // Фільтр за ціною
    filtered = filtered.filter(
      (product) =>
        product.price >= filters.minPrice && product.price <= filters.maxPrice
    );

    setFilteredProducts(filtered); // Оновлення списку відфільтрованих продуктів
  };

  // Обробка зміни значень фільтра ціни
  const handlePriceChange = (field: 'minPrice' | 'maxPrice', value: number) => {
    setFilters((prev) => ({ ...prev, [field]: value })); // Оновлення стану фільтрів
  };

  return (
    <div className="catalog-page">
      {/* Фільтри */}
      <div className="filters">
        <h3>Filters</h3>

        {/* Фільтр за брендом */}
        <div className="filter-section">
          <h4>Brand</h4>
          <select
            onChange={(e) => setFilters((prev) => ({ ...prev, brand: e.target.value }))}
          >
            <option value="">All</option>
            <option value="Brand A">Brand A</option>
            <option value="Brand B">Brand B</option>
          </select>
        </div>

        {/* Фільтр за кольором */}
        <div className="filter-section">
          <h4>Color</h4>
          <select
            onChange={(e) => setFilters((prev) => ({ ...prev, color: e.target.value }))}
          >
            <option value="">All</option>
            <option value="Black">Black</option>
            <option value="White">White</option>
          </select>
        </div>

        {/* Фільтр за розміром */}
        <div className="filter-section">
          <h4>Size</h4>
          <select
            onChange={(e) => setFilters((prev) => ({ ...prev, size: e.target.value }))}
          >
            <option value="">All</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
          </select>
        </div>

        {/* Фільтр за доступністю */}
        <div className="filter-section">
          <h4>Availability</h4>
          <select
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, availability: e.target.value }))
            }
          >
            <option value="">All</option>
            <option value="available">Available</option>
            <option value="not-available">Not Available</option>
          </select>
        </div>

        {/* Фільтр за ціною */}
        <div className="filter-section">
          <h4>Price</h4>
          <div className="price-filter">
            <div className="price-inputs">
              <div>
                <label htmlFor="min-price">From</label>
                <input
                  id="min-price"
                  type="number"
                  value={filters.minPrice}
                  onChange={(e) => handlePriceChange('minPrice', +e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="max-price">To</label>
                <input
                  id="max-price"
                  type="number"
                  value={filters.maxPrice}
                  onChange={(e) => handlePriceChange('maxPrice', +e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Кнопка застосування фільтрів */}
        <button className="apply-filters-button" onClick={applyFilters}>
          Apply Filters
        </button>
      </div>

      {/* Сітка продуктів */}
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.imageUrl} alt={product.name} />
            <h3>{product.name}</h3>
            <p>${product.price.toFixed(2)}</p>
            <div className="product-actions">
              <button
                className={`favorite-button ${favorites.some(
                  (fav) => fav.id === product.id
                ) ? 'favorited' : ''}`}
                onClick={() =>
                  favorites.some((fav) => fav.id === product.id)
                    ? removeFromFavorites(product.id)
                    : addToFavorites(product)
                }
              >
                <svg className="icon">
                  <use
                    xlinkHref={`/sprite.svg#${
                      favorites.some((fav) => fav.id === product.id)
                        ? 'heart-filled'
                        : 'heart'
                    }`}
                  />
                </svg>
              </button>
              <button
                className="add-to-cart-button"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CatalogPage;
