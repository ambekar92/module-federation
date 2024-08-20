import { configureStore } from '@reduxjs/toolkit';
import evaluationReducer from './evaluationSlice';

const applicationStore = configureStore({
  reducer: {
    evaluation: evaluationReducer,
  },
});

export default applicationStore;
export type RootState = ReturnType<typeof applicationStore.getState>;
export type EvaluationDispatch = typeof applicationStore.dispatch;
