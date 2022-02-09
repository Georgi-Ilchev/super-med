import './App.css';
import Menu from './components/Menu/Menu.js';
import Home from './components/Home/Home.js';
import Login from './components/Login/Login.js';
import Register from './components/Register/Register.js';
import Categories from './components/Categories/Categories.js';
import DoctorDetails from './components/DoctorDetails/DoctorDetails.js';
import NotFound from './components/NotFound/NotFound.js';

import './utils/firebase.js';
import { getAuth, signOut } from 'firebase/auth';

import { Route, Link, NavLink, Redirect, Routes, Navigate } from 'react-router-dom';

function App() {
  const auth = getAuth();

  return (

    <div className="App">
      <Menu></Menu>

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/doctors" element={<Categories />}></Route>
        <Route path="/doctors/:category" element={<Categories />}></Route>
        <Route path="/doctors/:doctorId/details" element={<DoctorDetails />}></Route>
        {/* <Route path="/logout" render={props => {
          signOut(auth);
          return <Navigate replace to="/" />
        }} /> */}
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div >
  );
}

export default App;
