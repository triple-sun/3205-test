import { useSelector } from 'react-redux';
import { TypedUseSelectorHook } from 'react-redux';
import { State } from '../types/state.type';

const useAppSelector: TypedUseSelectorHook<State> = useSelector;

export default useAppSelector;
