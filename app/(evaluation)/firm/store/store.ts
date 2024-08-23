import { configureStore } from '@reduxjs/toolkit';
import evaluationReducer from './evaluation/evaluationSlice';

const firmStore = configureStore({
  reducer: {
    evaluation: evaluationReducer
  },
});

export type RootState = ReturnType<typeof firmStore.getState>;
export type FirmDispatch = typeof firmStore.dispatch;

export default firmStore;
