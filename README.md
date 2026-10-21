# Siva Pavani General Stores - Kirana Store Web Application

A modern, attractive web application for Siva Pavani General Stores with customer browsing and admin management features.

**Store Details:**
- 📍 **Name:** Siva Pavani General Stores
- 📍 **Address:** LP Road, Darsi
- 📞 **Owner:** Siva Prasad Pendela
- 📱 **Contact:** 9966621294

---

## Features

### 👥 Customer Side
- ✅ Browse products by category
- ✅ Search functionality
- ✅ Add products to shopping cart
- ✅ View cart with quantity management
- ✅ Checkout with phone number display
- ✅ Call owner to place order
- ✅ No login required

### 👨‍💼 Admin Side
- ✅ Secure login (email/password)
- ✅ Add new products
- ✅ Edit existing products
- ✅ Delete products
- ✅ Manage prices
- ✅ View product categories
- ✅ Product management dashboard

### 🎨 Design Features
- ✅ Modern, attractive UI
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Smooth animations
- ✅ Professional color scheme
- ✅ Intuitive navigation

---

## Tech Stack

- **Frontend:** React.js 18
- **Backend:** Python Flask
- **Database:** MongoDB
- **Styling:** CSS3 with modern animations
- **Icons:** Lucide React

---

## Project Structure

```
website s/
├── frontend/                    # React.js Frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.js
│   │   │   ├── Header.css
│   │   │   ├── Cart.js
│   │   │   ├── Cart.css
│   │   │   ├── ProductCard.js
│   │   │   └── ProductCard.css
│   │   ├── pages/
│   │   │   ├── ProductPage.js
│   │   │   ├── ProductPage.css
│   │   │   ├── AdminLogin.js
│   │   │   ├── AdminLogin.css
│   │   │   ├── AdminDashboard.js
│   │   │   └── AdminDashboard.css
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
│
├── backend/                     # Flask Backend
│   ├── app.py                   # Main Flask application
│   ├── requirements.txt         # Python dependencies
│   └── .env                     # Environment variables
│
└── README.md                    # This file
```

---

## Setup Instructions

### Prerequisites
- Node.js 16+ (for frontend)
- Python 3.8+ (for backend)
- MongoDB 4.0+ (installed and running)

### Backend Setup

1. **Install Python Dependencies:**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

2. **Configure Environment Variables:**
   Edit `.env` file:
   ```env
   MONGO_URI=mongodb://localhost:27017
   SECRET_KEY=your-secret-key
   ```

3. **Start MongoDB:**
   - **Windows:** 
     ```bash
     mongod
     ```
   - **Mac/Linux:**
     ```bash
     brew services start mongodb-community
     ```

4. **Run Flask Backend:**
   ```bash
   python app.py
   ```
   Backend will start on `http://localhost:5000`

### Frontend Setup

1. **Install Dependencies:**
   ```bash
   cd frontend
   npm install
   ```

2. **Start React Development Server:**
   ```bash
   npm start
   ```
   Frontend will open on `http://localhost:3000`

---

## API Endpoints

### Health Check
```
GET /api/health
```

### Products
```
GET    /api/products              # Get all products
POST   /api/products              # Create product (admin only)
GET    /api/products/<id>         # Get product by ID
PATCH  /api/products/<id>         # Update product (admin only)
DELETE /api/products/<id>         # Delete product (admin only)
```

### Categories
```
GET  /api/categories              # Get all categories
POST /api/categories              # Add category (admin only)
```

### Admin
```
POST /api/admin/login             # Admin login
```

### Orders
```
POST /api/orders                  # Create order
GET  /api/orders                  # Get all orders (admin only)
```

---

## Admin Credentials (Default)

```
Email:    admin@sivapavani.com
Password: admin123
```

**⚠️ Important:** Change credentials in production!

---

## Default Categories

- Cooking Essentials
- Dairy & Breakfast
- Home Care
- Personal Care
- Pulses & Dals
- Rice & Grains
- Snacks
- Spices
- Tea & Coffee

---

## Deployment

### Deploy Frontend (Vercel, Netlify)
```bash
npm run build
# Upload 'build' folder to hosting platform
```

### Deploy Backend (Heroku, AWS, DigitalOcean)
```bash
# Set MongoDB URI in environment variables
# Deploy using: `git push heroku main`
```

---

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod`
- Check MONGO_URI in `.env` file
- Verify MongoDB is accessible at `localhost:27017`

### CORS Errors
- Backend and Frontend should be running on different ports
- Backend on 5000, Frontend on 3000
- CORS is enabled in Flask app

### Port Already in Use
```bash
# Change port in app.py or package.json
# Frontend: PORT=3001 npm start
# Backend: python app.py  # Change port in app.run()
```

---

## Future Enhancements

- 🔐 Password hashing for admin authentication
- 💳 Online payment gateway integration (Razorpay, PhonePe)
- 📦 Order tracking
- 📊 Admin analytics dashboard
- 🔔 Push notifications
- 📱 Mobile app (React Native)
- 🌐 Multi-language support
- ⭐ Customer ratings & reviews

---

## Support & Contact

For issues or support:
- 📞 Call: 9966621294 (Siva Prasad Pendela)
- 📍 Visit: LP Road, Darsi

---

## License

This project is built for Siva Pavani General Stores. All rights reserved.

---

**Built with ❤️ for Siva Pavani General Stores**
