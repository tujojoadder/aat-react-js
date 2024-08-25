import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  setProfile_picture,
  setUser_fname,
  setUser_lname,
  setEmail,
  setIdentifier,
  setCover_photo,
  setBirthDate,
  setGender
} from "../../features/home/HomeSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetUserDetailsQuery } from "../../services/userAuthApi";

const UserDetailsChecker = ({ children }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const {
    data: userDetails,
    isSuccess: userDetailsSuccess,
    isLoading: userDetailsLoading,
    isError: userDetailsError,
  } = useGetUserDetailsQuery();

/* 
  if (userDetailsSuccess) {
    console.log(userDetails);
  } */
  useEffect(() => {

   /*  if user is authenticated */
    if (userDetailsSuccess) {

      dispatch(setProfile_picture({ profile_picture: userDetails.data.profile_picture }));
      dispatch(setUser_fname({ user_fname: userDetails.data.user_fname }));
      dispatch(setUser_lname({ user_lname: userDetails.data.user_lname }));
      dispatch(setEmail({ email: userDetails.data.email }));
      dispatch(setIdentifier({ identifier: userDetails.data.identifier }));
      dispatch(setCover_photo({ cover_photo: userDetails.data.cover_photo }));
      dispatch(setBirthDate({ birthdate: userDetails.data.birthdate }));
      dispatch(setGender({ gender: userDetails.data.gender }));
      setIsLoading(false);
      if (location.pathname == '/login' ||
        location.pathname == '/forgotpassword' ||
        location.pathname == 'resetpassword') {
        navigate('/');

      } 
    }
  }, [userDetailsSuccess, userDetails, dispatch]);

  useEffect(() => {
    if (userDetailsError) {
      // Extract the path without the token part for the reset password route
      const resetPasswordPath = location.pathname.split('/')[1];
      
      if (
        location.pathname !== '/login' &&
        location.pathname !== '/forgotpassword' &&
        resetPasswordPath !== 'resetpassword'
      ) {
        window.location.href = "/login"; // Redirect to login page
      } else {
        setIsLoading(false); // Ensure loading is stopped if already on login, forgot password, or reset password page
      }
    }
  }, [userDetailsError, location.pathname]); // Ensure location.pathname is in the dependency array
  if (isLoading) {
    return null; // Optionally return a loading spinner or message here
  }

  return <>{children}</>;
};

export default UserDetailsChecker;
