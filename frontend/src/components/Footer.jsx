import React from 'react';
import { MapPin, Phone, Mail, Star } from 'lucide-react';
import './Footer.css';

function Footer({ reviews = [], storeSettings = {} }) {
  const reviewsToShow = reviews;

  const settings = {
    name: 'Siva Pavani',
    address: 'LP Road, Darsi, Andhra Pradesh, India',
    phone: '9966621294',
    email: 'contact@sivapavani.com',
    hours: 'Monday - Sunday: 7:00 AM - 10:00 PM',
    instagram: '',
    youtube: '',
    ...storeSettings,
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Reviews Section */}
        {reviewsToShow.length > 0 && (
          <div className="footer-section reviews-section">
            <h3>Customer Reviews</h3>
            <div className="reviews-grid">
              {reviewsToShow.map((review, idx) => (
                <div key={review._id || idx} className="review-card">
                  <div className="review-stars">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={14} fill="#fbbf24" color="#fbbf24" />
                    ))}
                  </div>
                  <p className="review-text">"{review.text}"</p>
                  <p className="review-name">- {review.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Store Info Section */}
        <div className="footer-section store-info-section">
          <h3>Visit Our Store</h3>
          <div className="store-info">
            <div className="info-item">
              <MapPin size={20} />
              <div>
                <p className="info-label">Address</p>
                <p className="info-value">{settings.address}</p>
              </div>
            </div>
            <div className="info-item">
              <Phone size={20} />
              <div>
                <p className="info-label">Phone</p>
                <a href={`tel:${settings.phone}`} className="info-value">{settings.phone}</a>
              </div>
            </div>
            <div className="info-item">
              <Mail size={20} />
              <div>
                <p className="info-label">Email</p>
                <a href={`mailto:${settings.email}`} className="info-value">{settings.email}</a>
              </div>
            </div>
          </div>

          <div className="store-hours">
            <h4>Opening Hours</h4>
            <p>{settings.hours}</p>
          </div>

          {(settings.instagram || settings.youtube) && (
            <div className="social-links">
              {settings.instagram && (
                <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="social-btn instagram">
                  📷 Instagram
                </a>
              )}
              {settings.youtube && (
                <a href={settings.youtube} target="_blank" rel="noopener noreferrer" className="social-btn youtube">
                  ▶️ YouTube
                </a>
              )}
            </div>
          )}
        </div>

        {/* About Section */}
        <div className="footer-section about-section">
          <h3>About {settings.name}</h3>
          <p>Your trusted neighborhood general store providing quality products at the best prices. We serve our community with fresh groceries, daily essentials, and premium products.</p>
          <div className="footer-badges">
            <div className="badge">✓ Quality Guaranteed</div>
            <div className="badge">✓ Best Prices</div>
            <div className="badge">✓ Fast Service</div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 {settings.name} General Stores. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
