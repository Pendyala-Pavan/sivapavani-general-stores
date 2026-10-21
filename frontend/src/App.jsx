import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Gallery from './components/Gallery';
import ProductPage from './pages/ProductPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import Cart from './components/Cart';
import ProductDetail from './components/ProductDetail';

function App() {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('products');
    return saved ? JSON.parse(saved) : [
      { _id: '1', name: 'Chana Dal', category: 'Pulses & Dals', description: 'Yellow lentils', unit: 'Per 1 kg', price: 85, discount: 8, stock: 45, benefits: '✓ High in Protein\n✓ Rich in Fiber\n✓ Easy to Digest', image: '' },
      { _id: '2', name: 'Moong Dal', category: 'Pulses & Dals', description: 'Green lentils', unit: 'Per 1 kg', price: 95, discount: 10, stock: 40, benefits: '✓ Protein Rich\n✓ Cooling Properties\n✓ Quick Cooking', image: '' },
      { _id: '3', name: 'Toor Dal', category: 'Pulses & Dals', description: 'Pigeon peas', unit: 'Per 1 kg', price: 110, discount: 12, stock: 35, benefits: '✓ High Protein\n✓ Rich in Nutrients\n✓ Traditional Choice', image: '' },
      { _id: '4', name: 'Urad Dal', category: 'Pulses & Dals', description: 'Black gram', unit: 'Per 1 kg', price: 120, discount: 15, stock: 30, benefits: '✓ Protein Loaded\n✓ Rich in Iron\n✓ Great for Dosa', image: '' },
      { _id: '5', name: 'Masoor Dal', category: 'Pulses & Dals', description: 'Red lentils', unit: 'Per 1 kg', price: 75, discount: 10, stock: 50, benefits: '✓ Quick Cooking\n✓ High Protein\n✓ Budget Friendly', image: '' },
      { _id: '6', name: 'Basmati Rice', category: 'Rice & Grains', description: 'Premium white rice', unit: 'Per 5 kg', price: 450, discount: 8, stock: 60, benefits: '✓ Long Grain\n✓ Aromatic\n✓ Premium Quality', image: '' },
      { _id: '7', name: 'Brown Rice', category: 'Rice & Grains', description: 'Healthy brown rice', unit: 'Per 2 kg', price: 180, discount: 5, stock: 35, benefits: '✓ High Fiber\n✓ Nutritious\n✓ Wholesome', image: '' },
      { _id: '8', name: 'Groundnut Oil', category: 'Cooking Essentials', description: 'Pure groundnut oil', unit: 'Per 1 L', price: 190, discount: 13, stock: 50, benefits: '✓ Pure & Traditional\n✓ Rich in Vitamin E\n✓ Best for Cooking', image: '' },
      { _id: '9', name: 'Sunflower Oil', category: 'Cooking Essentials', description: 'Light & healthy oil', unit: 'Per 1 L', price: 158, discount: 10, stock: 55, benefits: '✓ Light Texture\n✓ High Smoke Point\n✓ Heart Healthy', image: '' },
      { _id: '10', name: 'Mustard Oil', category: 'Cooking Essentials', description: 'Traditional mustard oil', unit: 'Per 1 L', price: 210, discount: 12, stock: 40, benefits: '✓ Authentic Taste\n✓ Traditional Use\n✓ Antimicrobial', image: '' },
      { _id: '11', name: 'Coconut Oil', category: 'Cooking Essentials', description: 'Pure coconut oil', unit: 'Per 500 ml', price: 280, discount: 15, stock: 25, benefits: '✓ Pure & Natural\n✓ Virgin Quality\n✓ Versatile Use', image: '' },
      { _id: '12', name: 'Sugar', category: 'Cooking Essentials', description: 'Refined white sugar', unit: 'Per 1 kg', price: 46, discount: 8, stock: 80, benefits: '✓ Pure White\n✓ Fine Crystals\n✓ Best Quality', image: '' },
      { _id: '13', name: 'Jaggery', category: 'Cooking Essentials', description: 'Organic jaggery', unit: 'Per 500 g', price: 85, discount: 10, stock: 30, benefits: '✓ Organic & Natural\n✓ No Chemicals\n✓ Traditional Sweetener', image: '' },
      { _id: '14', name: 'Iodized Salt', category: 'Cooking Essentials', description: 'Fine cooking salt', unit: 'Per 1 kg', price: 22, discount: 13, stock: 100, benefits: '✓ Iodized for Health\n✓ Fine Quality\n✓ Anti-Caking', image: '' },
      { _id: '15', name: 'Tea Leaves', category: 'Tea & Coffee', description: 'Premium loose tea', unit: 'Per 250 g', price: 180, discount: 10, stock: 45, benefits: '✓ Premium Blend\n✓ Rich Flavor\n✓ Fresh Leaves', image: '' },
      { _id: '16', name: 'Coffee Powder', category: 'Tea & Coffee', description: 'Roasted coffee powder', unit: 'Per 200 g', price: 220, discount: 12, stock: 35, benefits: '✓ Rich Aroma\n✓ Freshly Roasted\n✓ Strong Brew', image: '' },
      { _id: '17', name: 'Turmeric Powder', category: 'Spices', description: 'Pure turmeric powder', unit: 'Per 100 g', price: 65, discount: 10, stock: 55, benefits: '✓ Pure & Organic\n✓ Anti-inflammatory\n✓ Golden Color', image: '' },
      { _id: '18', name: 'Chili Powder', category: 'Spices', description: 'Red chili powder', unit: 'Per 100 g', price: 55, discount: 8, stock: 50, benefits: '✓ Spicy Heat\n✓ Natural Color\n✓ Authentic Taste', image: '' },
      { _id: '19', name: 'Coriander Powder', category: 'Spices', description: 'Ground coriander', unit: 'Per 100 g', price: 45, discount: 10, stock: 60, benefits: '✓ Aromatic Spice\n✓ Pure Ground\n✓ Best for Curries', image: '' },
      { _id: '20', name: 'Garam Masala', category: 'Spices', description: 'Spice blend powder', unit: 'Per 100 g', price: 75, discount: 12, stock: 40, benefits: '✓ Authentic Blend\n✓ Aromatic Mix\n✓ Traditional Recipe', image: '' },
    ];
  });

  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem('reviews');
    return saved ? JSON.parse(saved) : [
      { _id: '1', name: 'Ramesh Kumar', rating: 5, text: 'Fresh products, best quality! Highly recommended.' },
      { _id: '2', name: 'Priya Singh', rating: 5, text: 'Great service and fast delivery. Love shopping here!' },
      { _id: '3', name: 'Vijay Reddy', rating: 5, text: 'Best prices in town. Very reliable store.' },
      { _id: '4', name: 'Sneha Patel', rating: 5, text: 'Excellent quality products and friendly staff.' },
    ];
  });

  const [storeSettings, setStoreSettings] = useState(() => {
    const saved = localStorage.getItem('storeSettings');
    return saved ? JSON.parse(saved) : {
      name: 'Siva Pavani',
      address: 'LP Road, Darsi, Andhra Pradesh, India',
      phone: '9966621294',
      email: 'contact@sivapavani.com',
      hours: 'Monday - Sunday: 7:00 AM - 10:00 PM',
      instagram: '',
      youtube: '',
    };
  });

  const [heroContent, setHeroContent] = useState(() => {
    const saved = localStorage.getItem('heroContent');
    return saved ? JSON.parse(saved) : {
      title: 'Siva Pavani',
      subtitle: 'General Stores · Darsi',
      tagline: 'Fresh Quality Products at Best Prices',
      description: 'Experience the convenience of online shopping\nfor all your daily grocery needs',
      features: [
        { icon: '✓', text: 'Fresh Products' },
        { icon: '✓', text: 'Best Prices' },
        { icon: '✓', text: 'Fast Delivery' },
      ],
    };
  });

  const [galleryImages, setGalleryImages] = useState(() => {
    const saved = localStorage.getItem('galleryImages');
    return saved ? JSON.parse(saved) : [];
  });

  const saveProducts = (updatedProducts) => {
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  const saveReviews = (updatedReviews) => {
    setReviews(updatedReviews);
    localStorage.setItem('reviews', JSON.stringify(updatedReviews));
  };

  const saveStoreSettings = (updatedSettings) => {
    setStoreSettings(updatedSettings);
    localStorage.setItem('storeSettings', JSON.stringify(updatedSettings));
  };

  const saveHeroContent = (updatedHero) => {
    setHeroContent(updatedHero);
    localStorage.setItem('heroContent', JSON.stringify(updatedHero));
  };

  const saveGalleryImages = (updatedGallery) => {
    setGalleryImages(updatedGallery);
    localStorage.setItem('galleryImages', JSON.stringify(updatedGallery));
  };

  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState(JSON.parse(localStorage.getItem('wishlist')) || []);
  const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken') || null);
  const [showCart, setShowCart] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showGallery, setShowGallery] = useState(false);

  const addToCart = (product) => {
    const existing = cart.find(item => item._id === product._id);
    if (existing) {
      setCart(cart.map(item =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    setShowCart(true);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item._id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item =>
        item._id === productId ? { ...item, quantity } : item
      ));
    }
  };

  const clearCart = () => {
    setCart([]);
    setShowCart(false);
  };

  const toggleWishlist = (productId) => {
    const updated = wishlist.includes(productId)
      ? wishlist.filter(id => id !== productId)
      : [...wishlist, productId];
    setWishlist(updated);
    localStorage.setItem('wishlist', JSON.stringify(updated));
  };

  return (
    <BrowserRouter>
      <div className="app">
        <Header
          cartCount={cart.length}
          onCartClick={() => setShowCart(!showCart)}
          adminToken={adminToken}
          onAdminLogout={() => {
            setAdminToken(null);
            localStorage.removeItem('adminToken');
          }}
        />

        {showCart && (
          <Cart
            items={cart}
            onRemove={removeFromCart}
            onQuantityChange={updateQuantity}
            onClose={() => setShowCart(false)}
            onClear={clearCart}
          />
        )}

        {selectedProduct && (
          <ProductDetail
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onAddToCart={addToCart}
            isInCart={cart.some(item => item._id === selectedProduct._id)}
            isFavorite={wishlist.includes(selectedProduct._id)}
            onToggleFavorite={toggleWishlist}
          />
        )}

        <Gallery
          galleryImages={galleryImages}
          products={products}
          isOpen={showGallery}
          onClose={() => setShowGallery(false)}
        />

        <Routes>
          <Route
            path="/"
            element={
              <ProductPage
                cart={cart}
                onAddToCart={addToCart}
                onSelectProduct={setSelectedProduct}
                products={products}
                heroContent={heroContent}
                galleryImages={galleryImages}
              />
            }
          />
          <Route
            path="/admin/login"
            element={<AdminLogin onLoginSuccess={setAdminToken} />}
          />
          <Route
            path="/admin/dashboard"
            element={
              adminToken ? (
                <AdminDashboard
                  token={adminToken}
                  products={products}
                  onSaveProducts={saveProducts}
                  reviews={reviews}
                  onSaveReviews={saveReviews}
                  storeSettings={storeSettings}
                  onSaveStoreSettings={saveStoreSettings}
                  heroContent={heroContent}
                  onSaveHeroContent={saveHeroContent}
                  galleryImages={galleryImages}
                  onSaveGalleryImages={saveGalleryImages}
                />
              ) : (
                <AdminLogin onLoginSuccess={setAdminToken} />
              )
            }
          />
        </Routes>

        <Footer reviews={reviews} storeSettings={storeSettings} />
      </div>
    </BrowserRouter>
  );
}

export default App;
