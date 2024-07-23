import React, {useEffect, useState} from 'react';
import './App.css';
import {createBrowserRouter, defer, Outlet, RouterProvider} from "react-router-dom";
import UnAuthenticated from "./components/UnAuthenticated";
import ProtectedRoute from "./ProtectedRoute";
import GoogleApi from "./services/GoogleApi";
import AddAgency from "./components/modules/agency/AddAgency";
import EditAgencyPage from "./pages/agency/EditAgencyPage";
import AddContract from "./components/modules/contract/AddContract";
import ViewAgencyPage from "./pages/agency/ViewAgencyPage";
import MonetaApi from "./services/MonetaApi";
import {Agency, Contract, ContractService, Service, Timesheet} from "./components/modules/common/Models";
import EditContractPage from "./pages/contract/EditContractPage";
import AddTimesheet from "./components/modules/timesheet/AddTimesheet";
import ViewContractPage from "./pages/contract/ViewContractPage";
import EditTimesheetPage from "./pages/timesheet/EditTimesheetPage";
import ViewTimesheetPage from "./pages/timesheet/ViewTimesheetPage";
import {
    AgenciesPage,
    ContractsPage,
    Dashboard,
    OutletContentError,
    ServicesPage,
    TimesheetsPage
} from "./pages/LazyOutlet";
import {AxiosResponse} from "axios";
import Settings from "./components/modules/settings/Settings";
import EditServicePage from "./pages/service/EditServicePage";
import ViewServicePage from "./pages/service/ViewServicePage";
import AddService from "./components/modules/service/AddService";
import AssignService from "./pages/contract/AssignService";

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
                        {
                            path: 'agency',
                            handle: {
                                crumb: () => "agency"
                            },
                            children: [
                                {
                                    index: true, element: <AgenciesPage/>,
                                    loader: async () =>  {
                                        return defer({listResponse: loadResourceList<Agency[]>('agency')})
                                    }
                                },
                                {
                                    path: 'add', element: <AddAgency/>,
                                    handle: {
                                        crumb: () => "add"
                                    }
                                },
                                {
                                    path: ':id/edit', element: <EditAgencyPage/>,
                                    loader: async ({ params }) => {
                                        return defer({itemResponse: loadResource<Agency>('agency', params.id as string)})
                                    },
                                    handle: {
                                        crumb: () => "edit"
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
                                        return defer({id, itemResponse: agencyLoader, listResponse: contractsLoader});
                                    },
                                    handle: {
                                        crumb: (data: any) => data.id
                                    }
                                },
                            ]
                        },
                        {
                            path: 'contract',
                            handle: {
                                crumb: () => "contract"
                            },
                            children: [
                                {
                                    index: true, element: <ContractsPage/>,
                                    loader: async () => {
                                        return defer({listResponse: loadResourceList<Contract[]>('contract')})
                                    }
                                },
                                {path: 'add', element: <AddContract/>},
                                {
                                    path: ':id/add', element: <AddTimesheet/>,
                                    loader: async ({ params}) => {
                                        const id = params.id as string
                                        const contractLoader = loadResource<Contract>('contract', id)
                                        const contractsLoader = loadResourceList<Contract[]>(`contract`);
                                        const servicesLoader = loadResourceList<ContractService[]>(`contract/${id}/service`);
                                        return defer({id, itemResponse: contractLoader, contractsResponse: contractsLoader, servicesResponse: servicesLoader});
                                    },
                                    handle: {
                                        crumb: () => "add"
                                    }
                                },
                                {
                                    path: ':id', element: <ViewContractPage/>,
                                    loader: async ({ params}) => {
                                        const id = params.id as string
                                        const contractLoader = loadResource<Contract>('contract', id)
                                        const timesheetsLoader = loadResourceList<Timesheet[]>(`contract/${id}/timesheet`);
                                        const servicesLoader = loadResourceList<ContractService[]>(`contract/${id}/service`);
                                        return defer({id, itemResponse: contractLoader, listResponse: timesheetsLoader, servicesResponse: servicesLoader});
                                    },
                                    handle: {
                                        crumb: (data: any) => data.id
                                    }
                                },
                                {
                                    path: ':id/edit', element: <EditContractPage/>,
                                    loader: async ({ params }) => {
                                        return defer({itemResponse: loadResource<Agency>('contract', params.id as string)})
                                    },
                                    handle: {
                                        crumb: () => "edit"
                                    }
                                },
                                {
                                    path: ':id/service/add', element: <AssignService/>,
                                    loader: async ({ params }) => {
                                        const id = params.id as string
                                        const contractLoader = loadResource<Contract>('contract', id)
                                        const servicesLoader = loadResourceList<Contract[]>(`service`);
                                        return defer({id, itemResponse: contractLoader, listResponse: servicesLoader})
                                    },
                                    handle: {
                                        crumb: (data: any) => data.id
                                    }
                                }
                            ]
                        },
                        {
                            path: 'service',
                            handle: {
                                crumb: () => "service"
                            },
                            children: [
                                {
                                    index: true, element: <ServicesPage/>,
                                    loader: async () => {
                                        return defer({listResponse: loadResourceList<Service[]>('service')})
                                    }
                                },
                                {path: 'add', element: <AddContract/>},
                                {
                                    path: ':id/edit', element: <EditServicePage/>,
                                    loader: async ({ params }) => {
                                        return defer({itemResponse: loadResource<Service>('service', params.id as string)})
                                    },
                                    handle: {
                                        crumb: () => "edit"
                                    }
                                },
                                {
                                    path: ':serviceId/add', element: <AddService/>,
                                    handle: {
                                        crumb: () => "add"
                                    }
                                },
                                {
                                    path: ':id', element: <ViewServicePage/>,
                                    loader: async ({ params}) => {
                                        const id = params.id as string
                                        const contractLoader = loadResource<Service>('service', id)
                                        const timesheetsLoader = loadResourceList<Contract[]>(`service/${id}/contract`);
                                        return defer({id, itemResponse: contractLoader, listResponse: timesheetsLoader});
                                    },
                                    handle: {
                                        crumb: (data: any) => data.id
                                    }
                                },
                            ]
                        },
                        {
                            path: 'timesheet',
                            handle: {
                                crumb: () => "timesheet"
                            },
                            children: [
                                {
                                    index: true, element: <TimesheetsPage />,
                                    loader: async () => {
                                        return defer({listResponse: loadResourceList<Timesheet[]>('timesheet')})
                                    }
                                },
                                {
                                    path: 'add', element: <AddTimesheet/>,
                                    handle: {
                                        crumb: () => "add"
                                    }
                                },
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
                                        const timesheetLoader = loadResource<Contract>('timesheet', id)
                                        return defer({id, itemResponse: timesheetLoader});
                                    },
                                    handle: {
                                        crumb: (data: any) => data.id
                                    }
                                }
                            ]
                        },
                        {
                            path: 'settings', element: <Settings />,
                            // loader: async () => {
                            //     return defer({listResponse: loadResourceList<Timesheet[]>('timesheet')})
                            // },
                            handle: {
                                crumb: () => "settings"
                            },
                        }
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
