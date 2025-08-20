import axios from 'axios';

const API_URL = '/api/courses/';

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

// Get all courses
const getCourses = async (filters = {}) => {
  const params = new URLSearchParams();
  
  if (filters.category) params.append('category', filters.category);
  if (filters.search) params.append('search', filters.search);
  if (filters.page) params.append('page', filters.page);
  if (filters.limit) params.append('limit', filters.limit);
  
  const response = await api.get(API_URL + '?' + params.toString());
  return response.data;
};

// Get single course
const getCourse = async (courseId) => {
  const response = await api.get(API_URL + courseId);
  return response.data;
};

// Create new course
const createCourse = async (courseData) => {
  const response = await api.post(API_URL, courseData);
  return response.data;
};

// Update course
const updateCourse = async (courseId, courseData) => {
  const response = await api.put(API_URL + courseId, courseData);
  return response.data;
};

// Delete course
const deleteCourse = async (courseId) => {
  const response = await api.delete(API_URL + courseId);
  return response.data;
};

// Rate course
const rateCourse = async (courseId, ratingData) => {
  const response = await api.post(API_URL + courseId + '/rate', ratingData);
  return response.data;
};

const courseService = {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  rateCourse,
};

export default courseService; 