import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, LogOut, Settings, Search } from 'lucide-react';
import './Header.css';

function Header({ cartCount, onCartClick, adminToken, onAdminLogout }) {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${isVisible ? 'visible' : 'hidden'}`}>
      <div className="container header-content">
        <div className="logo-section">
          <div className="logo">SP</div>
          <div className="store-info">
            <h1>Siva Pavani</h1>
            <p className="tagline">GENERAL STORES · DARSI</p>
          </div>
        </div>

        <div className="header-search">
          <div className="search-box">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="header-actions">
          <div className="location">
            <span className="location-icon">📍</span>
            <span>LP Road, Darsi</span>
          </div>

          {adminToken ? (
            <div className="admin-menu">
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => navigate('/admin/dashboard')}
              >
                <Settings size={16} />
                Dashboard
              </button>
              <button
                className="btn btn-sm"
                onClick={() => {
                  onAdminLogout();
                  navigate('/');
                }}
                style={{ background: '#dc3545' }}
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          ) : (
            <button
              className="admin-link"
              onClick={() => navigate('/admin/login')}
            >
              Admin
            </button>
          )}

          <button className="cart-button" onClick={onCartClick}>
            <ShoppingCart size={24} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
