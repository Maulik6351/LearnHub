import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import courseService from './courseService';

const initialState = {
  courses: [],
  course: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Get all courses
export const getCourses = createAsyncThunk(
  'courses/getAll',
  async (filters, thunkAPI) => {
    try {
      return await courseService.getCourses(filters);
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

// Get single course
export const getCourse = createAsyncThunk(
  'courses/getOne',
  async (id, thunkAPI) => {
    try {
      return await courseService.getCourse(id);
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

// Create course
export const createCourse = createAsyncThunk(
  'courses/create',
  async (courseData, thunkAPI) => {
    try {
      return await courseService.createCourse(courseData);
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

// Update course
export const updateCourse = createAsyncThunk(
  'courses/update',
  async ({ id, courseData }, thunkAPI) => {
    try {
      return await courseService.updateCourse(id, courseData);
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

// Delete course
export const deleteCourse = createAsyncThunk(
  'courses/delete',
  async (id, thunkAPI) => {
    try {
      return await courseService.deleteCourse(id);
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

// Rate course
export const rateCourse = createAsyncThunk(
  'courses/rate',
  async ({ id, ratingData }, thunkAPI) => {
    try {
      return await courseService.rateCourse(id, ratingData);
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

export const courseSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCourses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCourses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.courses = action.payload;
      })
      .addCase(getCourses.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getCourse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.course = action.payload;
      })
      .addCase(getCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createCourse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.courses.push(action.payload);
      })
      .addCase(createCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateCourse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.courses = state.courses.map((course) =>
          course._id === action.payload._id ? action.payload : course
        );
      })
      .addCase(updateCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteCourse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.courses = state.courses.filter(
          (course) => course._id !== action.payload.id
        );
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(rateCourse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(rateCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.course = action.payload;
      })
      .addCase(rateCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = courseSlice.actions;
export default courseSlice.reducer; 