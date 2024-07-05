import React from 'react'
import {Navigate} from "react-router-dom";
import {GoogleOAuthProvider, TokenResponse} from "@react-oauth/google";
import GoogleOAuth from "./GoogleOAuth";

const UnAuthenticated = (props: {user: TokenResponse, setUser: (user: TokenResponse) => void}) => {
    if (props.user) {
        return <Navigate to='secure' replace />;
    }

    return (
        // @ts-ignore
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
            <GoogleOAuth user={props.user} setUser={props.setUser}></GoogleOAuth>
         </GoogleOAuthProvider>
    )
}

export default UnAuthenticated