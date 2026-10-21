# Quick Start Guide - Siva Pavani Kirana Store

## 🚀 Get Started in 5 Minutes

### Step 1: Install MongoDB (if not already installed)

**Windows:**
1. Download from https://www.mongodb.com/try/download/community
2. Install and start MongoDB Community Server
3. Run in terminal: `mongod`

**Mac (using Homebrew):**
```bash
brew install mongodb-community
brew services start mongodb-community
```

**Linux (Ubuntu):**
```bash
sudo apt-get install mongodb
sudo systemctl start mongodb
```

---

### Step 2: Setup Backend (Python Flask)

Open PowerShell/Terminal in the project folder:

```bash
# Navigate to backend
cd backend

# Create virtual environment (optional but recommended)
python -m venv venv
venv\Scripts\activate    # On Mac/Linux: source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start backend server
python app.py
```

✅ Backend will run on: **http://localhost:5000**

You should see:
```
╔════════════════════════════════════════════════════════════╗
║   Siva Pavani General Store - Backend Server              ║
║   Running on: http://localhost:5000                       ║
║   MongoDB: Connected                                      ║
╚════════════════════════════════════════════════════════════╝
```

---

### Step 3: Setup Frontend (React.js)

Open a **new terminal/PowerShell** in the project folder:

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start React development server
npm start
```

✅ Frontend will open automatically on: **http://localhost:3000**

---

## 🎯 Now You Can:

### 👥 Customer Features (No Login)
1. Open **http://localhost:3000**
2. Browse products by category
3. Search for items
4. Add items to cart
5. Click "Call Siva to Place Order" in checkout
6. Call **9966621294** to complete order

### 👨‍💼 Admin Features
1. Click **"Admin"** button in top right
2. Login with credentials:
   - Email: `admin@sivapavani.com`
   - Password: `admin123`
3. Add/Edit/Delete products
4. Manage prices and inventory

---

## 🛠 Important Ports

| Service | Port | URL |
|---------|------|-----|
| React Frontend | 3000 | http://localhost:3000 |
| Flask Backend | 5000 | http://localhost:5000 |
| MongoDB | 27017 | localhost |

---

## 🧪 Test the Application

### Test Products
The database comes pre-loaded with sample products:
- Groundnut Oil
- Iodized Salt
- Sugar
- Sunflower Oil
- Milk
- Curd
- And more...

### Add Custom Products
1. Go to Admin Dashboard
2. Click "Add New Product"
3. Fill in details:
   - Product Name
   - Category
   - Description
   - Unit (e.g., "Per 1 L")
   - Price

---

## 📱 Test on Mobile

### Test on mobile/tablet (same network):
1. Find your computer's IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
2. Open on mobile: `http://YOUR_IP:3000`
3. Everything works the same!

---

## ⚡ Quick Troubleshooting

### MongoDB not connecting?
```bash
# Check if MongoDB is running
mongod --version

# Windows: Start MongoDB Service
# Open Services app and start "MongoDB Server"

# Mac/Linux:
brew services start mongodb-community
```

### Port already in use?
```bash
# For Windows (PowerShell as Admin)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# For Mac/Linux
lsof -i :3000
kill -9 <PID>
```

### "npm: command not found"?
- Install Node.js from https://nodejs.org (LTS recommended)

### "Python: command not found"?
- Install Python from https://www.python.org

---

## 📚 Project Structure

```
website s/
├── frontend/          ← React app (PORT 3000)
├── backend/           ← Flask server (PORT 5000)
├── README.md          ← Full documentation
└── QUICKSTART.md      ← This file
```

---

## 🎨 Customize for Your Store

Edit these files to personalize:

**Frontend Header:**
- `frontend/src/components/Header.js` - Store name, logo

**Colors (Modern Green Theme):**
- `frontend/src/App.css` - Change CSS variables

**Owner Contact:**
- `frontend/src/components/Cart.js` - Phone number
- Currently: **9966621294**

**Admin Login:**
- `backend/app.py` - Line ~75 - Change email/password

---

## 🚢 Deploy to Internet

### Deploy Backend (Free Options)
- **Replit** (Easy, free, slow)
- **Render** (Good free tier)
- **Railway** (Better performance)
- **Heroku** (Was free, now paid)

### Deploy Frontend (Free Options)
- **Vercel** (Recommended for React)
- **Netlify** (Very easy)
- **GitHub Pages** (Simple)

---

## 📞 Need Help?

**Contact Store Owner:**
- 📞 Siva Prasad Pendela: **9966621294**
- 📍 LP Road, Darsi

**Common Issues:**
- MongoDB connection: Ensure `mongod` is running
- Port issues: Close other apps using 3000/5000
- Dependencies: Run `npm install` and `pip install -r requirements.txt` again

---

## ✨ Features Overview

| Feature | Customer | Admin |
|---------|----------|-------|
| Browse Products | ✅ | ✅ |
| Search | ✅ | ✅ |
| Add to Cart | ✅ | ❌ |
| Checkout | ✅ | ❌ |
| Add Products | ❌ | ✅ |
| Edit Products | ❌ | ✅ |
| Delete Products | ❌ | ✅ |
| Manage Prices | ❌ | ✅ |

---

**Happy Selling! 🎉**

---

**Last Updated:** 2026-10-20
