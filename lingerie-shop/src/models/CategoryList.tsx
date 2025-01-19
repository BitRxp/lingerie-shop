import React from 'react';
import { Link } from 'react-router-dom';

// Оголошення типу для категорій
export interface Category {
  id: number;
  name: string;
}

// Початкові дані категорій
export const initialCategories: Category[] = [
  { id: 1, name: 'New' },
  { id: 2, name: 'Sale' },
  { id: 3, name: 'Bras' },
  { id: 4, name: 'Panties' },
  { id: 5, name: 'Lingerie' },
  { id: 6, name: 'Sets' },
  { id: 7, name: 'Swimwear' },
  { id: 8, name: 'Sleepwear' },
  { id: 9, name: 'Home Linen' },
  { id: 10, name: 'Individual Tailoring' },
];

// Приймає категорії як пропси
interface CategoryListProps {
  categories?: Category[]; // Категорії, які можна передати (опціонально)
}

const CategoryList: React.FC<CategoryListProps> = ({ categories = initialCategories }) => {
  return (
    <div className="category-list">
      <h2>Categories</h2>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <Link to={`/category/${category.id}`} className="category-link">
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
