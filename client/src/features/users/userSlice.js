import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userService from './userService';

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Get user profile
export const getProfile = createAsyncThunk(
  'users/getProfile',
  async (_, thunkAPI) => {
    try {
      return await userService.getProfile();
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

// Update user profile
export const updateProfile = createAsyncThunk(
  'users/updateProfile',
  async (userData, thunkAPI) => {
    try {
      return await userService.updateProfile(userData);
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

// Get enrolled courses
export const getEnrolledCourses = createAsyncThunk(
  'users/getEnrolledCourses',
  async (_, thunkAPI) => {
    try {
      return await userService.getEnrolledCourses();
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

// Get wishlist
export const getWishlist = createAsyncThunk(
  'users/getWishlist',
  async (_, thunkAPI) => {
    try {
      return await userService.getWishlist();
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

// Add to wishlist
export const addToWishlist = createAsyncThunk(
  'users/addToWishlist',
  async (courseId, thunkAPI) => {
    try {
      return await userService.addToWishlist(courseId);
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

// Remove from wishlist
export const removeFromWishlist = createAsyncThunk(
  'users/removeFromWishlist',
  async (courseId, thunkAPI) => {
    try {
      return await userService.removeFromWishlist(courseId);
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

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getEnrolledCourses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEnrolledCourses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.enrolledCourses = action.payload;
      })
      .addCase(getEnrolledCourses.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getWishlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.wishlist = action.payload;
      })
      .addCase(getWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.isSuccess = true;
        // Update wishlist if it exists
        if (state.wishlist) {
          state.wishlist.push(action.payload);
        }
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.isSuccess = true;
        // Remove from wishlist if it exists
        if (state.wishlist) {
          state.wishlist = state.wishlist.filter(
            (item) => item._id !== action.payload.courseId
          );
        }
      });
  },
});

export const { reset } = userSlice.actions;
export default userSlice.reducer; 