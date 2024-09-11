import TopNavBar from "./components/TopNavBar";
import AppLayout from "./components/AppLayout";
import {Header} from "semantic-ui-react";
import React from "react";
import {Navigate} from "react-router-dom";
import {useAuth} from "react-oidc-context";

const ProtectedRoute = (props: {user: any, profile: any, setProfile: (profile: any) =>  void}) => {
    const auth = useAuth();

    // if (!props.user) {
    //     return <Navigate to="/secure" replace />;
    // }
    return(
    <section className="App">
        <header>
            <TopNavBar user={props.user} profile={props.profile} setProfile={props.setProfile}></TopNavBar>
        </header>
        <AppLayout/>
        <footer><Header as='h5'>© 2024 ACE-IT. All Rights Reserved.</Header></footer>
    </section>)
}
export default ProtectedRoute;