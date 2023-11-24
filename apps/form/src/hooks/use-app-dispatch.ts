import { useDispatch } from 'react-redux';
import AppDispatch from '../types/app-dispatch.type';

const useAppDispatch = () => useDispatch<AppDispatch>();

export default useAppDispatch;
