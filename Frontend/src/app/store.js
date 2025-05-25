import { configureStore } from '@reduxjs/toolkit';
import testimonialReducer from '../features/testimonials/testimonialSlice';

export const store = configureStore({
  reducer: {
    testimonials: testimonialReducer,
  },
});
