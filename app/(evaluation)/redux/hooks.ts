import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, EvaluationDispatch } from './evaluationStore';

export const useEvaluationDispatch = () => useDispatch<EvaluationDispatch>();
export const useEvaluationSelector: TypedUseSelectorHook<RootState> = useSelector;
