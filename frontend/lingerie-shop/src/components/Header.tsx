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

  return (
    <header className="header">
      {/* Верхня частина хедера */}
      <div className="header-top">
        <div className="container">
          <div className="header-left">
            <Link to="/" aria-label="Home">
              <img src="/assets/images/LOGO.png" alt="Lingerie Logo" className="header-logo" />
            </Link>
            <button className="menu-button" onClick={toggleMenu} aria-label="Toggle Menu">
              <img
                src="/assets/images/components-icon.png"
                alt="Menu Icon"
                className="menu-icon"
              />
              <span>Menu</span>
            </button>
          </div>
          <div className="header-right">
            <Link to="/search" aria-label="Search">
              <img src="/assets/images/search-icon.png" alt="Search" />
            </Link>
            <Link to="/profile" aria-label="Profile">
              <img src="/assets/images/user-icon.png" alt="Profile" />
            </Link>
            {/* Значок улюблених */}
            <div className="favorites-icon">
              <Link to="/favorites" aria-label="Favorites">
                <img src="/assets/images/favorite-icon.png" alt="Favorites" />
                {favorites.length > 0 && <span className="badge">{favorites.length}</span>}
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
            <Link to="/new">NEW</Link>
            <Link to="/sale">SALE</Link>
            <Link to="/bras">BRAS</Link>
            <Link to="/panties">PANTIES</Link>
            <Link to="/sets">SETS</Link>
            <Link to="/swimwear">SWIMWEAR</Link>
            <Link to="/sleepwear">SLEEPWEAR</Link>
            <Link to="/home-linen">HOME LINEN</Link>
            <Link to="/individual-tailoring">INDIVIDUAL TAILORING</Link>
          </nav>
        </div>
      </div>

      {/* Випадаюче меню */}
      {menuVisible && (
        <div className="menu-container" role="dialog" aria-modal="true">
          <div className="menu-content">
            <button className="close-button" onClick={closeMenu} aria-label="Close Menu">
              ✕
            </button>
            <ul>
              {[
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
              ].map((item, index) => (
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
