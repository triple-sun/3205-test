import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../const/enums';
import MainPage from '../pages/main-page/main-page';
import { PrimeReactProvider } from 'primereact/api';

const App = () => {
  return (
    <PrimeReactProvider>
      <Routes>
        <Route path={AppRoute.Main}>
          <Route index element={<MainPage />} />
        </Route>
        <Route path={AppRoute.NotFound} element={<MainPage />} />
      </Routes>
    </PrimeReactProvider>
  );
};

export default App;
