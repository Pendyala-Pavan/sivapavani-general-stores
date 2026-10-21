from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId
import jwt
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# Configuration
MONGO_URI = os.getenv('MONGO_URI', 'mongodb://localhost:27017')
DB_NAME = 'siva_pavani_store'
SECRET_KEY = os.getenv('SECRET_KEY', 'your-secret-key-change-in-production')

# MongoDB Connection
try:
    client = MongoClient(MONGO_URI)
    db = client[DB_NAME]
    print(f"✓ Connected to MongoDB: {DB_NAME}")
except Exception as e:
    print(f"✗ MongoDB Connection Error: {e}")

# Collections
products_collection = db['products']
categories_collection = db['categories']
admin_collection = db['admins']
orders_collection = db['orders']

# Helper Functions
def token_required(f):
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'error': 'Token is missing'}), 401

        try:
            token = token.split(' ')[1]
            data = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
            request.admin_id = data['admin_id']
        except:
            return jsonify({'error': 'Invalid token'}), 401

        return f(*args, **kwargs)
    decorated.__name__ = f.__name__
    return decorated

def serialize_doc(doc):
    """Convert MongoDB document to JSON"""
    if doc is None:
        return None
    doc['_id'] = str(doc['_id'])
    return doc

# Routes

# Health Check
@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok', 'message': 'Server is running'})

# Admin Routes
@app.route('/api/admin/login', methods=['POST'])
def admin_login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    # Simple authentication (in production, use proper hashing)
    if email == 'admin@sivapavani.com' and password == 'admin123':
        token = jwt.encode(
            {'admin_id': 'admin_1', 'exp': datetime.utcnow() + timedelta(days=7)},
            SECRET_KEY,
            algorithm='HS256'
        )
        return jsonify({'token': token, 'message': 'Login successful'})

    return jsonify({'error': 'Invalid credentials'}), 401

# Products Routes
@app.route('/api/products', methods=['GET'])
def get_products():
    try:
        products = list(products_collection.find().sort('_id', -1))
        return jsonify([serialize_doc(p) for p in products])
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/products', methods=['POST'])
@token_required
def create_product():
    try:
        data = request.json

        new_product = {
            'name': data.get('name'),
            'category': data.get('category'),
            'description': data.get('description', ''),
            'unit': data.get('unit'),
            'price': float(data.get('price', 0)),
            'created_at': datetime.utcnow(),
            'updated_at': datetime.utcnow(),
        }

        result = products_collection.insert_one(new_product)
        new_product['_id'] = str(result.inserted_id)

        return jsonify(new_product), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/products/<product_id>', methods=['GET'])
