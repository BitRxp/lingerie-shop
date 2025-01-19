import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../store/CartContext';
import './MiniCart.scss';

interface MiniCartProps {
  onClose: () => void;
}

const MiniCart: React.FC<MiniCartProps> = ({ onClose }) => {
  const { cart, removeFromCart } = useCart();
  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="mini-cart-overlay" onClick={onClose}>
      <div className="mini-cart" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        <h2>Your Cart</h2>
        {cart.length === 0 ? (
          <p className="empty-message">Your cart is empty.</p>
        ) : (
          <>
            <ul className="cart-items">
              {cart.map((item) => (
                <li key={item.id} className="cart-item">
                  <img src={item.imageUrl} alt={item.name} />
                  <div className="item-info">
                    <p className="item-name">{item.name}</p>
                    <p className="item-quantity">Quantity: {item.quantity}</p>
                    <p className="item-price">${item.price.toFixed(2)}</p>
                  </div>
                  <button
                    className="remove-button"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <div className="mini-cart-summary">
              <p className="total-amount">Total: ${totalAmount.toFixed(2)}</p>
              <Link to="/checkout" className="checkout-button" onClick={onClose}>
                Proceed to Checkout
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MiniCart;
