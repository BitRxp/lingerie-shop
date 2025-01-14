import React, { useState } from 'react';
import './CheckoutPage.scss';

const CheckoutPage = () => {
  const [step, setStep] = useState(1); // Контроль етапів
  const [contactInfo, setContactInfo] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
  });
  const [deliveryMethod, setDeliveryMethod] = useState('courier');
  const [shippingAddress, setShippingAddress] = useState({
    postalCode: '',
    country: '',
    city: '',
    address: '',
    comment: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [promoCode, setPromoCode] = useState('');
  const [orderSummary, setOrderSummary] = useState({
    itemsWorth: 640.0,
    deliveryCost: 35.0,
    promoDiscount: 0.0,
  });

  const handleNextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePreviousStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const applyPromoCode = () => {
    // Логіка застосування промокоду
    if (promoCode === 'DISCOUNT20') {
      setOrderSummary((prev) => ({
        ...prev,
        promoDiscount: 20.0,
      }));
    }
  };

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>
      <div className="checkout-steps">
        <span className={step === 1 ? 'active' : ''}>1. Contact Information</span>
        <span className={step === 2 ? 'active' : ''}>2. Delivery Method</span>
        <span className={step === 3 ? 'active' : ''}>3. Payment Method</span>
      </div>

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
            <label>
              <input
                type="radio"
                name="delivery"
                value="post_office"
                checked={deliveryMethod === 'post_office'}
                onChange={(e) => setDeliveryMethod(e.target.value)}
              />
              Delivery to the post office
            </label>
            <label>
              <input
                type="radio"
                name="delivery"
                value="courier"
                checked={deliveryMethod === 'courier'}
                onChange={(e) => setDeliveryMethod(e.target.value)}
              />
              Courier delivery
            </label>
            <label>
              <input
                type="radio"
                name="delivery"
                value="pickup"
                checked={deliveryMethod === 'pickup'}
                onChange={(e) => setDeliveryMethod(e.target.value)}
              />
              Pickup from our boutiques
            </label>
            <label>
              <input
                type="radio"
                name="delivery"
                value="international"
                checked={deliveryMethod === 'international'}
                onChange={(e) => setDeliveryMethod(e.target.value)}
              />
              International delivery
            </label>
          </div>
        </section>
      )}

      {step === 3 && (
        <section className="payment-method">
          <h2>3. Payment Method</h2>
          <div className="payment-options">
            <label>
              <input
                type="radio"
                name="payment"
                value="apple_pay"
                checked={paymentMethod === 'apple_pay'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Apple Pay
            </label>
            <label>
              <input
                type="radio"
                name="payment"
                value="google_pay"
                checked={paymentMethod === 'google_pay'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Google Pay
            </label>
            <label>
              <input
                type="radio"
                name="payment"
                value="credit_card"
                checked={paymentMethod === 'credit_card'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Credit Card
            </label>
            <label>
              <input
                type="radio"
                name="payment"
                value="cash"
                checked={paymentMethod === 'cash'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Cash
            </label>
          </div>
        </section>
      )}

      <aside className="order-summary">
        <h3>Order Summary</h3>
        <p>Items worth: ${orderSummary.itemsWorth.toFixed(2)}</p>
        <p>Delivery: ${orderSummary.deliveryCost.toFixed(2)}</p>
        <p>Promo code: -${orderSummary.promoDiscount.toFixed(2)}</p>
        <p>
          <strong>Total price: </strong>
          ${(orderSummary.itemsWorth + orderSummary.deliveryCost - orderSummary.promoDiscount).toFixed(2)}
        </p>
      </aside>

      <div className="checkout-controls">
        <button disabled={step === 1} onClick={handlePreviousStep}>
          Back
        </button>
        <button onClick={handleNextStep}>
          {step === 3 ? 'Submit Order' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
