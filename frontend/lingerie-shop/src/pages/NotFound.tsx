import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.scss'; // Стилі для сторінки 404

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>404</h1>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="home-link">
        Go back to Homepage
      </Link>
    </div>
  );
};

export default NotFound;
