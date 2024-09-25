import React, { useEffect } from "react";
import { useGetUserDetailsQuery } from "./services/userAuthApi";
import { createRoot } from "react-dom/client";
import { Provider, useDispatch } from "react-redux";
import App from "./App";

import { PersistGate } from 'redux-persist/integration/react';
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { store,persistor } from "./app/store";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Provider store={store}>
   
   <PersistGate loading={null} persistor={persistor}>
    <GoogleOAuthProvider clientId="921280622729-651dvf4na3lejbnqn7tbsutvirne3hn2.apps.googleusercontent.com">
    
      <App />
    </GoogleOAuthProvider>
    </PersistGate>

  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
