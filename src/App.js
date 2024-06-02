import React, { useEffect } from 'react'

import { BrowserRouter, Route,Routes } from 'react-router-dom'


import Home from './features/home/Home';
import Login from './features/Login/Login';
import Spinner from './features/Login/Spinner/Spinner';
function App() {
  

  return (
    <BrowserRouter>
  
    <Routes>
    <Route path='/' exact element={<Home/>} />
    <Route path='/login' exact element={<Login/>} />
    <Route path='/spinner' exact element={<Spinner/>} />
   
    </Routes>
  
  </BrowserRouter>
  );
}

export default App;
