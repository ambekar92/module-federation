import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, FirmDispatch } from './store';

export const useFirmDispatch = () => useDispatch<FirmDispatch>();
export const useFirmSelector: TypedUseSelectorHook<RootState> = useSelector;

// useEvaluationDispatch
