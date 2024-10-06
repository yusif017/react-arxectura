import { configureStore } from '@reduxjs/toolkit';
import languageReducer from '../features/languageSlice';
import authReducer from '../features/authSlice';
import basketReducer from '../features/basketSlice';



const store = configureStore({
  reducer: {
    language: languageReducer,
    auth:authReducer,
    basket:basketReducer

  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
