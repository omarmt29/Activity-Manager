import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import SignIn from './pages/Authentication/SignIn.js';
import SignUpCompany from './pages/Authentication/SignUpCompany.js';
import UserTableCalendar from './pages/users/UserTableCalendar.jsx';
import UserTableActivity from './pages/users/UserTableActivity.jsx';
import Chart from './pages/Chart.js';
import Admin from './pages/Dashboard/Admin.jsx';
import FormElements from './pages/Form/FormElements.js';
import FormLayout from './pages/Form/FormLayout.js';
import Profile from './pages/Profile.js';
import CreateActivity from './pages/CreateActivity.js';
import TablesActivity from './pages/TablesActivity.js';
import TablesClient from './pages/TablesClients.jsx';
import CreateNew from './pages/CreateNew.jsx';
import Alerts from './pages/UiElements/Alerts.js';
import Buttons from './pages/UiElements/Buttons.js';
import Lobby  from './pages/users/Lobby.js';
import SignUpClients from './pages/Authentication/SignUpClients.jsx';

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

        {/* RUTAS DE ADMIN*/}

        <Route path="/" element={<Admin />} />
        {/* <Route path="/profile" element={<Profile />} /> */}
        {/* <Route path="/forms/form-elements" element={<FormElements />} />
        <Route path="/forms/form-layout" element={<FormLayout />} /> */}
        <Route path="/actividades" element={<TablesActivity />} />
        <Route path="/opciones-clientes" element={<TablesClient />} />
        <Route path="/crear-actividad" element={<CreateActivity />} />
        <Route path="/publicar-anuncios" element={<CreateNew />} />
        <Route path="/chart" element={<Chart />} /> 
        {/* <Route path="/ui/alerts" element={<Alerts />} />
        <Route path="/ui/buttons" element={<Buttons />} /> */}
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/registrar-clientes" element={<SignUpClients />} />
        <Route path="/auth/signupcompany" element={<SignUpCompany />} />

        {/* RUTAS DE USUARIOS*/}
        
        <Route path="/user/lobby" element={<Lobby />} />
        <Route path="/user/calendar" element={<UserTableCalendar />} />
        <Route path="/user/activities" element={<UserTableActivity />} />

      </Routes>
    </>
  );
}

export default App;
