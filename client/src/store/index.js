import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import courseReducer from '../features/courses/courseSlice';
import userReducer from '../features/users/userSlice';
import enrollmentReducer from '../features/enrollments/enrollmentSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    courses: courseReducer,
    users: userReducer,
    enrollments: enrollmentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store; 