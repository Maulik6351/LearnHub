import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import enrollmentService from './enrollmentService';

const initialState = {
  enrollments: [],
  enrollment: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Get user enrollments
export const getEnrollments = createAsyncThunk(
  'enrollments/getEnrollments',
  async (_, thunkAPI) => {
    try {
      return await enrollmentService.getEnrollments();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Enroll in course
export const enrollInCourse = createAsyncThunk(
  'enrollments/enrollInCourse',
  async (courseId, thunkAPI) => {
    try {
      return await enrollmentService.enrollInCourse(courseId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Complete lesson
export const completeLesson = createAsyncThunk(
  'enrollments/completeLesson',
  async ({ enrollmentId, lessonId }, thunkAPI) => {
    try {
      return await enrollmentService.completeLesson(enrollmentId, lessonId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get enrollment progress
export const getEnrollmentProgress = createAsyncThunk(
  'enrollments/getEnrollmentProgress',
  async (enrollmentId, thunkAPI) => {
    try {
      return await enrollmentService.getEnrollmentProgress(enrollmentId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const enrollmentSlice = createSlice({
  name: 'enrollments',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEnrollments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEnrollments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.enrollments = action.payload;
      })
      .addCase(getEnrollments.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(enrollInCourse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(enrollInCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.enrollments.push(action.payload);
      })
      .addCase(enrollInCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(completeLesson.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(completeLesson.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.enrollments = state.enrollments.map((enrollment) =>
          enrollment._id === action.payload._id ? action.payload : enrollment
        );
      })
      .addCase(completeLesson.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getEnrollmentProgress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEnrollmentProgress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.enrollment = action.payload;
      })
      .addCase(getEnrollmentProgress.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = enrollmentSlice.actions;
export default enrollmentSlice.reducer; 