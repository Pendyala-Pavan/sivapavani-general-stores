import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, Wand2, Upload, Star } from 'lucide-react';
import './AdminDashboard.css';

function AdminDashboard({ token, products: initialProducts, onSaveProducts, reviews: initialReviews, onSaveReviews, storeSettings: initialSettings, onSaveStoreSettings, heroContent: initialHero, onSaveHeroContent, galleryImages: initialGallery, onSaveGalleryImages }) {
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState(initialProducts || []);
  const [reviews, setReviews] = useState(initialReviews || []);
  const [storeSettings, setStoreSettings] = useState(initialSettings || {});
  const [heroContent, setHeroContent] = useState(initialHero || {});
  const [galleryImages, setGalleryImages] = useState(initialGallery || []);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    unit: '',
    price: '',
    discount: '',
    stock: '',
    benefits: '',
    image: '',
  });

  const [reviewForm, setReviewForm] = useState({ name: '', rating: 5, text: '' });
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [editingReviewId, setEditingReviewId] = useState(null);

  const generateBenefits = () => {
    const benefitsMap = {
      'Oil': ['✓ Pure & Traditional', '✓ Rich in Natural Oils', '✓ Perfect for Cooking'],
      'Salt': ['✓ Iodized for Health', '✓ Fine Quality', '✓ Anti-Caking'],
      'Sugar': ['✓ Pure & Refined', '✓ Sweet Perfection', '✓ Daily Essential'],
      'Milk': ['✓ Fresh Daily', '✓ Nutritious & Healthy', '✓ Best Quality'],
      'Curd': ['✓ Fresh & Creamy', '✓ Rich in Probiotics', '✓ Homemade Taste'],
      'Soap': ['✓ Powerful Clean', '✓ Gentle on Hands', '✓ Long-lasting'],
      'Detergent': ['✓ Deep Clean', '✓ Eco-friendly', '✓ Fresh Fragrance'],
    };

    let generated = ['✓ Fresh & Quality Guaranteed', '✓ Best Price in Market', '✓ Fast Delivery'];

    for (const [key, benefits] of Object.entries(benefitsMap)) {
      if (formData.name.includes(key) || formData.description.includes(key)) {
        generated = benefits;
        break;
      }
    }

    setFormData({ ...formData, benefits: generated.join('\n') });
  };

  const categories = [
    'Cooking Essentials', 'Dairy & Breakfast', 'Home Care', 'Personal Care',
    'Pulses & Dals', 'Rice & Grains', 'Snacks', 'Spices', 'Tea & Coffee',
  ];

  // Product Functions
  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.category || !formData.unit || !formData.price) {
      alert('Please fill all required fields');
      return;
    }

    let updatedProducts;
    if (editingId) {
      updatedProducts = products.map(p => p._id === editingId
        ? { ...formData, _id: editingId, price: parseFloat(formData.price), discount: parseFloat(formData.discount) || 0, stock: parseInt(formData.stock) || 0 }
        : p
      );
    } else {
      updatedProducts = [...products, {
        ...formData,
        _id: Date.now().toString(),
        price: parseFloat(formData.price),
        discount: parseFloat(formData.discount) || 0,
        stock: parseInt(formData.stock) || 0,
      }];
    }
    setProducts(updatedProducts);
    onSaveProducts(updatedProducts);
    resetForm();
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Delete this product?')) {
      const updatedProducts = products.filter(p => p._id !== id);
      setProducts(updatedProducts);
      onSaveProducts(updatedProducts);
    }
  };

  const handleEditProduct = (product) => {
    setFormData({
      name: product.name,
      category: product.category,
      description: product.description,
      unit: product.unit,
      price: product.price,
      discount: product.discount || 0,
      stock: product.stock || 0,
      benefits: product.benefits || '',
      image: product.image || '',
    });
    setEditingId(product._id);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({ name: '', category: '', description: '', unit: '', price: '', discount: '', stock: '', benefits: '', image: '' });
    setEditingId(null);
    setShowForm(false);
  };

  // Review Functions
  const handleAddReview = (e) => {
    e.preventDefault();
    if (!reviewForm.name || !reviewForm.text) {
      alert('Please fill all fields');
      return;
    }

    let updatedReviews;
    if (editingReviewId) {
      updatedReviews = reviews.map(r => r._id === editingReviewId
        ? { ...reviewForm, _id: editingReviewId, rating: parseInt(reviewForm.rating) }
        : r
      );
    } else {
      updatedReviews = [...reviews, {
        ...reviewForm,
        _id: Date.now().toString(),
        rating: parseInt(reviewForm.rating),
      }];
    }
    setReviews(updatedReviews);
    onSaveReviews(updatedReviews);
    resetReviewForm();
  };

  const handleDeleteReview = (id) => {
    if (window.confirm('Delete this review?')) {
      const updatedReviews = reviews.filter(r => r._id !== id);
      setReviews(updatedReviews);
      onSaveReviews(updatedReviews);
    }
  };

  const handleEditReview = (review) => {
    setReviewForm({ name: review.name, rating: review.rating, text: review.text });
    setEditingReviewId(review._id);
    setShowReviewForm(true);
  };

  const resetReviewForm = () => {
    setReviewForm({ name: '', rating: 5, text: '' });
    setEditingReviewId(null);
    setShowReviewForm(false);
  };

  // Store Settings Functions
  const handleSaveSettings = (e) => {
    e.preventDefault();
    onSaveStoreSettings(storeSettings);
    alert('Store settings saved successfully!');
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
      </div>

      <div className="admin-tabs">
        <button
          className={`tab-btn ${activeTab === 'hero' ? 'active' : ''}`}
          onClick={() => setActiveTab('hero')}
        >
          🎬 Hero Section
        </button>
        <button
          className={`tab-btn ${activeTab === 'gallery' ? 'active' : ''}`}
          onClick={() => setActiveTab('gallery')}
        >
          🖼️ Gallery Images
        </button>
        <button
          className={`tab-btn ${activeTab === 'products' ? 'active' : ''}`}
          onClick={() => setActiveTab('products')}
        >
          📦 Products
        </button>
        <button
          className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
          onClick={() => setActiveTab('reviews')}
        >
          ⭐ Reviews
        </button>
        <button
          className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          ⚙️ Store Settings
        </button>
      </div>

      {/* GALLERY IMAGES TAB */}
      {activeTab === 'gallery' && (
        <div className="tab-content">
          <div className="admin-header-secondary">
            <h2>Gallery Images</h2>
            <button
              className="btn btn-primary"
              onClick={() => {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = 'image/*';
                input.onchange = (e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      const newImage = {
                        _id: Date.now().toString(),
                        image: reader.result,
                      };
                      const updated = [...galleryImages, newImage];
                      setGalleryImages(updated);
                      onSaveGalleryImages(updated);
                    };
                    reader.readAsDataURL(file);
                  }
                };
                input.click();
              }}
            >
              <Upload size={18} />
              Add Gallery Image
            </button>
          </div>

          <div className="gallery-grid">
            {galleryImages.length === 0 ? (
              <div className="empty-state">
                <p>No gallery images yet. Add your first image!</p>
              </div>
            ) : (
              galleryImages.map((img) => (
                <div key={img._id} className="gallery-item">
                  <img src={img.image} alt="Gallery" />
                  <button
                    className="btn-icon delete"
                    onClick={() => {
                      const updated = galleryImages.filter(i => i._id !== img._id);
                      setGalleryImages(updated);
                      onSaveGalleryImages(updated);
                    }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* HERO TAB */}
      {activeTab === 'hero' && (
        <div className="tab-content">
          <div className="admin-header-secondary">
            <h2>Hero Section</h2>
          </div>

          <div className="settings-card">
            <form onSubmit={(e) => {
              e.preventDefault();
              onSaveHeroContent(heroContent);
              alert('Hero section updated successfully!');
            }}>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={heroContent.title || ''}
                  onChange={(e) => setHeroContent({...heroContent, title: e.target.value})}
                  placeholder="e.g., Siva Pavani"
                />
              </div>

              <div className="form-group">
                <label>Subtitle</label>
                <input
                  type="text"
                  value={heroContent.subtitle || ''}
                  onChange={(e) => setHeroContent({...heroContent, subtitle: e.target.value})}
                  placeholder="e.g., General Stores · Darsi"
                />
              </div>

              <div className="form-group">
                <label>Tagline</label>
                <input
                  type="text"
                  value={heroContent.tagline || ''}
                  onChange={(e) => setHeroContent({...heroContent, tagline: e.target.value})}
                  placeholder="e.g., Fresh Quality Products at Best Prices"
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={heroContent.description || ''}
                  onChange={(e) => setHeroContent({...heroContent, description: e.target.value})}
                  rows="3"
                  placeholder="Describe your store..."
                />
              </div>

              <div className="form-group">
                <label>Feature 1 Text</label>
                <input
                  type="text"
                  value={heroContent.features?.[0]?.text || ''}
                  onChange={(e) => {
                    const features = [...(heroContent.features || [])];
                    if (!features[0]) features[0] = { icon: '✓', text: '' };
                    features[0].text = e.target.value;
                    setHeroContent({...heroContent, features});
                  }}
                  placeholder="e.g., Fresh Products"
                />
              </div>

              <div className="form-group">
                <label>Feature 2 Text</label>
                <input
                  type="text"
                  value={heroContent.features?.[1]?.text || ''}
                  onChange={(e) => {
                    const features = [...(heroContent.features || [])];
                    if (!features[1]) features[1] = { icon: '✓', text: '' };
                    features[1].text = e.target.value;
                    setHeroContent({...heroContent, features});
                  }}
                  placeholder="e.g., Best Prices"
                />
              </div>

              <div className="form-group">
                <label>Feature 3 Text</label>
                <input
                  type="text"
                  value={heroContent.features?.[2]?.text || ''}
                  onChange={(e) => {
                    const features = [...(heroContent.features || [])];
                    if (!features[2]) features[2] = { icon: '✓', text: '' };
                    features[2].text = e.target.value;
                    setHeroContent({...heroContent, features});
                  }}
                  placeholder="e.g., Fast Delivery"
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-primary">💾 Save Hero Section</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PRODUCTS TAB */}
      {activeTab === 'products' && (
        <div className="tab-content">
          <div className="admin-header-secondary">
            <h2>Product Management</h2>
            <button className="btn btn-primary" onClick={() => { resetForm(); setShowForm(true); }}>
              <Plus size={18} />
              Add New Product
            </button>
          </div>

          {showForm && (
            <div className="form-modal">
              <div className="form-card">
                <div className="form-header">
                  <h2>{editingId ? 'Edit Product' : 'Add New Product'}</h2>
                  <button className="close-btn" onClick={resetForm}>
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleAddProduct}>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Product Name *</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Category *</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                        required
                      >
                        <option value="">Select Category</option>
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      rows="3"
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Unit *</label>
                      <input
                        type="text"
                        value={formData.unit}
                        onChange={(e) => setFormData({...formData, unit: e.target.value})}
                        required
                        placeholder="e.g., Per 1 L"
                      />
                    </div>
                    <div className="form-group">
                      <label>Price (₹) *</label>
                      <input
                        type="number"
                        value={formData.price}
                        onChange={(e) => setFormData({...formData, price: e.target.value})}
                        required
                        step="0.01"
                        min="0"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Discount (%) *</label>
                      <input
                        type="number"
                        value={formData.discount}
                        onChange={(e) => setFormData({...formData, discount: e.target.value})}
                        required
                        min="0"
                        max="100"
                        placeholder="0-100"
                      />
                    </div>
                    <div className="form-group">
                      <label>Stock Quantity *</label>
                      <input
                        type="number"
                        value={formData.stock}
                        onChange={(e) => setFormData({...formData, stock: e.target.value})}
                        required
                        min="0"
                        placeholder="Available items"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <label>Benefits (One per line)</label>
                      <button
                        type="button"
                        className="btn-ai"
                        onClick={generateBenefits}
                        title="Generate benefits with AI"
                      >
                        <Wand2 size={16} />
                        AI Generate
                      </button>
                    </div>
                    <textarea
                      value={formData.benefits}
                      onChange={(e) => setFormData({...formData, benefits: e.target.value})}
                      rows="4"
                      placeholder="✓ Fresh & Quality Guaranteed&#10;✓ Best Price in Market&#10;✓ Fast Delivery Available"
                    />
                  </div>

                  <div className="form-group">
                    <label>Product Image</label>
                    <div className="image-upload">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setFormData({...formData, image: reader.result});
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        id="image-input"
                        style={{ display: 'none' }}
                      />
                      <label htmlFor="image-input" className="upload-label">
                        <Upload size={20} />
                        Click to upload image
                      </label>
                      {formData.image && (
                        <div className="image-preview">
                          <img src={formData.image} alt="Preview" />
                          <button
                            type="button"
                            className="remove-image"
                            onClick={() => setFormData({...formData, image: ''})}
                          >
                            ✕
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="form-actions">
                    <button type="button" className="btn btn-secondary" onClick={resetForm}>Cancel</button>
                    <button type="submit" className="btn btn-primary">{editingId ? 'Update' : 'Add'} Product</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <div className="products-table-container">
            <table className="products-table">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Discount</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product._id}>
                    <td>
                      <div className="product-name-cell">
                        <div>{product.name}</div>
                        <small>{product.unit}</small>
                      </div>
                    </td>
                    <td>{product.category}</td>
                    <td className="price-cell">₹{product.price.toFixed(2)}</td>
                    <td>
                      <span className="discount-badge">{product.discount || 0}% OFF</span>
                    </td>
                    <td>
                      <span className={`stock-badge ${product.stock > 20 ? 'high' : product.stock > 5 ? 'medium' : 'low'}`}>
                        {product.stock || 0} units
                      </span>
                    </td>
                    <td className="actions-cell">
                      <button className="btn-icon edit" onClick={() => handleEditProduct(product)}>
                        <Edit2 size={16} />
                      </button>
                      <button className="btn-icon delete" onClick={() => handleDeleteProduct(product._id)}>
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {products.length === 0 && (
              <div className="empty-state">
                <p>No products found. Add your first product!</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* REVIEWS TAB */}
      {activeTab === 'reviews' && (
        <div className="tab-content">
          <div className="admin-header-secondary">
            <h2>Customer Reviews</h2>
            <button className="btn btn-primary" onClick={() => { resetReviewForm(); setShowReviewForm(true); }}>
              <Plus size={18} />
              Add Review
            </button>
          </div>

          {showReviewForm && (
            <div className="form-modal">
              <div className="form-card">
                <div className="form-header">
                  <h2>{editingReviewId ? 'Edit Review' : 'Add Review'}</h2>
                  <button className="close-btn" onClick={resetReviewForm}>
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleAddReview}>
                  <div className="form-group">
                    <label>Customer Name *</label>
                    <input
                      type="text"
                      value={reviewForm.name}
                      onChange={(e) => setReviewForm({...reviewForm, name: e.target.value})}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Rating *</label>
                    <select
                      value={reviewForm.rating}
                      onChange={(e) => setReviewForm({...reviewForm, rating: e.target.value})}
                      required
                    >
                      <option value="5">⭐⭐⭐⭐⭐ 5 Stars</option>
                      <option value="4">⭐⭐⭐⭐ 4 Stars</option>
                      <option value="3">⭐⭐⭐ 3 Stars</option>
                      <option value="2">⭐⭐ 2 Stars</option>
                      <option value="1">⭐ 1 Star</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Review Text *</label>
                    <textarea
                      value={reviewForm.text}
                      onChange={(e) => setReviewForm({...reviewForm, text: e.target.value})}
                      rows="4"
                      required
                      placeholder="What did the customer say about our store?"
                    />
                  </div>

                  <div className="form-actions">
                    <button type="button" className="btn btn-secondary" onClick={resetReviewForm}>Cancel</button>
                    <button type="submit" className="btn btn-primary">{editingReviewId ? 'Update' : 'Add'} Review</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <div className="reviews-container">
            {reviews.length === 0 ? (
              <div className="empty-state">
                <p>No reviews yet. Add customer reviews!</p>
              </div>
            ) : (
              <div className="reviews-list">
                {reviews.map((review) => (
                  <div key={review._id} className="review-item">
                    <div className="review-header">
                      <div className="review-name-stars">
                        <h4>{review.name}</h4>
                        <div className="review-stars-display">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} size={14} fill="#fbbf24" color="#fbbf24" />
                          ))}
                        </div>
                      </div>
                      <div className="review-actions">
                        <button className="btn-icon edit" onClick={() => handleEditReview(review)}>
                          <Edit2 size={16} />
                        </button>
                        <button className="btn-icon delete" onClick={() => handleDeleteReview(review._id)}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <p className="review-text">{review.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* SETTINGS TAB */}
      {activeTab === 'settings' && (
        <div className="tab-content">
          <div className="admin-header-secondary">
            <h2>Store Settings</h2>
          </div>

          <div className="settings-card">
            <form onSubmit={handleSaveSettings}>
              <div className="form-row">
                <div className="form-group">
                  <label>Store Name</label>
                  <input
                    type="text"
                    value={storeSettings.name || ''}
                    onChange={(e) => setStoreSettings({...storeSettings, name: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    value={storeSettings.phone || ''}
                    onChange={(e) => setStoreSettings({...storeSettings, phone: e.target.value})}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={storeSettings.email || ''}
                  onChange={(e) => setStoreSettings({...storeSettings, email: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>Address</label>
                <textarea
                  value={storeSettings.address || ''}
                  onChange={(e) => setStoreSettings({...storeSettings, address: e.target.value})}
                  rows="2"
                />
              </div>

              <div className="form-group">
                <label>Opening Hours</label>
                <input
                  type="text"
                  value={storeSettings.hours || ''}
                  onChange={(e) => setStoreSettings({...storeSettings, hours: e.target.value})}
                  placeholder="e.g., Monday - Sunday: 7:00 AM - 10:00 PM"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Instagram URL</label>
                  <input
                    type="url"
                    value={storeSettings.instagram || ''}
                    onChange={(e) => setStoreSettings({...storeSettings, instagram: e.target.value})}
                    placeholder="https://instagram.com/..."
                  />
                </div>
                <div className="form-group">
                  <label>YouTube URL</label>
                  <input
                    type="url"
                    value={storeSettings.youtube || ''}
                    onChange={(e) => setStoreSettings({...storeSettings, youtube: e.target.value})}
                    placeholder="https://youtube.com/..."
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-primary">💾 Save Settings</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
