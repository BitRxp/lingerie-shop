import React, { useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import { getAllCategories, getColors, getSizes } from '../services/CategoryService'; // Додано запити для кольорів і розмірів
import { searchProducts } from '../services/ProductService';
import './CatalogPage.scss';

// Інтерфейси
interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
}

interface FilterOptions {
  categories: string[];
  colors: string[];
  sizes: string[];
  brands: string[];
}

interface SelectedFilters {
  categories: string[];
  colors: string[];
  sizes: string[];
  brands: string[];
  available: string;
  priceRange: [number, number];
}

const CatalogPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    categories: [],
    colors: [],
    sizes: [],
    brands: [],
  });
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    categories: [],
    colors: [],
    sizes: [],
    brands: [],
    available: '',
    priceRange: [100, 500],
  });

  useEffect(() => {
    // Завантаження опцій фільтрів
    getAllCategories().then((response) => {
      setFilterOptions((prev) => ({
        ...prev,
        categories: response.data.map((cat: any) => cat.name),
      }));
    });

    getColors().then((response) => {
      setFilterOptions((prev) => ({
        ...prev,
        colors: response.data.map((color: any) => color.name),
      }));
    });

    getSizes().then((response) => {
      setFilterOptions((prev) => ({
        ...prev,
        sizes: response.data.map((size: any) => size.name),
      }));
    });

    // Завантаження продуктів
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await searchProducts(selectedFilters);
      setProducts(response.data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (
    key: keyof SelectedFilters,
    value: string | [number, number]
  ) => {
    setSelectedFilters((prev) => {
      if (Array.isArray(prev[key])) {
        const arrayValue = prev[key] as string[];
        const updatedArray = arrayValue.includes(value as string)
          ? arrayValue.filter((item) => item !== value)
          : [...arrayValue, value as string];
        return { ...prev, [key]: updatedArray };
      }
      return { ...prev, [key]: value };
    });
  };

  const handleSaveFilters = () => {
    fetchProducts();
  };

  return (
    <div className="catalog-page">
      {/* Breadcrumb */}
      <Breadcrumb
        paths={[
          { label: 'Home', path: '/' },
          { label: 'Catalog', path: '/catalog' },
        ]}
      />
      <h1 className="catalog-title">Catalog of Sets</h1>
      <p className="catalog-subtitle">Found {products.length} products</p>

      <div className="catalog-content">
        {/* Filters */}
        <aside className="filters">
          <h3>Filters</h3>

          {/* Categories */}
          <div className="filter-section">
            <h4>Categories</h4>
            {filterOptions.categories.map((category) => (
              <label key={category}>
                <input
                  type="checkbox"
                  onChange={() => handleFilterChange('categories', category)}
                  checked={selectedFilters.categories.includes(category)}
                />
                {category}
              </label>
            ))}
          </div>

          {/* Colors */}
          <div className="filter-section">
            <h4>Colors</h4>
            {filterOptions.colors.map((color) => (
              <label key={color}>
                <input
                  type="checkbox"
                  onChange={() => handleFilterChange('colors', color)}
                  checked={selectedFilters.colors.includes(color)}
                />
                {color}
              </label>
            ))}
          </div>

          {/* Sizes */}
          <div className="filter-section">
            <h4>Sizes</h4>
            {filterOptions.sizes.map((size) => (
              <label key={size}>
                <input
                  type="checkbox"
                  onChange={() => handleFilterChange('sizes', size)}
                  checked={selectedFilters.sizes.includes(size)}
                />
                {size}
              </label>
            ))}
          </div>

          {/* Price Range */}
          <div className="filter-section">
            <h4>Price</h4>
            <div className="price-range">
              <input
                type="number"
                value={selectedFilters.priceRange[0]}
                onChange={(e) =>
                  handleFilterChange('priceRange', [
                    +e.target.value,
                    selectedFilters.priceRange[1],
                  ])
                }
              />
              <span>-</span>
              <input
                type="number"
                value={selectedFilters.priceRange[1]}
                onChange={(e) =>
                  handleFilterChange('priceRange', [
                    selectedFilters.priceRange[0],
                    +e.target.value,
                  ])
                }
              />
            </div>
          </div>

          {/* Save Filters Button */}
          <button className="save-filters-button" onClick={handleSaveFilters}>
            Apply Filters
          </button>
        </aside>

        {/* Product Grid */}
        <section className="product-grid">
          {isLoading ? (
            <p>Loading products...</p>
          ) : (
            products.map((product) => (
              <div key={product.id} className="product-card">
                <img src={product.image} alt={product.name} />
                <p className="product-name">{product.name}</p>
                <p className="product-price">${product.price.toFixed(2)}</p>
              </div>
            ))
          )}
        </section>
      </div>
    </div>
  );
};

export default CatalogPage;
