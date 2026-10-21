import React, { useEffect, useState } from 'react';
import { X, Minus, Plus, Phone, Trash2, ShoppingCart } from 'lucide-react';
import './Cart.css';

function Cart({ items, onRemove, onQuantityChange, onClose, onClear }) {
  const [animatingId, setAnimatingId] = useState(null);
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="cart-overlay" onClick={onClose}>
      <div className="cart-panel" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2>Shopping Basket</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-icon">🛒</div>
            <p>Your basket is empty</p>
            <small>Start adding items from the store</small>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {items.map((item) => (
                <div key={item._id} className="cart-item">
                  <div className="item-details">
                    <h4>{item.name}</h4>
                    <p className="item-unit">{item.unit}</p>
                  </div>
                  <div className="item-quantity">
                    <button
                      className="qty-btn"
                      onClick={() => onQuantityChange(item._id, item.quantity - 1)}
                    >
                      <Minus size={16} />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="qty-btn"
                      onClick={() => onQuantityChange(item._id, item.quantity + 1)}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <div className="item-price">
                    <p>₹{(item.price * item.quantity).toFixed(2)}</p>
                    <button
                      className="remove-btn"
                      onClick={() => onRemove(item._id)}
                      title="Remove item"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Tax (approx)</span>
                <span>₹{(total * 0.05).toFixed(2)}</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>₹{(total * 1.05).toFixed(2)}</span>
              </div>
            </div>

            <div className="cart-actions">
              <a
                href="tel:9966621294"
                className="btn btn-primary btn-call"
              >
                <Phone size={18} />
                Call Siva to Place Order
              </a>
              <small className="order-note">
                📞 Your basket is a handy list. Call 9966621294 and Siva Prasad will confirm availability and your total
              </small>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
