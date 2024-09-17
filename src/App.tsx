import React from 'react';
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

const loadResourceList = async <T,>(resource: string) => {
    console.log(`${resource} List Loader`)
    return MonetaApi.list<T>(resource)
}

function App() {

    const auth =useAuth()
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
                    index: true, element: <Dashboard />,
                    loader: async () => {
                        return defer({listResponse: loadResourceList<Timesheet[]>('timesheet')})
                    },
                    handle: {
                        crumb: () => "dashboard"
                    }
                },
                {
                    path: 'dashboard', element: <Dashboard/>,
                    loader: async () => {
                        return defer({listResponse: loadResourceList<Timesheet[]>('timesheet')})
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
            <RouterProvider router={router} />
        );
    }

    return <button onClick={() => void auth.signinRedirect()}>Log in</button>;
}

export default App;
