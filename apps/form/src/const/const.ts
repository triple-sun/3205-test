import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import * as yup from 'yup';

export const validationSchema = yup.object({
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('An email is required'),
  number: yup
    .string()
    .transform((str) => str.replaceAll('-', ''))
    .matches(/^[0-9]+$/, 'Must be only digits')
    .min(6, 'Must be exactly 6 digits')
    .max(6, 'Must be exactly 6 digits'),
});

const Theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
});

export default Theme;
