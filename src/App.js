import React, { useEffect } from 'react'

import { BrowserRouter, Route,Routes } from 'react-router-dom'


import Home from './features/home/Home';
import Login from './features/Login/Login';
function App() {
  

  return (
    <BrowserRouter>
  
    <Routes>
    <Route path='/' exact element={<Home/>} />
    <Route path='/login' exact element={<Login/>} />
   
    </Routes>
  
  </BrowserRouter>
  );
}

export default App;
