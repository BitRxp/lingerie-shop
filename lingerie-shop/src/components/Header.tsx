import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../store/FavoritesContext';
import { useCart } from '../store/CartContext';
import '../styles.scss'; // Стилі

const Header: React.FC = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const { favorites } = useFavorites();
  const { cart } = useCart();

  // Функція для відкриття/закриття меню
  const toggleMenu = () => {
    setMenuVisible((prev) => !prev);
  };

  // Функція для закриття меню при натисканні на посилання
  const closeMenu = () => {
    setMenuVisible(false);
  };

  return (
    <header className="header">
      {/* Верхня частина */}
      <div className="header-top">
        <div className="container">
          <div className="header-left">
            <Link to="/">
              <img src="/images/LOGO.png" alt="Lingerie Logo" className="header-logo" />
            </Link>
            <button className="menu-button" onClick={toggleMenu}>
              <img src="/images/components-icon.png" alt="Menu Icon" className="menu-icon" />
              <span>Menu</span>
            </button>
          </div>
          <div className="header-right">
            <Link to="/search">
              <img src="/images/search-icon.png" alt="Search" />
            </Link>
            <Link to="/profile">
              <img src="/images/user-icon.png" alt="Profile" />
            </Link>
            <Link to="/favorites" className="favorite-icon">
              <img src="/images/favorite-icon.png" alt="Favorites" />
              {favorites.length > 0 && <span className="badge">{favorites.length}</span>}
            </Link>
            <Link to="/cart" className="cart-icon">
              <img src="/images/cart-icon.png" alt="Cart" />
              {cart.length > 0 && <span className="badge">{cart.length}</span>}
            </Link>
          </div>
        </div>
      </div>

      {/* Горизонтальне меню */}
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
        <div className="menu-container">
          <div className="menu-content">
            <button className="close-button" onClick={toggleMenu}>✕</button>
            <ul>
              <li><Link to="/catalog" onClick={closeMenu}>Catalog</Link></li>
              <li><Link to="/new" onClick={closeMenu}>New Arrivals</Link></li>
              <li><Link to="/sale" onClick={closeMenu}>Sale</Link></li>
              <li><Link to="/bras" onClick={closeMenu}>Bras</Link></li>
              <li><Link to="/panties" onClick={closeMenu}>Panties</Link></li>
              <li><Link to="/swimwear" onClick={closeMenu}>Swimwear</Link></li>
              <li><Link to="/sleepwear" onClick={closeMenu}>Sleepwear</Link></li>
              <li><Link to="/home-linen" onClick={closeMenu}>Home Linen</Link></li>
              <li><Link to="/individual-tailoring" onClick={closeMenu}>Individual Tailoring</Link></li>
              <li><Link to="/sign-in" onClick={closeMenu}>Sign In</Link></li>
              <li><Link to="/sign-up" onClick={closeMenu}>Sign Up</Link></li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
