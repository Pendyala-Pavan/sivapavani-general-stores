# API Documentation - Siva Pavani Kirana Store

Base URL: `http://localhost:5000/api`

---

## Health Check

### Get Server Status
```
GET /health
```

**Response:**
```json
{
  "status": "ok",
  "message": "Server is running"
}
```

---

## Admin Routes

### Admin Login
```
POST /admin/login
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "admin@sivapavani.com",
  "password": "admin123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "message": "Login successful"
}
```

**Error Response:**
```json
{
  "error": "Invalid credentials"
}
```

---

## Products Routes

### Get All Products
```
GET /products
```

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Groundnut Oil",
    "category": "Cooking Essentials",
    "description": "Traditional peanut oil",
    "unit": "Per 1 L",
    "price": 190,
    "created_at": "2024-10-20T10:30:00Z",
    "updated_at": "2024-10-20T10:30:00Z"
  },
  ...
]
```

---

### Create Product
```
POST /products
Authorization: Bearer {token}
Content-Type: application/json
```

**Required Headers:**
- `Authorization: Bearer <jwt_token>`

**Request Body:**
```json
{
  "name": "Sunflower Oil",
  "category": "Cooking Essentials",
  "description": "Pure sunflower oil",
  "unit": "Per 1 L",
  "price": 158
}
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "name": "Sunflower Oil",
  "category": "Cooking Essentials",
  "description": "Pure sunflower oil",
  "unit": "Per 1 L",
  "price": 158,
  "created_at": "2024-10-20T11:00:00Z",
  "updated_at": "2024-10-20T11:00:00Z"
}
```

---

### Get Single Product
```
GET /products/{id}
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Groundnut Oil",
  "category": "Cooking Essentials",
  "description": "Traditional peanut oil",
  "unit": "Per 1 L",
  "price": 190,
  "created_at": "2024-10-20T10:30:00Z",
  "updated_at": "2024-10-20T10:30:00Z"
}
```

---

### Update Product
```
PATCH /products/{id}
Authorization: Bearer {token}
Content-Type: application/json
```

**Request Body (all fields optional):**
```json
{
  "name": "Premium Groundnut Oil",
  "price": 210,
  "description": "Extra virgin peanut oil"
}
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Premium Groundnut Oil",
  "category": "Cooking Essentials",
  "description": "Extra virgin peanut oil",
  "unit": "Per 1 L",
  "price": 210,
  "created_at": "2024-10-20T10:30:00Z",
  "updated_at": "2024-10-20T11:30:00Z"
}
```

---

### Delete Product
```
DELETE /products/{id}
Authorization: Bearer {token}
```

**Response:**
```json
{
  "message": "Product deleted successfully"
}
```

---

## Categories Routes

### Get All Categories
```
GET /categories
```

**Response:**
```json
[
  "Cooking Essentials",
  "Dairy & Breakfast",
  "Home Care",
  "Personal Care",
  "Pulses & Dals",
  "Rice & Grains",
  "Snacks",
  "Spices",
  "Tea & Coffee"
]
```

---

### Add Category
```
POST /categories
Authorization: Bearer {token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Beverages"
}
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439013",
  "name": "Beverages"
}
```

---

## Orders Routes

### Create Order
```
POST /orders
Content-Type: application/json
```

**Request Body:**
```json
{
  "items": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Groundnut Oil",
      "price": 190,
      "quantity": 2
    }
  ],
  "total": 380,
  "customer_phone": "9966621294",
  "customer_name": "Raj Kumar",
  "notes": "Please deliver by evening"
}
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439014",
  "items": [...],
  "total": 380,
  "customer_phone": "9966621294",
  "customer_name": "Raj Kumar",
  "notes": "Please deliver by evening",
  "status": "pending",
  "created_at": "2024-10-20T12:00:00Z"
}
```

---

### Get All Orders
```
GET /orders
Authorization: Bearer {token}
```

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439014",
    "items": [...],
    "total": 380,
    "customer_phone": "9966621294",
    "customer_name": "Raj Kumar",
    "status": "pending",
    "created_at": "2024-10-20T12:00:00Z"
  },
  ...
]
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "Invalid input data"
}
```

### 401 Unauthorized
```json
{
  "error": "Token is missing"
}
```
or
```json
{
  "error": "Invalid token"
}
```

### 404 Not Found
```json
{
  "error": "Product not found"
}
```

### 500 Server Error
```json
{
  "error": "Internal server error"
}
```

---

## Authentication

All admin endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer {jwt_token}
```

**How to get token:**
1. Call `/admin/login` with credentials
2. Get token from response
3. Include in all subsequent requests

**Token Format:**
- Type: JWT
- Algorithm: HS256
- Expiry: 7 days

---

## Sample cURL Requests

### Get Products
```bash
curl http://localhost:5000/api/products
```

### Login
```bash
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@sivapavani.com","password":"admin123"}'
```

### Create Product
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Rice",
    "category": "Rice & Grains",
    "description": "Basmati rice",
    "unit": "Per 1 kg",
    "price": 80
  }'
```

### Update Product
```bash
curl -X PATCH http://localhost:5000/api/products/507f1f77bcf86cd799439011 \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"price": 200}'
```

### Delete Product
```bash
curl -X DELETE http://localhost:5000/api/products/507f1f77bcf86cd799439011 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Rate Limiting

No rate limiting is currently implemented. In production, consider adding:
- Request throttling
- IP-based limits
- User-based limits

---

## CORS Configuration

CORS is enabled for all origins. In production, restrict to:
```python
CORS(app, resources={r"/api/*": {"origins": ["https://yourdomain.com"]}})
```

---

## Database Schema

### Products Collection
```json
{
  "_id": ObjectId,
  "name": String,
  "category": String,
  "description": String,
  "unit": String,
  "price": Number,
  "created_at": DateTime,
  "updated_at": DateTime
}
```

### Categories Collection
```json
{
  "_id": ObjectId,
  "name": String
}
```

### Orders Collection
```json
{
  "_id": ObjectId,
  "items": Array,
  "total": Number,
  "customer_phone": String,
  "customer_name": String,
  "notes": String,
  "status": String,
  "created_at": DateTime
}
```

---

## API Versioning

Current version: **v1** (no version prefix in URL)

Future: `/api/v2/products`

---

## Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 404 | Not Found |
| 500 | Server Error |

---

## Testing

### Using Postman
1. Import this API documentation
2. Set base URL: `http://localhost:5000/api`
3. Test endpoints
4. Set token in Authorization header for protected routes

### Using Python Requests
```python
import requests

BASE_URL = "http://localhost:5000/api"

# Get products
response = requests.get(f"{BASE_URL}/products")
print(response.json())

# Login
response = requests.post(
    f"{BASE_URL}/admin/login",
    json={"email": "admin@sivapavani.com", "password": "admin123"}
)
token = response.json()["token"]

# Create product
headers = {"Authorization": f"Bearer {token}"}
response = requests.post(
    f"{BASE_URL}/products",
    headers=headers,
    json={
        "name": "Rice",
        "category": "Rice & Grains",
        "description": "Basmati rice",
        "unit": "Per 1 kg",
        "price": 80
    }
)
print(response.json())
```

---

**Last Updated:** 2026-10-20
