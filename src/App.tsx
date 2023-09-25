import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import SignIn from './pages/Authentication/SignIn';
import SignUpCompany from './pages/Authentication/SignUpCompany';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import Admin from './pages/Dashboard/Admin';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import CreateActivity from './pages/CreateActivity';
import TablesActivity from './pages/TablesActivity';
import TablesClient from './pages/TablesClients';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import Lobby  from './pages/users/Lobby';
import SignUpClients from './pages/Authentication/SignUpClients';

function App() {
  const [loading, setLoading] = useState<boolean>(true);

  const preloader = document.getElementById('preloader');

  if (preloader) {
    setTimeout(() => {
      preloader.style.display = 'none';
      setLoading(false);
    }, 2000);
  }

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <p className=" text-center text-danger">Failed to lead app</p>
  ) : (
    <>
      <Routes>
        <Route path="/" element={<Admin />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/forms/form-elements" element={<FormElements />} />
        <Route path="/forms/form-layout" element={<FormLayout />} />
        <Route path="/actividades" element={<TablesActivity />} />
        <Route path="/opciones-clientes" element={<TablesClient />} />
        <Route path="/crear-actividad" element={<CreateActivity />} />
        <Route path="/chart" element={<Chart />} /> 
        <Route path="/ui/alerts" element={<Alerts />} />
        <Route path="/ui/buttons" element={<Buttons />} />
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/registrar-clientes" element={<SignUpClients />} />
        <Route path="/auth/signupcompany" element={<SignUpCompany />} />
        <Route path="/lobby" element={<Lobby />} />
      </Routes>
    </>
  );
}

export default App;
