import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  
    <Provider store={store}>
      
<GoogleOAuthProvider clientId="921280622729-651dvf4na3lejbnqn7tbsutvirne3hn2.apps.googleusercontent.com">
      <App />

      </GoogleOAuthProvider>
    </Provider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
