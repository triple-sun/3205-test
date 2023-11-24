import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TUser } from '@3205-test/common';
import { Typography } from '@mui/material';
import Loading from './spinner/spinner';
import useAppSelector from '../hooks/use-app-selector';
import { getIsUsersLoaded } from '../store/find-user-form/find-user-form.selectors';

const FoundUsers = ({ users }: { users: TUser[] | null }) => {
  const isLoaded = useAppSelector(getIsUsersLoaded);

  if (!users && isLoaded) {
    return (
      <Typography component="h1" variant="h5" color="darkred">
        No users found!
      </Typography>
    );
  }
 if (users && isLoaded) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell align="right">Number</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.email}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {user.email}
              </TableCell>
              <TableCell align="right">{user.number}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

  if (!users && !isLoaded) {
    return 
  }

return <Loading />
};

export default FoundUsers;
