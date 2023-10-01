import { configureStore } from '@reduxjs/toolkit';
import bookReducer from './slice/bookSlice';

const store = configureStore({
  reducer: {
    books: bookReducer,
  },
});

export default store;
