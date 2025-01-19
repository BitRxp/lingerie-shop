import React from 'react';
import { useCart } from '../store/CartContext'; // Імпорт контексту для кошика
import './CartIcon.scss'; // Імпорт стилів для іконки

const CartIcon: React.FC = () => {
  const { cart } = useCart(); // Отримуємо товари з кошика

  // Підрахунок кількості товарів із fallback на 0
  const cartCount = cart?.reduce((total, item) => total + item.quantity, 0) || 0;

  return (
    <div className="cart-icon" aria-label={`Cart with ${cartCount} items`}>
      <img src={`${process.env.PUBLIC_URL}/images/cart-icon.png`} alt="Cart Icon" />
      {cartCount > 0 && <span className="badge">{cartCount}</span>}
    </div>
  );
};

export default CartIcon;
