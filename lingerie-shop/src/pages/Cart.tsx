import React from 'react';
import { useCart } from '../store/CartContext';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import './Cart.scss';

const Cart: React.FC = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  // Обчислення загальної суми кошика
  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleQuantityChange = (id: number, quantity: number) => {
    if (quantity < 1) return; // Унеможливлюємо введення некоректного значення
    removeFromCart(id, quantity); // Передаємо кількість до функції
  };

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty.</p>
          <Link to="/catalog" className="continue-shopping-link">
            Continue Shopping
          </Link>
        </div>
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
                  <td>
                    <input
                      type="number"
                      className="quantity-input"
                      value={item.quantity}
                      min={1}
                      onChange={(e) =>
                        handleQuantityChange(item.id, parseInt(e.target.value) || 1)
                      }
                    />
                  </td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button
                      className="remove-button"
                      onClick={() => removeFromCart(item.id, 0)} // Видаляємо товар, якщо кількість 0
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
            <Link to="/checkout" className="checkout-button">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Cart;
