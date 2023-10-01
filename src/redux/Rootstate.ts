import { combineReducers } from '@reduxjs/toolkit';
import bookReducer from './slice/bookSlice';

const rootReducer = combineReducers({
  books: bookReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
