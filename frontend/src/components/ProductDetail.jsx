import React, { useState } from 'react';
import { X, Plus, Minus, Heart, ShoppingCart } from 'lucide-react';
import './ProductDetail.css';

function ProductDetail({ product, onClose, onAddToCart, isInCart, isFavorite, onToggleFavorite }) {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart(product);
    }
    setQuantity(1);
  };

  const getProductImage = () => {
    const imageMap = {
      'Groundnut Oil': '🧴',
      'Iodized Salt': '🧂',
      'Sugar': '🍬',
      'Sunflower Oil': '🧴',
      'Milk': '🥛',
      'Curd': '🥣',
      'Dishwash Bar': '🧼',
      'Laundry Detergent': '🧺',
    };
    return imageMap[product.name] || '📦';
  };

  return (
    <div className="product-detail-overlay" onClick={onClose}>
      <div className="product-detail-modal" onClick={(e) => e.stopPropagation()}>
        <button className="detail-close-btn" onClick={onClose}>
          <X size={28} />
        </button>

        <div className="detail-container">
          <div className="detail-image-section">
            <div className="detail-image-wrapper">
              <div className="detail-image">
                {product.image ? (
                  <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }} />
                ) : (
                  <span className="product-emoji">{getProductImage()}</span>
                )}
              </div>
              <button
                className={`favorite-btn ${isFavorite ? 'active' : ''}`}
                onClick={() => onToggleFavorite(product._id)}
                title="Add to wishlist"
              >
                <Heart size={24} fill={isFavorite ? 'currentColor' : 'none'} />
              </button>
            </div>
          </div>

          <div className="detail-info-section">
            <div className="detail-category">{product.category}</div>
            <h1 className="detail-name">{product.name}</h1>
            <p className="detail-description">{product.description}</p>

            <div className="detail-specs">
              <div className="spec-item">
                <span className="spec-label">Unit:</span>
                <span className="spec-value">{product.unit}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Availability:</span>
                <span className="spec-value" style={{ color: '#10b981' }}>In Stock</span>
              </div>
            </div>

            <div className="detail-price">
              ₹{product.price.toFixed(2)}
            </div>

            <div className="detail-quantity-section">
              <div className="quantity-control">
                <button
                  className="qty-btn"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus size={18} />
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="qty-input"
                />
                <button
                  className="qty-btn"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>

            <div className="detail-actions">
              <button
                className="btn-add-detail"
                onClick={handleAddToCart}
              >
                <ShoppingCart size={20} />
                {isInCart ? 'Add More to Cart' : 'Add to Cart'}
              </button>
              <button
                className="btn-buy-now"
                onClick={() => {
                  handleAddToCart();
                  onClose();
                }}
              >
                Buy Now
              </button>
            </div>

            <div className="detail-benefits">
              <h3>Benefits</h3>
              <ul>
                {product.benefits ? product.benefits.split('\n').map((benefit, idx) => (
                  <li key={idx}>{benefit.trim()}</li>
                )) : (
                  <>
                    <li>✓ Fresh & Quality Guaranteed</li>
                    <li>✓ Best Price in Market</li>
                    <li>✓ Fast Delivery Available</li>
                    <li>✓ Easy Returns & Exchanges</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
