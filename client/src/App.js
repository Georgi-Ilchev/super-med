import './App.css';
import './utils/firebase.js';
import { Route, Routes } from 'react-router-dom';
import AuthProvider from './contexts/AuthContext.js';

import Menu from './components/Menu/Menu.js';
import Home from './components/Home/Home.js';
import Login from './components/Login/Login.js';
import Logout from './components/Logout/Logout.js';
import Register from './components/Register/Register.js';
import NotFound from './components/NotFound/NotFound.js';
import AccountPage from './components/Account/AccountPage';
import EditProfile from './components/Account/Edit/Edit';
import BecomeDoctor from './components/Account/BecomeDoctor/BecomeDoctor.js';
import Categories from './components/Categories/Categories.js';
import CreateAppointment from './components/CreateAppointment/CreateAppointment.js';
import DoctorsInfo from './components/Questions/DoctorsInfo/DoctorsInfo.js';
import Appointmentss from './components/Appointments/Appointmentss';
import Appointments from './components/Appointments/Appointments';
import DoctorDetails from './components/DoctorDetails/DoctorDetails.js';
import PrivacyPolicy from './components/Questions/PrivacyPolicy/PrivacyPolicy.js';

function App() {
  return (

    <div className="App">
      <AuthProvider>
        <Menu />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/doctors" element={<Categories />} />
          <Route path="/doctors/:category" element={<Categories />} />
          <Route path="/doctors/:doctorId/details" element={<DoctorDetails />} />
          <Route path="/doctors/:doctorId/createappointment" element={<CreateAppointment />} />
          <Route path="/doctors/info" element={<DoctorsInfo />} />
          <Route path="/account/:uid" element={<AccountPage />} />
          <Route path="/account/:uid/edit" element={<EditProfile />} />
          <Route path="/account/:uid/becomedoctor" element={<BecomeDoctor />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/appointmentss" element={<Appointmentss />} />
          <Route path="/policy" element={<PrivacyPolicy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
