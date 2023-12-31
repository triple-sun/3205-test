import { TUser } from '@3205-test/common';
import { Paper, TableContainer, TableRow } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import NoUsersFound from '../no-users-found/no-users-found';

const FoundUsersTableComponent = ({ users }: { users: TUser[] }) => {
  if (users.length > 0) {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 300 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell align="right">Number</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow
                key={`row-${user.email} + ${index}`}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  key={`cell-${user.email} + ${index}`}
                >
                  {user.email}
                </TableCell>
                <TableCell align="right" key={`cell-${user.number} + ${index}`}>
                  {user.number}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
  return <NoUsersFound />;
};

export default FoundUsersTableComponent;
