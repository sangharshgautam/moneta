import TopNavBar from "./components/TopNavBar";
import AppLayout from "./components/AppLayout";
import {Header} from "semantic-ui-react";
import React from "react";

const ProtectedRoute = () => {

    // if (!props.user) {
    //     return <Navigate to="/secure" replace />;
    // }
    return(
    <section className="App">
        <header>
            <TopNavBar></TopNavBar>
        </header>
        <AppLayout/>
        <footer><Header as='h5'>© 2024 ACE-IT. All Rights Reserved.</Header></footer>
    </section>)
}
export default ProtectedRoute;