import FindUserForm from '../../components/find-user-form/find-user-form';
import useFoundUsers from '../../hooks/use-found-users';
import { ThemeProvider } from '@emotion/react';
import Theme from '../../components/theme/theme';
import { Box, Container, CssBaseline } from '@mui/material';
import FoundUsersTableComponent from '../../components/found-users/found-users-table';
import Loading from '../../components/spinner/spinner';

const MainPage = () => {
  const {
    handleFindUserSubmit,
    handleFindUserReset,
    users,
    isLoading,
    isLoaded,
    showData,
  } = useFoundUsers();

  return (
    <ThemeProvider theme={Theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <FindUserForm
          handleFindUserSubmit={handleFindUserSubmit}
          handleFindUserReset={handleFindUserReset}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {showData && isLoading ? <Loading /> : ''}
          {showData && isLoaded ? <FoundUsersTableComponent users={users}/> : ''}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default MainPage;
