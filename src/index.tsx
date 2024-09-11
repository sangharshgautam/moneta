import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'semantic-ui-css/semantic.min.css'
import {AuthProvider} from "react-oidc-context";

import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const googleOidcConfig = {
    authority: "https://accounts.google.com",
    client_id: "834791764214-tqn6u72bnel582avnh9l0c243j6inps5.apps.googleusercontent.com",
    redirect_uri: "http://localhost:3000/moneta",
    client_secret: "ZZZZ"
};
root.render(
    //https://stackoverflow.com/questions/72406486/react-fetch-api-being-called-2-times-on-page-load
  // <React.StrictMode>
    <AuthProvider {...googleOidcConfig}>
    <App />
    </AuthProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
