import React, { useEffect } from 'react'

import { BrowserRouter, Route,Routes } from 'react-router-dom'


import Home from './features/home/Home';
import Login from './features/Login/Login';
import Spinner from './features/Login/Spinner/Spinner';
import ResetPassword from './features/ResetPassword/ResetPassword';
import ForgotPassword from './features/ResetPassword/ForgotPassword';
import NotFound from './features/404/NotFound';
import Navbar from './features/Navbars/Navbar';
function App() {
  

  return (
    <BrowserRouter>
  
    <Routes>


    <Route path='/navbar' exact element={<Navbar/>} />



    <Route path='/' exact element={<Home/>} />
    <Route path='/login' exact element={<Login/>} />
    <Route path='/spinner' exact element={<Spinner/>} />
    <Route path='/forgotpassword' exact element={<ForgotPassword/>} />
    <Route path='/resetpassword/:token' exact element={<ResetPassword/>} />
    <Route path='*' exact element={<NotFound/>} />

    </Routes>
  
  </BrowserRouter>
  );
}

export default App;
