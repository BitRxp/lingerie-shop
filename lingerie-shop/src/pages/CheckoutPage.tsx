import React, { useState } from 'react';
import './CheckoutPage.scss';

const CheckoutPage: React.FC = () => {
  const [step, setStep] = useState(1); // Контроль етапів
  const [contactInfo, setContactInfo] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
  });
  const [deliveryMethod, setDeliveryMethod] = useState('courier');
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [promoCode, setPromoCode] = useState('');
  const [orderSummary, setOrderSummary] = useState({
    itemsWorth: 640.0,
    deliveryCost: 35.0,
    promoDiscount: 0.0,
  });

  const handleNextStep = () => {
    if (step < 3) setStep((prev) => prev + 1);
  };

  const handlePreviousStep = () => {
    if (step > 1) setStep((prev) => prev - 1);
  };

  const applyPromoCode = () => {
    if (promoCode === 'DISCOUNT20') {
      setOrderSummary((prev) => ({
        ...prev,
        promoDiscount: 20.0,
      }));
    } else {
      alert('Invalid promo code.');
    }
  };

  const handleSubmitOrder = () => {
    alert('Order submitted successfully!');
  };

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      {/* Steps */}
      <div className="checkout-steps">
        <span className={step === 1 ? 'active' : ''}>1. Contact Information</span>
        <span className={step === 2 ? 'active' : ''}>2. Delivery Method</span>
        <span className={step === 3 ? 'active' : ''}>3. Payment Method</span>
      </div>

      {/* Steps Content */}
      {step === 1 && (
        <section className="contact-information">
          <h2>1. Contact Information</h2>
          <form>
            <div>
              <label>First Name *</label>
              <input
                type="text"
                value={contactInfo.firstName}
                onChange={(e) =>
                  setContactInfo({ ...contactInfo, firstName: e.target.value })
                }
              />
            </div>
            <div>
              <label>Last Name *</label>
              <input
                type="text"
                value={contactInfo.lastName}
                onChange={(e) =>
                  setContactInfo({ ...contactInfo, lastName: e.target.value })
                }
              />
            </div>
            <div>
              <label>Mobile Phone *</label>
              <input
                type="text"
                value={contactInfo.phone}
                onChange={(e) =>
                  setContactInfo({ ...contactInfo, phone: e.target.value })
                }
              />
            </div>
            <div>
              <label>Email *</label>
              <input
                type="email"
                value={contactInfo.email}
                onChange={(e) =>
                  setContactInfo({ ...contactInfo, email: e.target.value })
                }
              />
            </div>
          </form>
        </section>
      )}

      {step === 2 && (
        <section className="delivery-method">
          <h2>2. Delivery Method</h2>
          <div className="delivery-options">
            {['post_office', 'courier', 'pickup', 'international'].map((method) => (
              <label key={method}>
                <input
                  type="radio"
                  name="delivery"
                  value={method}
                  checked={deliveryMethod === method}
                  onChange={(e) => setDeliveryMethod(e.target.value)}
                />
                {method.replace('_', ' ').toUpperCase()}
              </label>
            ))}
          </div>
        </section>
      )}

      {step === 3 && (
        <section className="payment-method">
          <h2>3. Payment Method</h2>
          <div className="payment-options">
            {['apple_pay', 'google_pay', 'credit_card', 'cash'].map((method) => (
              <label key={method}>
                <input
                  type="radio"
                  name="payment"
                  value={method}
                  checked={paymentMethod === method}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                {method.replace('_', ' ').toUpperCase()}
              </label>
            ))}
          </div>
        </section>
      )}

      {/* Order Summary */}
      <aside className="order-summary">
        <h3>Order Summary</h3>
        <p>Items worth: ${orderSummary.itemsWorth.toFixed(2)}</p>
        <p>Delivery: ${orderSummary.deliveryCost.toFixed(2)}</p>
        <p>Promo code: -${orderSummary.promoDiscount.toFixed(2)}</p>
        <p>
          <strong>Total price:</strong> $
          {(
            orderSummary.itemsWorth +
            orderSummary.deliveryCost -
            orderSummary.promoDiscount
          ).toFixed(2)}
        </p>
        <input
          type="text"
          value={promoCode}
          placeholder="Enter promo code"
          onChange={(e) => setPromoCode(e.target.value)}
        />
        <button onClick={applyPromoCode}>Apply Promo Code</button>
      </aside>

      {/* Navigation Buttons */}
      <div className="checkout-controls">
        <button disabled={step === 1} onClick={handlePreviousStep}>
          Back
        </button>
        <button onClick={step === 3 ? handleSubmitOrder : handleNextStep}>
          {step === 3 ? 'Submit Order' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
