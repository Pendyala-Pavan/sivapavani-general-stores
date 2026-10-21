#!/usr/bin/env python3
"""
Setup script to create the production admin account
Run this once to initialize the admin user
"""

from pymongo import MongoClient
from werkzeug.security import generate_password_hash
from datetime import datetime
import os
from dotenv import load_dotenv

load_dotenv()

# MongoDB Connection
MONGO_URI = os.getenv('MONGO_URI', 'mongodb://localhost:27017')
DB_NAME = 'siva_pavani_store'

try:
    client = MongoClient(MONGO_URI)
    db = client[DB_NAME]
    admin_collection = db['admins']
    print(f"✓ Connected to MongoDB: {DB_NAME}")
except Exception as e:
    print(f"✗ MongoDB Connection Error: {e}")
    exit(1)

# Production Admin Credentials
ADMIN_EMAIL = 'pendelasiva@gmail.com'
ADMIN_PASSWORD = 'Siva@8055'

def create_admin():
    """Create production admin account"""

    # Check if admin already exists
    existing = admin_collection.find_one({'email': ADMIN_EMAIL})
    if existing:
        print(f"✗ Admin account '{ADMIN_EMAIL}' already exists!")
        return

    try:
        # Create admin with hashed password
        admin_doc = {
            'email': ADMIN_EMAIL,
            'password_hash': generate_password_hash(ADMIN_PASSWORD),
            'created_at': datetime.utcnow(),
            'role': 'admin',
            'status': 'active'
        }

        result = admin_collection.insert_one(admin_doc)
        print(f"✓ Admin account created successfully!")
        print(f"  Email: {ADMIN_EMAIL}")
        print(f"  Admin ID: {result.inserted_id}")
        print(f"\n🔐 Keep these credentials safe!")

    except Exception as e:
        print(f"✗ Error creating admin: {e}")

if __name__ == '__main__':
    print("""
    ╔════════════════════════════════════════════════════════════╗
    ║   Siva Pavani - Production Admin Setup                    ║
    ╚════════════════════════════════════════════════════════════╝
    """)

    create_admin()
