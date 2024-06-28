import React, {useEffect, useState} from 'react';
import './App.css';
import {createBrowserRouter, defer, Outlet, RouterProvider} from "react-router-dom";
import UnAuthenticated from "./components/UnAuthenticated";
import ProtectedRoute from "./ProtectedRoute";
import GoogleApi from "./services/GoogleApi";
import Dashboard from "./components/modules/dashboard/Dashboard";
import AddAgency from "./components/modules/agency/AddAgency";
import EditAgencyPage from "./pages/agency/EditAgencyPage";
import AddContract from "./components/modules/contract/AddContract";
import ViewAgencyPage from "./pages/agency/ViewAgencyPage";
import MonetaApi from "./services/MonetaApi";
import {Agency, Contract, Timesheet} from "./components/modules/common/Models";
import EditContractPage from "./pages/contract/EditContractPage";
import AddTimesheet from "./components/modules/timesheet/AddTimesheet";
import ViewContractPage from "./pages/contract/ViewContractPage";
import EditTimesheetPage from "./pages/timesheet/EditTimesheetPage";
import ViewTimesheetPage from "./pages/timesheet/ViewTimesheetPage";
import {AgenciesPage, ContractsPage, TimesheetsPage} from "./pages/LazyOutlet";
import {AxiosResponse} from "axios";

const loadResource = async <T,>(resource: string, id: string | number): Promise<AxiosResponse<T>> => {
    console.log(`${resource} Loader`)
    return MonetaApi.get<T>(resource, id)
}

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
            path: "/moneta",
            children: [
                {
                    index: true,
                    element: <UnAuthenticated user={user} setUser={setUser}/>
                },
                {
                    path: 'secure/*',
                    element: <ProtectedRoute user={user} profile={profile} setProfile={setProfile}/>,
                    children: [
                        {index: true, element: <Dashboard />},
                        {path: 'dashboard', element: <Dashboard/>},
                        {
                            path: 'agency',
                            children: [
                                {
                                    index: true, element: <AgenciesPage/>,
                                    loader: async () =>  {
                                        return defer({listResponse: loadResourceList<Agency[]>('agency')})
                                    }
                                },
                                {
                                    path: 'add', element: <AddAgency/>},
                                {
                                    path: ':id/edit', element: <EditAgencyPage/>,
                                    loader: async ({ params }) => {
                                        return defer({itemResponse: loadResource<Agency>('agency', params.id as string)})
                                    }
                                },
                                {
                                    path: ':agencyId/add', element: <AddContract/>},
                                {
                                    path: ':id', element: <ViewAgencyPage/>,
                                    loader: async ({ params }) => {
                                        const id = params.id as string
                                        const agencyLoader = loadResource<Agency>('agency', id)
                                        const contractsLoader = loadResourceList<Contract[]>(`agency/${id}/contract`);
                                        return defer({itemResponse: agencyLoader, listResponse: contractsLoader});
                                    }
                                },
                            ]
                        },
                        {
                            path: 'contract',
                            children: [
                                {
                                    index: true, element: <ContractsPage/>,
                                    loader: async () => {
                                        return defer({listResponse: loadResourceList<Contract[]>('contract')})
                                    }
                                },
                                {path: 'add', element: <AddContract/>},
                                {
                                    path: ':id/edit', element: <EditContractPage/>,
                                    loader: async ({ params }) => {
                                        return defer({itemResponse: loadResource<Agency>('contract', params.id as string)})
                                    }
                                },
                                {path: ':contractId/add', element: <AddTimesheet/>},
                                {
                                    path: ':id', element: <ViewContractPage/>,
                                    loader: async ({ params}) => {
                                        const id = params.id as string
                                        const contractLoader = loadResource<Contract>('contract', id)
                                        const timesheetsLoader = loadResourceList<Timesheet[]>(`contract/${id}/timesheet`);
                                        return defer({itemResponse: contractLoader, listResponse: timesheetsLoader});
                                    }
                                },
                            ]
                        },
                        {
                            path: 'timesheet',
                            children: [
                                {
                                    index: true, element: <TimesheetsPage />,
                                    loader: async () => defer({listResponse: loadResourceList<Timesheet[]>('timesheet')})
                                },
                                {path: 'add', element: <AddTimesheet/>},
                                {
                                    path: ':id/edit', element: <EditTimesheetPage/>,
                                    loader: async ({ params }) => {
                                        return defer({itemResponse: loadResource<Agency>('timesheet', params.id as string)})
                                    }
                                },
                                {
                                    path: ':id', element: <ViewTimesheetPage/>,
                                    loader: async ({ params}) => {
                                        const id = params.id as string
                                        const timesheetLoader = loadResource<Contract>('contract', id)
                                        const timesheetsLoader = loadResourceList<Timesheet[]>(`contract/${id}/timesheet`);
                                        return defer({itemResponse: timesheetLoader});
                                    }
                                },
                            ]
                        }
                    ]
                }
            ],
        },
    ]);
    return <RouterProvider router={router} />
}

export default App;
