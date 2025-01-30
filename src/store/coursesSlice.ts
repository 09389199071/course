import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api/mockApi';
import { Course } from '../types';

export const fetchCourses = createAsyncThunk(
  'courses/fetchCourses',
  async () => {
    const response = await api.getCourses();
    return response;
  }
);

const coursesSlice = createSlice({
  name: 'courses',
  initialState: {
    items: [] as Course[],
    loading: false,
    error: null as string | null,
    filter: '',
    search: ''
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch courses';
      });
  },
});

export const { setFilter, setSearch } = coursesSlice.actions;
export default coursesSlice.reducer;