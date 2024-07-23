import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, FormDispatch } from './store';

export const useFormDispatch = () => useDispatch<FormDispatch>();
export const useFormSelector: TypedUseSelectorHook<RootState> = useSelector;
