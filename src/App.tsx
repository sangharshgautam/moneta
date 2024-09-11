import React, {useEffect, useState} from 'react';
import './App.css';
import {createBrowserRouter, defer, NavLink, Outlet, RouterProvider} from "react-router-dom";
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
import {useAuth} from "react-oidc-context";
import {ApolloClient, ApolloProvider, createHttpLink, InMemoryCache} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";
import {Header, Segment, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow} from "semantic-ui-react";

const loadResourceList = async <T,>(resource: string) => {
    console.log(`${resource} List Loader`)
    return MonetaApi.list<T>(resource)
}
const httpLink = createHttpLink({
    uri: 'https://gql.waveapps.com/graphql/public',
});

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('token') || 'ZZZZ';
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});
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
            element: <ProtectedRoute user={user} profile={profile} setProfile={setProfile}/>,
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
    const auth = useAuth();

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
            <ApolloProvider client={client}>
                <RouterProvider router={router} />
            </ApolloProvider>
        );
    }

    return <button onClick={() => void auth.signinRedirect()}>Log in</button>;
}

export default App;
