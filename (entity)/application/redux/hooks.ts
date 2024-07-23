import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, ApplicationDispatch } from './applicationStore';

export const useApplicationDispatch = () => useDispatch<ApplicationDispatch>();
export const useApplicationSelector: TypedUseSelectorHook<RootState> = useSelector;
