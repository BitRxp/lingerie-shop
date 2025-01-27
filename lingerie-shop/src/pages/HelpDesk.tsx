import React from 'react';
import { Link } from 'react-router-dom';
import './HelpDesk.scss';

interface HelpDeskProps {
  onClose: () => void;
}

const HelpDesk: React.FC<HelpDeskProps> = ({ onClose }) => {
  return (
    <div className="help-desk-overlay">
      <div className="help-desk-modal">
        <div className="help-desk-header">
          <h2>HOW WE CAN HELP YOU?</h2>
          <button className="close-button" onClick={onClose}>✕</button>
        </div>
        <ul className="help-desk-list">
          <li>
            <Link to="/help/product-info">
              Product info <span className="arrow">→</span>
            </Link>
          </li>
          <li>
            <Link to="/help/gift-card">
              Gift card <span className="arrow">→</span>
            </Link>
          </li>
          <li>
            <Link to="/help/order-status">
              Order status <span className="arrow">→</span>
            </Link>
          </li>
          <li>
            <Link to="/help/returns">
              Returns and Exchanges <span className="arrow">→</span>
            </Link>
          </li>
          <li>
            <Link to="/help/shipping">
              Shipping <span className="arrow">→</span>
            </Link>
          </li>
        </ul>
        <div className="help-desk-footer">
          <p>
            If you can’t find the answer to your question in our guidelines, you can contact our operators.
          </p>
          <Link to="/help/contact" className="contact-button">
            → CONTACT US
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HelpDesk;
