import { configureStore } from '@reduxjs/toolkit';
import coursesReducer from './coursesSlice';
import enrollmentsReducer from './enrollmentsSlice';

export const store = configureStore({
  reducer: {
    courses: coursesReducer,
    enrollments: enrollmentsReducer,
  },
});