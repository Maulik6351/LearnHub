import axios from 'axios';

const API_URL = '/api/users/';

// Create axios instance with interceptors
const api = axios.create({
  baseURL: 'http://localhost:5000',
});

// Request interceptor to add token to all requests
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Get user profile
const getProfile = async () => {
  const response = await api.get(API_URL + 'profile');
  return response.data;
};

// Update user profile
const updateProfile = async (userData) => {
  const response = await api.put(API_URL + 'profile', userData);
  return response.data;
};

// Get enrolled courses
const getEnrolledCourses = async () => {
  const response = await api.get(API_URL + 'enrolled-courses');
  return response.data;
};

// Get wishlist
const getWishlist = async () => {
  const response = await api.get(API_URL + 'wishlist');
  return response.data;
};

// Add to wishlist
const addToWishlist = async (courseId) => {
  const response = await api.post(API_URL + 'wishlist/' + courseId);
  return response.data;
};

// Remove from wishlist
const removeFromWishlist = async (courseId) => {
  const response = await api.delete(API_URL + 'wishlist/' + courseId);
  return response.data;
};

const userService = {
  getProfile,
  updateProfile,
  getEnrolledCourses,
  getWishlist,
  addToWishlist,
  removeFromWishlist,
};

export default userService; 