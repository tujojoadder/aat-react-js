import React, { useEffect } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./features/home/Home";
import Login from "./features/Login/Login";
import Spinner from "./features/Login/Spinner/Spinner";
import ResetPassword from "./features/ResetPassword/ResetPassword";
import ForgotPassword from "./features/ResetPassword/ForgotPassword";
import NotFound from "./features/404/NotFound";
import Navbar from "./features/Navbars/Navbar";
import Page from "./features/Page";
import Homeleft from "./features/home/Homeleft";
import HadithDay from "./features/home/Components/HadithDay/HadithDay";
import Friends from "./features/Friends/Friends";
import FriendRight from "./features/Friends/FriendRight";
import FriendHome from "./features/Friends/FriendHome/FriendHome";
import FriendRightFriendRequest from "./features/Friends/FriendRightFriendRequest";
import FriendRightFriendSuggestions from "./features/Friends/FriendRightFriendSuggestions";
import FriendRightSentRequests from "./features/Friends/FriendRightSentRequests";
import FriendRightAllFriends from "./features/Friends/FriendRightAllFriends";
function App() {
  return (
    <BrowserRouter>

      <Routes>
        //private Routes with navbar
        <Route path="/" exact element={<Navbar />}>
          <Route index exact element={<Home />} />
          <Route index exact element={<Homeleft />} />
        {/* Home */}
          <Route path="friends" exact element={<FriendHome />} />
          <Route path="friends" exact element={<FriendRight />} />

            {/* Friends */}
            <Route path="friends" exact element={<FriendHome />} />
          <Route path="friends" exact element={<FriendRight />} />

          <Route path="friends/requests" exact element={<FriendHome />} />
          <Route path="friends/requests" exact element={<FriendRightFriendRequest />} />

          <Route path="friends/suggestions" exact element={<FriendHome />} />
          <Route path="friends/suggestions" exact element={<FriendRightFriendSuggestions />} />
          
          <Route path="friends/sent-requests" exact element={<FriendHome />} />
          <Route path="friends/sent-requests" exact element={<FriendRightSentRequests />} />
         
          <Route path="friends/all-friends" exact element={<FriendHome />} />
          <Route path="friends/all-friends" exact element={<FriendRightAllFriends />} />
      





        </Route>

        //public routes
        <Route path='/' exact element={<Home/>} />
        <Route path='/day' exact element={<HadithDay/>} />
    <Route path='/login' exact element={<Login/>} />
    <Route path='/spinner' exact element={<Spinner/>} />
    <Route path='/forgotpassword' exact element={<ForgotPassword/>} />
    <Route path='/resetpassword/:token' exact element={<ResetPassword/>} />
    <Route path='*' exact element={<NotFound/>} />      </Routes>
 

    
    </BrowserRouter>
  );
}

export default App;
