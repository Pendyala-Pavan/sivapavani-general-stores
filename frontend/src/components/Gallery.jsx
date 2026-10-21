import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import './Gallery.css';

function Gallery({ galleryImages, products, isOpen, onClose }) {
  const displayCards = galleryImages && galleryImages.length > 0
    ? galleryImages.map(img => ({ image: img.image, name: 'Gallery Image' }))
    : products.filter(p => p.image);

  if (!isOpen || displayCards.length === 0) return null;

  const productCards = displayCards;

  return (
    <div className="gallery-overlay" onClick={onClose}>
      <div className="gallery-modal" onClick={(e) => e.stopPropagation()}>
        <button className="gallery-close" onClick={onClose}>
          <X size={28} />
        </button>

        <div className="gallery-cascade">
          <h2 className="gallery-title">Our Products</h2>

          <div className="cards-container">
            {productCards.map((product, index) => (
              <div
                key={product._id}
                className="product-card-gallery"
                style={{
                  '--card-index': index,
                  '--total-cards': productCards.length,
                }}
              >
                <div className="card-inner">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="card-image"
                  />
                  {product.price && (
                    <div className="card-info">
                      <h3 className="card-name">{product.name}</h3>
                      <p className="card-unit">{product.unit}</p>
                      <div className="card-price-section">
                        <span className="card-price">₹{product.price.toFixed(2)}</span>
                        {product.discount > 0 && (
                          <span className="card-discount">{product.discount}% OFF</span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="gallery-footer">
            <p>Swipe or scroll to explore our collection</p>
            <span className="card-count">{productCards.length} Products</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Gallery;