def get_product(product_id):
    try:
        product = products_collection.find_one({'_id': ObjectId(product_id)})
        if not product:
            return jsonify({'error': 'Product not found'}), 404
        return jsonify(serialize_doc(product))
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/products/<product_id>', methods=['PATCH'])
@token_required
def update_product(product_id):
    try:
        data = request.json

        update_data = {
            'updated_at': datetime.utcnow(),
        }

        if 'name' in data:
            update_data['name'] = data['name']
        if 'category' in data:
            update_data['category'] = data['category']
        if 'description' in data:
            update_data['description'] = data['description']
        if 'unit' in data:
            update_data['unit'] = data['unit']
        if 'price' in data:
            update_data['price'] = float(data['price'])

        result = products_collection.find_one_and_update(
            {'_id': ObjectId(product_id)},
            {'$set': update_data},
            return_document=True
        )

        if not result:
            return jsonify({'error': 'Product not found'}), 404

        return jsonify(serialize_doc(result))
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/products/<product_id>', methods=['DELETE'])
@token_required
def delete_product(product_id):
    try:
        result = products_collection.delete_one({'_id': ObjectId(product_id)})

        if result.deleted_count == 0:
            return jsonify({'error': 'Product not found'}), 404

        return jsonify({'message': 'Product deleted successfully'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Categories Routes
@app.route('/api/categories', methods=['GET'])
def get_categories():
    try:
        categories = list(categories_collection.find())
        return jsonify([c.get('name') for c in categories])
    except:
        # Return default categories
        default = [
            'Cooking Essentials', 'Dairy & Breakfast', 'Home Care',
            'Personal Care', 'Pulses & Dals', 'Rice & Grains',
            'Snacks', 'Spices', 'Tea & Coffee'
        ]
        return jsonify(default)

@app.route('/api/categories', methods=['POST'])
@token_required
def add_category():
    try:
        data = request.json
        category = {'name': data.get('name')}

        result = categories_collection.insert_one(category)
        return jsonify({'_id': str(result.inserted_id), **category}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Orders Routes (for storing orders when customers call)
@app.route('/api/orders', methods=['POST'])
def create_order():
    try:
        data = request.json

        order = {
            'items': data.get('items', []),
            'total': float(data.get('total', 0)),
            'customer_phone': data.get('customer_phone', ''),
            'customer_name': data.get('customer_name', ''),
            'notes': data.get('notes', ''),
            'status': 'pending',
            'created_at': datetime.utcnow(),
        }

        result = orders_collection.insert_one(order)
        return jsonify({'_id': str(result.inserted_id), **order}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/orders', methods=['GET'])
@token_required
def get_orders():
    try:
        orders = list(orders_collection.find().sort('created_at', -1))
        return jsonify([serialize_doc(o) for o in orders])
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Initialize Database with Sample Data
def init_db():
    """Initialize database with default categories and sample products"""

    # Insert default categories if not exist
    default_categories = [
        'Cooking Essentials', 'Dairy & Breakfast', 'Home Care',
        'Personal Care', 'Pulses & Dals', 'Rice & Grains',
        'Snacks', 'Spices', 'Tea & Coffee'
    ]

    for cat in default_categories:
        categories_collection.update_one(
            {'name': cat},
            {'$set': {'name': cat}},
            upsert=True
        )

    # Insert sample products if collection is empty
    if products_collection.count_documents({}) == 0:
        sample_products = [
            {
                'name': 'Groundnut Oil',
                'category': 'Cooking Essentials',
                'description': 'Traditional peanut oil',
                'unit': 'Per 1 L',
                'price': 190,
                'created_at': datetime.utcnow(),
                'updated_at': datetime.utcnow(),
            },
            {
                'name': 'Iodized Salt',
                'category': 'Cooking Essentials',
                'description': 'Everyday cooking salt',
                'unit': 'Per 1 kg',
                'price': 22,
                'created_at': datetime.utcnow(),
                'updated_at': datetime.utcnow(),
            },
            {
                'name': 'Sugar',
                'category': 'Cooking Essentials',
                'description': 'Fine white sugar',
                'unit': 'Per 1 kg',
                'price': 46,
                'created_at': datetime.utcnow(),
                'updated_at': datetime.utcnow(),
            },
            {
                'name': 'Sunflower Oil',
                'category': 'Cooking Essentials',
                'description': 'Cooking oil',
                'unit': 'Per 1 L',
                'price': 158,
                'created_at': datetime.utcnow(),
                'updated_at': datetime.utcnow(),
            },
            {
                'name': 'Milk',
                'category': 'Dairy & Breakfast',
                'description': 'Fresh milk',
                'unit': 'Per 1 L',
                'price': 50,
                'created_at': datetime.utcnow(),
                'updated_at': datetime.utcnow(),
            },
            {
                'name': 'Curd',
                'category': 'Dairy & Breakfast',
                'description': 'Fresh yogurt',
                'unit': 'Per 400g',
                'price': 45,
                'created_at': datetime.utcnow(),
                'updated_at': datetime.utcnow(),
            },
        ]

        products_collection.insert_many(sample_products)
        print(f"✓ Inserted {len(sample_products)} sample products")

@app.before_request
def setup():
    init_db()

# Error Handlers
@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Endpoint not found'}), 404

@app.errorhandler(500)
def server_error(error):
    return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    db_status = 'Connected' if db is not None else 'Not Connected'
    print("""
    ╔════════════════════════════════════════════════════════════╗
    ║   Siva Pavani General Store - Backend Server              ║
    ║   Running on: http://localhost:5000                       ║
    ║   MongoDB: {}           ║
    ║   API Docs: http://localhost:5000/api/health              ║
    ╚════════════════════════════════════════════════════════════╝
    """.format(db_status))

    app.run(debug=True, host='0.0.0.0', port=5000)
