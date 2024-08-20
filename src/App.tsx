import React, {useEffect, useState} from 'react';
import './App.css';
import {createBrowserRouter, defer, Outlet, RouterProvider} from "react-router-dom";
import UnAuthenticated from "./components/UnAuthenticated";
import ProtectedRoute from "./ProtectedRoute";
import GoogleApi from "./services/GoogleApi";
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

const loadResourceList = async <T,>(resource: string) => {
    console.log(`${resource} List Loader`)
    return MonetaApi.list<T>(resource)
}

function App() {

    const [user, setUser] = useState<any | null>(null);
    const [profile, setProfile] = useState<any | null>(null);
    useEffect(
        () => {
            if (user) {
                GoogleApi.getUserInfo()
                    .then((res: any) => {
                        setProfile(res.data);
                    })
                    .catch((err: any) => console.log(err));
            }
        },
        [ user ]
    );
    const router = createBrowserRouter([
        {
            element: <h1>Moneta</h1>,
            path: "/"
        },
        {
            element: <Outlet/>,
            path: "/",
            children: [
                {
                    index: true,
                    element: <UnAuthenticated user={user} setUser={setUser}/>
                },
                {
                    path: 'secure/*',
                    element: <ProtectedRoute user={user} profile={profile} setProfile={setProfile}/>,
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
            ],
        },
    ], {
        basename: '/moneta'
    });
    return <RouterProvider router={router} />
}

export default App;
