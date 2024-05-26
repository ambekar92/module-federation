import { configureStore } from '@reduxjs/toolkit';
import applicationReducer from './applicationSlice';

const applicationStore = configureStore({
  reducer: {
    application: applicationReducer,
  },
});

export default applicationStore;
export type RootState = ReturnType<typeof applicationStore.getState>;
export type ApplicationDispatch = typeof applicationStore.dispatch;
