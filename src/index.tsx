import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'semantic-ui-css/semantic.min.css'
import {AuthProvider, AuthProviderProps} from "react-oidc-context";

import App from './App';
import reportWebVitals from './reportWebVitals';
import {WebStorageStateStore} from "oidc-client-ts";
import {AUTHORITY, CLIENT_ID} from "./Constants";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const googleOidcConfig: AuthProviderProps = {
    authority: AUTHORITY,
    client_id: CLIENT_ID,
    redirect_uri: "http://localhost:3000/moneta",
    userStore: new WebStorageStateStore({ store: window.localStorage }),
    scope: [
        "openid",
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email"
    ].join(" ")
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
