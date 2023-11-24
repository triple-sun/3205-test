import FindUserForm from '../../components/find-user-form/find-user-form';
import useFoundUsers from '../../hooks/use-found-user';
import { ThemeProvider } from '@emotion/react';
import Theme from '../../components/theme/theme';
import { Container, CssBaseline } from '@mui/material';
import FoundUsers from '../../components/found-users';

const MainPage = () => {
  const {users, handleFindUserSubmit} = useFoundUsers()

  return (
    <ThemeProvider theme={Theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <FindUserForm handleFindUserSubmit={handleFindUserSubmit} />
        <FoundUsers users={users}/>
      </Container>
    </ThemeProvider>
  );
};

export default MainPage;
