// API Configuration for Dev/Production

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ||
  (typeof window !== 'undefined' && window.location.hostname === 'localhost'
    ? 'http://localhost:5000'
    : 'https://sivapavani-general-stores-1.onrender.com');

export const API_ENDPOINTS = {
  // Admin
  ADMIN_LOGIN: `${API_BASE_URL}/api/admin/login`,
  ADMIN_SETUP: `${API_BASE_URL}/api/admin/setup`,

  // Products
  GET_PRODUCTS: `${API_BASE_URL}/api/products`,
  CREATE_PRODUCT: `${API_BASE_URL}/api/products`,
  UPDATE_PRODUCT: (id) => `${API_BASE_URL}/api/products/${id}`,
  DELETE_PRODUCT: (id) => `${API_BASE_URL}/api/products/${id}`,

  // Categories
  GET_CATEGORIES: `${API_BASE_URL}/api/categories`,
  CREATE_CATEGORY: `${API_BASE_URL}/api/categories`,

  // Orders
  CREATE_ORDER: `${API_BASE_URL}/api/orders`,
  GET_ORDERS: `${API_BASE_URL}/api/orders`,

  // Health
  HEALTH: `${API_BASE_URL}/api/health`,
};

export default API_ENDPOINTS;
