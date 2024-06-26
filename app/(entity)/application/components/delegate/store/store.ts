import { configureStore } from '@reduxjs/toolkit';
import formReducer from './formSlice';

const store = configureStore({
  reducer: {
    form: formReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type FormDispatch = typeof store.dispatch;
