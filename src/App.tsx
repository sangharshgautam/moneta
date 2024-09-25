import React, {createContext, useContext, useState} from 'react';
import './App.css';
import {createBrowserRouter, defer, RouterProvider} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import MonetaApi from "./services/MonetaApi";
import {Timesheet} from "./components/modules/common/Models";
import {Dashboard, OutletContentError} from "./pages/LazyOutlet";
import AgencyRoutes from "./routes/AgencyRoutes";
import ContractRoutes from "./routes/ContractRoutes";
import ServiceRoutes from "./routes/ServiceRoutes";
import TimesheetRoutes from "./routes/TimesheetRoutes";
import InvoiceRoutes from "./routes/InvoiceRoutes";
import ExpenseRoutes from "./routes/ExpenseRoutes";
import AccountRoutes from "./routes/AccountRoutes";
import SettingsRoutes from "./routes/SettingsRoutes";
import ReportRoutes from "./routes/ReportRoutes";
import {useAuth} from "react-oidc-context";
import {loadResourceList} from "./Constants";

export const BusinessContext = createContext<string>('')
function App() {

    const auth =useAuth()
    const [businessId, setBusinessId] = useState<string>("02f5d1bf-da50-4ca4-9bd9-e47e10f6e765")

    const router = createBrowserRouter([
        {
            element: <ProtectedRoute/>,
            path: "/",
            handle: {
                crumb: () => "home"
            },
            errorElement: <OutletContentError/>,
            children: [
                {
                    index: true, element: <h1>HELLO</h1>,
                    // loader: async () => {
                    //     return defer({listResponse: loadResourceList<Timesheet[]>(businessId, 'timesheet')})
                    // },
                    handle: {
                        crumb: () => "dashboard"
                    }
                },
                {
                    path: 'dashboard', element: <Dashboard/>,
                    loader: async () => {
                        return defer({listResponse: loadResourceList<Timesheet[]>(businessId, 'timesheet')})
                    },
                    handle: {
                        crumb: () => "dashboard"
                    }
                },
                AgencyRoutes(),
                ContractRoutes(),
                ServiceRoutes(),
                TimesheetRoutes(),
                InvoiceRoutes(),
                ExpenseRoutes(),
                AccountRoutes(),
                ReportRoutes(),
                SettingsRoutes()
            ]
        }
    ], {
        basename: '/moneta'
    });

    switch (auth.activeNavigator) {
        case "signinSilent":
            return <div>Signing you in...</div>;
        case "signoutRedirect":
            return <div>Signing you out...</div>;
    }

    if (auth.isLoading) {
        return <div>Loading...</div>;
    }

    if (auth.error) {
        return <div>Oops... {auth.error.message}</div>;
    }

    if (auth.isAuthenticated) {
        return (
            // <div>
            //     Hello {auth.user?.profile.sub}{" "}
            //     <button onClick={() => void auth.removeUser()}>Log out</button>
            // </div>
            <BusinessContext.Provider value={businessId}>
                <RouterProvider router={router} />
            </BusinessContext.Provider>
        );
    }

    return <button onClick={() => void auth.signinRedirect()}>Log in</button>;
}

export default App;
