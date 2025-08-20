import axios from 'axios';

const API_URL = '/api/enrollments/';

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

// Enroll in a course
const enrollInCourse = async (courseId) => {
  const response = await api.post(API_URL + 'enroll', { courseId });
  return response.data;
};

// Get user enrollments
const getEnrollments = async () => {
  const response = await api.get(API_URL);
  return response.data;
};

// Complete a lesson
const completeLesson = async (enrollmentId, lessonId) => {
  const response = await api.put(API_URL + enrollmentId + '/lessons/' + lessonId + '/complete');
  return response.data;
};

// Get enrollment progress
const getEnrollmentProgress = async (enrollmentId) => {
  const response = await api.get(API_URL + enrollmentId + '/progress');
  return response.data;
};

const enrollmentService = {
  enrollInCourse,
  getEnrollments,
  completeLesson,
  getEnrollmentProgress,
};

export default enrollmentService; 