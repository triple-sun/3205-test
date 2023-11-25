import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import { TFindUserDTO } from '@3205-test/common';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search'
import TextMask from '../../utils/text-mask';
import { validationSchema } from '../../const/const';

type THandleFindUserSubmit = {
  handleFindUserSubmit: (dto: TFindUserDTO) => void;
  handleFindUserReset: () => void;
};

export default function FindUserForm({
  handleFindUserSubmit,
  handleFindUserReset,
}: THandleFindUserSubmit) {
  const formik = useFormik<TFindUserDTO>({
    initialValues: {
      email: '',
    },
    validationSchema: validationSchema,
    onSubmit: ({ email, number }) =>
      number
        ? handleFindUserSubmit({
            email,
            number: number.replaceAll('-', ''),
          })
        : handleFindUserSubmit({
            email,
          })
  });

  const handleFormReset = () => {
    formik.setValues({email: '', number: ''})
    handleFindUserReset()
  }
  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography component="h1" variant="h5">
        Find user
      </Typography>
      <Box
        component="form"
        noValidate
        onSubmit={formik.handleSubmit}
        sx={{ mt: 3 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onReset={formik.handleReset}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              value={formik.values.number}
              onChange={formik.handleChange}
              onReset={() => (formik.values.number = undefined)}
              onBlur={formik.handleBlur}
              name="number"
              id="number"
              label="Number"
              InputProps={{ inputComponent: TextMask }}
              error={formik.touched.number && Boolean(formik.errors.number)}
              helperText={formik.touched.number && formik.errors.number}
            />
          </Grid>
        </Grid>
        <Button
          fullWidth
          sx={{ mt: 3, mb: 1 }}
          variant="contained"
          type="submit"
          startIcon={<SearchIcon />}
        >
          Find
        </Button>
        <Button
          fullWidth
          sx={{ mt: 1, mb: 1 }}
          variant="outlined"
          type="reset"
          startIcon={<DeleteIcon />}
          onClick={handleFormReset}>
          Clear
        </Button>
      </Box>
    </Box>
  );
}

