import './App.css';
import './utils/firebase.js';

import AuthProvider from './contexts/AuthContext.js';
import Menu from './components/Menu/Menu.js';
import Home from './components/Home/Home.js';
import Login from './components/Login/Login.js';
import Register from './components/Register/Register.js';
import Logout from './components/Logout/Logout.js';
import Categories from './components/Categories/Categories.js';
import DoctorDetails from './components/DoctorDetails/DoctorDetails.js';
import NotFound from './components/NotFound/NotFound.js';
import CreateDoctor from './components/CreateDoctor/CreateDoctor.js';

// import { getAuth, signOut } from 'firebase/auth';

import { Route, Link, NavLink, Redirect, Routes, Navigate } from 'react-router-dom';

function App() {
  return (

    <div className="App">
      <AuthProvider>
        <Menu></Menu>

        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/logout" element={<Logout />}></Route>
          <Route path="/doctors" element={<Categories />}></Route>
          <Route path="/doctors/:category" element={<Categories />}></Route>
          <Route path="/doctors/:doctorId/details" element={<DoctorDetails />}></Route>
          <Route path="/createdoc" element={<CreateDoctor />}></Route >
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </AuthProvider>
    </div >
  );
}

export default App;
