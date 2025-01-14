import React from 'react';
import { useCart } from '../store/CartContext'; // Імпортуємо контекст для кошика
import Footer from '../components/Footer'; // Імпортуємо футер
import './Cart.scss';

const Cart: React.FC = () => {
  const { cart, removeFromCart, clearCart } = useCart(); // Отримуємо товари та функції з контексту

  // Обчислення загальної суми кошика
  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td className="product-info">
                    <img src={item.imageUrl} alt={item.name} className="product-image" />
                    <span>{item.name}</span>
                  </td>
                  <td>{item.quantity}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button
                      className="remove-button"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="cart-summary">
            <h2>Total: ${totalAmount.toFixed(2)}</h2>
            <button className="clear-cart" onClick={clearCart}>
              Clear Cart
            </button>
            <button className="checkout-button">Proceed to Checkout</button>
          </div>
        </div>
      )}

      <Footer /> {/* Додаємо футер */}
    </div>
  );
};

export default Cart;
