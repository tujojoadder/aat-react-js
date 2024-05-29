import React, { useEffect } from 'react'

import { BrowserRouter, Route,Routes } from 'react-router-dom'

import { useGetLoggedUserQuery } from './services/userAuthApi';

import Home from './features/home/Home';
function App() {
  
  const { data, isError, isSuccess } = useGetLoggedUserQuery();

  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem("auth_user_id", data.auth_user_id);
    }
  }, [isSuccess]);

  return (
    <BrowserRouter>
  
    <Routes>
    <Route path='/home' exact element={<Home/>} />
   
    </Routes>
  
  </BrowserRouter>
  );
}

export default App;
