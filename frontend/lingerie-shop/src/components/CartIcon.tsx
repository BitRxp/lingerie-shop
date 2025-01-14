import React from 'react';
import { useCart } from '../store/CartContext'; // Імпорт контексту для кошика
import './CartIcon.scss'; // Імпорт стилів для іконки

const CartIcon: React.FC = () => {
  const { cart } = useCart(); // Отримуємо кількість товарів у кошику

  // Безпечна перевірка на випадок null або undefined
  const cartCount = cart?.length || 0;

  return (
    <div className="cart-icon" aria-label={`Cart with ${cartCount} items`}>
      <img src="/images/cart-icon.png" alt="Cart Icon" />
      {cartCount > 0 && <span className="badge">{cartCount}</span>}
    </div>
  );
};

export default CartIcon;
