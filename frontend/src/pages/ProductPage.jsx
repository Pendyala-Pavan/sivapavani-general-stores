import React, { useState, useEffect } from 'react';
import { Search, ChevronRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import Hero from '../components/Hero';
import GallerySection from '../components/GallerySection';
import './ProductPage.css';

const DUMMY_PRODUCTS = [
  { _id: '1', name: 'Groundnut Oil', category: 'Cooking Essentials', description: 'Pure & Traditional', unit: 'Per 1 L', price: 190 },
  { _id: '2', name: 'Iodized Salt', category: 'Cooking Essentials', description: 'Fine cooking salt', unit: 'Per 1 kg', price: 22 },
  { _id: '3', name: 'Sugar', category: 'Cooking Essentials', description: 'Refined white sugar', unit: 'Per 1 kg', price: 46 },
  { _id: '4', name: 'Milk', category: 'Dairy & Breakfast', description: 'Fresh & healthy', unit: 'Per 1 L', price: 50 },
  { _id: '5', name: 'Curd', category: 'Dairy & Breakfast', description: 'Fresh yogurt daily', unit: 'Per 400g', price: 45 },
  { _id: '6', name: 'Dishwash Bar', category: 'Home Care', description: 'Powerful clean', unit: 'Per 1 bar', price: 12 },
  { _id: '7', name: 'Sunflower Oil', category: 'Cooking Essentials', description: 'Light & healthy', unit: 'Per 1 L', price: 158 },
  { _id: '8', name: 'Rice', category: 'Rice & Grains', description: 'Basmati rice', unit: 'Per 1 kg', price: 80 },
];

const DUMMY_CATEGORIES = ['All Items', 'Cooking Essentials', 'Dairy & Breakfast', 'Home Care', 'Personal Care', 'Pulses & Dals', 'Rice & Grains', 'Snacks', 'Spices', 'Tea & Coffee'];

const BANNERS = [
  { id: 1, title: 'Fresh Daily Delivery', subtitle: 'Get Fresh Groceries at Your Door', emoji: '📦' },
  { id: 2, title: 'Best Prices', subtitle: 'Save up to 30% on everyday items', emoji: '💰' },
  { id: 3, title: 'Quality Guaranteed', subtitle: 'Premium quality products', emoji: '✨' },
];

function ProductPage({ cart, onAddToCart, onSelectProduct, products: initialProducts, heroContent, galleryImages }) {
  const [products, setProducts] = useState(initialProducts || DUMMY_PRODUCTS);
  const [categories, setCategories] = useState(DUMMY_CATEGORIES);
  const [selectedCategory, setSelectedCategory] = useState('All Items');
  const [searchQuery, setSearchQuery] = useState('');
  const [bannerIndex, setBannerIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    if (initialProducts) {
      setProducts(initialProducts);
    }
  }, [initialProducts]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % BANNERS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredProducts = products.filter(product => {
    const matchCategory = selectedCategory === 'All Items' || product.category === selectedCategory;
    const matchSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const newlyAdded = [...products].sort((a, b) => parseInt(b._id) - parseInt(a._id)).slice(0, 6);
  const trending = [...products].filter(p => p.discount > 0).sort((a, b) => b.discount - a.discount).slice(0, 6);

  const cartProductIds = cart.map(item => item._id);

  return (
    <>
      <Hero heroContent={heroContent} />
      <div className="page-container">
      <div className="banner-carousel">
        {BANNERS.map((banner, index) => (
          <div
            key={banner.id}
            className={`banner ${index === bannerIndex ? 'active' : ''}`}
          >
            <div className="banner-content">
              <span className="banner-emoji">{banner.emoji}</span>
              <div className="banner-text">
                <h2>{banner.title}</h2>
                <p>{banner.subtitle}</p>
              </div>
              <ChevronRight size={24} />
            </div>
          </div>
        ))}
        <div className="banner-dots">
          {BANNERS.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === bannerIndex ? 'active' : ''}`}
              onClick={() => setBannerIndex(index)}
            />
          ))}
        </div>
      </div>

      {trending.length > 0 && (
        <div className="trending-section">
          <h2 className="section-title">🔥 Trending Today</h2>
          <div className="trending-scroll">
            {trending.map((product) => {
              const originalPrice = product.price / (1 - product.discount / 100);
              return (
                <div key={product._id} className="trending-card">
                  <div className="trending-image" onClick={() => onSelectProduct(product)}>
                    {product.image ? (
                      <img src={product.image} alt={product.name} />
                    ) : (
                      <span className="trending-emoji">📦</span>
                    )}
                    {product.discount > 0 && (
                      <span className="trending-discount">{product.discount}% OFF</span>
                    )}
                  </div>
                  <div className="trending-time">⏱️ 4 MINS</div>
                  <div className="trending-info" onClick={() => onSelectProduct(product)}>
                    <h3>{product.name}</h3>
                    <p className="trending-unit">{product.unit}</p>
                  </div>
                  <div className="trending-pricing">
                    <div className="price-section">
                      <span className="trending-price">₹{product.price.toFixed(2)}</span>
                      {product.discount > 0 && (
                        <span className="trending-original">₹{originalPrice.toFixed(2)}</span>
                      )}
                    </div>
                    <button
                      className="trending-add-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(product);
                      }}
                      title="Add to cart"
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {newlyAdded.length > 0 && (
        <div className="newly-added-section">
          <h2 className="section-title">✨ Newly Added</h2>
          <div className="newly-added-scroll">
            {newlyAdded.map((product) => {
              const originalPrice = product.discount > 0 ? product.price / (1 - product.discount / 100) : product.price;
              return (
                <div key={product._id} className="newly-added-card">
                  <div className="new-image" onClick={() => onSelectProduct(product)}>
                    {product.image ? (
                      <img src={product.image} alt={product.name} />
                    ) : (
                      <span className="new-emoji">📦</span>
                    )}
                    <div className="new-badge">NEW</div>
                  </div>
                  <div className="new-time">⏱️ 4 MINS</div>
                  <div className="new-info" onClick={() => onSelectProduct(product)}>
                    <h3>{product.name}</h3>
                    <p className="new-unit">{product.unit}</p>
                  </div>
                  <div className="new-pricing">
                    <div className="price-section">
                      <span className="new-price">₹{product.price.toFixed(2)}</span>
                      {product.discount > 0 && (
                        <span className="new-original">₹{originalPrice.toFixed(2)}</span>
                      )}
                    </div>
                    <button
                      className="new-add-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(product);
                      }}
                      title="Add to cart"
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="products-header">
        <div className="search-section">
          <div className="search-box">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search rice, oil, snacks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="categories-info">{filteredProducts.length} items</div>
      </div>

      <div className="categories-section">
        <div className="categories-scroll">
          {categories.map((category) => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="no-results">
          <div className="no-results-icon">🔍</div>
          <h3>No products found</h3>
        </div>
      ) : (
        <div className="products-grid">
          {filteredProducts.map((product, index) => (
            <div
              key={product._id}
              className="product-card-wrapper"
              style={{
                animation: `fadeInUp 0.5s ease ${index * 0.05}s both`,
              }}
            >
              <ProductCard
                product={product}
                isInCart={cartProductIds.includes(product._id)}
                onAddToCart={onAddToCart}
                onSelectProduct={onSelectProduct}
              />
            </div>
          ))}
        </div>
      )}

      <GallerySection galleryImages={galleryImages} products={products} />
    </div>
    </>
  );
}

export default ProductPage;
