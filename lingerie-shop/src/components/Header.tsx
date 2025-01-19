import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CartIcon from './CartIcon';
import { useFavorites } from '../store/FavoritesContext';
import './Header.scss';

const Header: React.FC = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const { favorites } = useFavorites();

  const toggleMenu = () => setMenuVisible((prev) => !prev);
  const closeMenu = () => setMenuVisible(false);

  const menuItems = [
    { to: '/catalog', label: 'Catalog' },
    { to: '/new', label: 'New Arrivals' },
    { to: '/sale', label: 'Sale' },
    { to: '/bras', label: 'Bras' },
    { to: '/panties', label: 'Panties' },
    { to: '/swimwear', label: 'Swimwear' },
    { to: '/sleepwear', label: 'Sleepwear' },
    { to: '/home-linen', label: 'Home Linen' },
    { to: '/individual-tailoring', label: 'Individual Tailoring' },
    { to: '/sign-in', label: 'Sign In' },
    { to: '/sign-up', label: 'Sign Up' },
  ];

  return (
    <header className="header">
      {/* Верхня частина хедера */}
      <div className="header-top">
        <div className="container">
          <div className="header-left">
            <Link to="/" aria-label="Home">
              <img
                src={`${process.env.PUBLIC_URL}/assets/images/LOGO.png`}
                alt="Lingerie Logo"
                className="header-logo"
              />
            </Link>
            <button
              className="menu-button"
              onClick={toggleMenu}
              aria-label={menuVisible ? 'Close Menu' : 'Open Menu'}
            >
              <img
                src={`${process.env.PUBLIC_URL}/assets/images/components-icon.png`}
                alt="Menu Icon"
                className="menu-icon"
              />
              <span>Menu</span>
            </button>
          </div>
          <div className="header-right">
            <Link to="/search" aria-label="Search">
              <img
                src={`${process.env.PUBLIC_URL}/assets/images/search-icon.png`}
                alt="Search"
              />
            </Link>
            <Link to="/profile" aria-label="Profile">
              <img
                src={`${process.env.PUBLIC_URL}/assets/images/user-icon.png`}
                alt="Profile"
              />
            </Link>
            {/* Значок улюблених */}
            <div className="favorites-icon">
              <Link to="/favorites" aria-label="Favorites">
                <img
                  src={`${process.env.PUBLIC_URL}/assets/images/favorite-icon.png`}
                  alt="Favorites"
                />
                {favorites.length > 0 && (
                  <span className="badge">{favorites.length}</span>
                )}
              </Link>
            </div>
            <CartIcon />
          </div>
        </div>
      </div>

      {/* Горизонтальне меню категорій */}
      <div className="header-categories">
        <div className="container">
          <nav>
            {menuItems.slice(1, 9).map((item, index) => (
              <Link key={index} to={item.to}>
                {item.label.toUpperCase()}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Випадаюче меню */}
      {menuVisible && (
        <div className="menu-container" role="dialog" aria-modal="true">
          <div className="menu-content">
            <button
              className="close-button"
              onClick={closeMenu}
              aria-label="Close Menu"
            >
              ✕
            </button>
            <ul>
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link to={item.to} onClick={closeMenu}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default React.memo(Header);
