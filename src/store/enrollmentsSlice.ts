import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api/mockApi';
import { Enrollment } from '../types';

export const createEnrollment = createAsyncThunk(
  'enrollments/createEnrollment',
  async ({ userId, courseId }: { userId: number; courseId: number }) => {
    const response = await api.createEnrollment(userId, courseId);
    return response;
  }
);

export const fetchEnrollments = createAsyncThunk(
  'enrollments/fetchEnrollments',
  async (userId: number) => {
    const response = await api.getEnrollments(userId);
    return response;
  }
);

const enrollmentsSlice = createSlice({
  name: 'enrollments',
  initialState: {
    items: [] as Enrollment[],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createEnrollment.pending, (state) => {
        state.loading = true;
      })
      .addCase(createEnrollment.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(createEnrollment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create enrollment';
      })
      .addCase(fetchEnrollments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEnrollments.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchEnrollments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch enrollments';
      });
  },
});

export default enrollmentsSlice.reducer;