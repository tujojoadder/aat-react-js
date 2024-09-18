import React, { useEffect } from "react";
import { useGetUserDetailsQuery } from "./services/userAuthApi";
import { createRoot } from "react-dom/client";
import { Provider, useDispatch } from "react-redux";
import App from "./App";

import { PersistGate } from 'redux-persist/integration/react';
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import {
  setProfile_picture,
  setUser_fname,
  setUser_lname,
  setEmail,
  setIdentifier,
} from "./features/home/HomeSlice";
import { store,persistor } from "./app/store";

const container = document.getElementById("root");
const root = createRoot(container);

const UserDetailsChecker = () => {
  const dispatch = useDispatch();

  const {
    data: userDetails,
    isSuccess: userDetailsSuccess,
    isLoading: userDetailsLoading,
    isError: userDetailsError,
  } = useGetUserDetailsQuery();

  useEffect(() => {
    if (userDetailsSuccess) {
      dispatch(
        setProfile_picture({
          profile_picture: userDetails.data.profile_picture,
        })
      );
      dispatch(setUser_fname({ user_fname: userDetails.data.user_fname }));
      dispatch(setUser_lname({ user_lname: userDetails.data.user_lname }));
      dispatch(setEmail({ email: userDetails.data.email }));
      dispatch(setIdentifier({ identifier: userDetails.data.identifier }));
    }
  }, [userDetailsSuccess, userDetails]);

  useEffect(() => {
    if (userDetailsError) {
      window.location.href = "/login"; // Redirect to login page
    }
  }, []);

  return null; // This component doesn't need to render anything
};

root.render(
  <Provider store={store}>
   
   <PersistGate loading={null} persistor={persistor}>
    <GoogleOAuthProvider clientId="921280622729-651dvf4na3lejbnqn7tbsutvirne3hn2.apps.googleusercontent.com">
      <UserDetailsChecker />
      <App />
    </GoogleOAuthProvider>
    </PersistGate>

  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
