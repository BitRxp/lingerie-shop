import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';

const Footer: React.FC = () => {
  // Основна структура футера, поділена на секції для легшого читання та редагування.
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Логотип і контакти */}
        <div className="footer-section contact-info">
          <img src={`${process.env.PUBLIC_URL}/images/LOGO1.png`} alt="Lingerie Logo" className="footer-logo" />
          <p className="hotline">Free hotline:</p>
          <p className="phone-number">8 888 888-88-88</p>
          <div className="social-icons" aria-label="Social media links">
            {/* Іконки соцмереж з посиланнями */}
            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <img src={`${process.env.PUBLIC_URL}/images/youtube.png`} alt="YouTube" />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <img src={`${process.env.PUBLIC_URL}/images/instagram.png`} alt="Instagram" />
            </a>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <img src={`${process.env.PUBLIC_URL}/images/facebook.png`} alt="Facebook" />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <img src={`${process.env.PUBLIC_URL}/images/twitter.png`} alt="Twitter" />
            </a>
          </div>
        </div>

        {/* Корисні поради */}
        <div className="footer-section footer-links">
          <h4>TIPS FOR BUYER</h4>
          <Link to="/size-guide">What is my size?</Link>
          <Link to="/panty-shapes">Panty shapes</Link>
          <Link to="/bra-shapes">Bra shapes</Link>
          <Link to="/laundry-care">Laundry care</Link>
          <Link to="/help-desk">Help desk</Link>
        </div>

        {/* Каталог */}
        <div className="footer-section footer-links">
          <h4>CATALOGUE</h4>
          <Link to="/catalog/bras">Bras</Link>
          <Link to="/catalog/panties">Panties</Link>
          <Link to="/catalog/swimwear">Swimwear</Link>
          <Link to="/catalog/sleepwear">Sleepwear</Link>
          <Link to="/catalog/home-linen">Home linen</Link>
        </div>

        {/* Інформація */}
        <div className="footer-section footer-links">
          <h4>INFORMATION</h4>
          <Link to="/about-us">About us</Link>
          <Link to="/contacts">Contacts</Link>
          <Link to="/order-status">Order Status</Link>
          <Link to="/privacy-policy">Privacy policy</Link>
          <Link to="/terms-of-use">Terms of use</Link>
        </div>

        {/* Підписка на новини */}
        <div className="footer-section subscribe-section">
          <h4>SUBSCRIBE TO NEWS</h4>
          <p>Subscribe to receive news about trends, collections and new promotions.</p>
          <form
            onSubmit={(e) => {
              e.preventDefault(); // Блокування перезавантаження сторінки
              alert('Thank you for subscribing!'); // Повідомлення про підписку
            }}
            aria-label="Subscription Form"
          >
            <input
              type="email"
              className="email-input"
              placeholder="Enter your e-mail"
              aria-label="Enter your email for subscription"
              required
            />
            <button type="submit" className="subscribe-button">
              SUBSCRIBE
              <img
                src={`${process.env.PUBLIC_URL}/images/subscribe-icon.svg`}
                alt="Subscribe"
                className="subscribe-icon"
              />
            </button>
          </form>
        </div>
      </div>

      {/* Нижня частина футера */}
      <div className="footer-bottom">
        <p>© 2024 Lingerie. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
