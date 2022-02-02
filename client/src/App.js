import './App.css';
import Menu from './components/Menu/Menu.js';
import Home from './components/Home/Home.js';
import Categories from './components/Categories/Categories.js';

import { Route, Link, NavLink, Redirect, Routes } from 'react-router-dom';

function App() {
  return (

    <div className="App">
      <Menu></Menu>

      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/doctors' element={<Categories />}></Route>
      </Routes>
    </div>
  );
}

export default App;
