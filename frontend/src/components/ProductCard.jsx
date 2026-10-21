import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import './ProductCard.css';

function ProductCard({ product, isInCart, onAddToCart, onSelectProduct }) {
  const [isAdding, setIsAdding] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    setIsAdding(true);
    onAddToCart(product);
    setTimeout(() => setIsAdding(false), 500);
  };

  const getProductEmoji = () => {
    const emojiMap = {
      'Groundnut Oil': '🧴',
      'Iodized Salt': '🧂',
      'Sugar': '🍬',
      'Sunflower Oil': '🧴',
      'Milk': '🥛',
      'Curd': '🥣',
      'Dishwash Bar': '🧼',
      'Laundry Detergent': '🧺',
    };
    return emojiMap[product.name] || '📦';
  };

  const discount = product.discount || 0;

  return (
    <div
      className="product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelectProduct(product)}
    >
      <div className="product-image-container">
        <div className="product-image">
          {product.image ? (
            <img src={product.image} alt={product.name} className="product-img" />
          ) : (
            <span className="product-emoji">{getProductEmoji()}</span>
          )}
        </div>
        {discount > 0 && (
          <div className="discount-badge">{discount}% OFF</div>
        )}
        {isInCart && <div className="in-cart-badge">Added ✓</div>}
      </div>

      <div className="product-info">
        <p className="product-category">{product.category}</p>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <p className="product-unit">{product.unit}</p>
      </div>

      <div className="product-pricing">
        <div className="price-row">
          <span className="product-price">₹{product.price.toFixed(2)}</span>
          {discount > 0 && (
            <span className="original-price">₹{(product.price / (1 - discount / 100)).toFixed(2)}</span>
          )}
        </div>
      </div>

      <button
        className={`btn-add-quick ${isAdding ? 'adding' : ''}`}
        onClick={handleAddToCart}
        title="Add to cart"
      >
        <Plus size={20} />
      </button>
    </div>
  );
}

export default ProductCard;
