import React from "react";
import {Dimmer, Header, Loader, Segment} from "semantic-ui-react";
import {Await, isRouteErrorResponse, useLoaderData, useRouteError} from "react-router-dom";
import Agencies from "../components/modules/agency/Agencies";
import Contracts from "../components/modules/contract/Contracts";
import Timesheets from "../components/modules/timesheet/Timesheets";
import CashFlow from "../components/modules/dashboard/CashFlow";
import Services from "../components/modules/service/Services";
import Invoices from "./invoice/Invoices";
import Expenses from "./expense/Expenses";
import Accounts from "./account/Accounts";
import Reports from "./report/Reports";

export const OutletContentError = () => {
    const error = useRouteError();
    if (isRouteErrorResponse(error)) {
        return (
            <Segment basic>
                <Header as='h3'>Oops</Header>
                <h2>{error.status}</h2>
                <p>{error.statusText}</p>
                {error.data?.message && <p>{error.data.message}</p>}
            </Segment>
        );
    } else {
        return <div>Oops</div>;
    }
}
export const OutletContentLoading = (props: {resource: string}) => <Dimmer active><Loader inverted>Loading {props.resource}</Loader></Dimmer>
export const AgenciesPage = () => {
    // @ts-ignore
    return <React.Suspense fallback={<OutletContentLoading resource="agencies"/>}><Await resolve={useLoaderData().listResponse} errorElement={<OutletContentError/>}>{(listResponse) => (<Agencies records={listResponse.data} />)}</Await></React.Suspense>
}
export const ServicesPage = () => {
    // @ts-ignore
    return <React.Suspense fallback={<OutletContentLoading resource="services"/>}><Await resolve={useLoaderData().listResponse} errorElement={<OutletContentError/>}>{(listResponse) => (<Services records={listResponse.data} actionPrefix=""></Services>)}</Await></React.Suspense>
}
export const ContractsPage = () => {
    // @ts-ignore
    return <React.Suspense fallback={<OutletContentLoading resource="contracts" />}><Await resolve={useLoaderData().listResponse} errorElement={<OutletContentError/>}>{(listResponse) => (<Contracts records={listResponse.data} />)}</Await></React.Suspense>
}
export const TimesheetsPage = () => {
    // @ts-ignore
    return <React.Suspense fallback={<OutletContentLoading resource="timesheets" />}><Await resolve={useLoaderData().listResponse} errorElement={<OutletContentError/>}>{(listResponse) => (<Timesheets records={listResponse.data} />)}</Await></React.Suspense>
}
export const InvoicesPage = () => {
    // @ts-ignore
    return <React.Suspense fallback={<OutletContentLoading resource="invoices" />}><Await resolve={useLoaderData().listResponse} errorElement={<OutletContentError/>}>{(listResponse) => (<Invoices records={listResponse.data} />)}</Await></React.Suspense>
}
export const ExpensesPage = () => {
    // @ts-ignore
    return <React.Suspense fallback={<OutletContentLoading resource="expenses" />}><Await resolve={useLoaderData().listResponse} errorElement={<OutletContentError/>}>{(listResponse) => (<Expenses records={listResponse.data} />)}</Await></React.Suspense>
}
export const AccountsPage = () => {
    // @ts-ignore
    return <React.Suspense fallback={<OutletContentLoading resource="accounts" />}><Await resolve={useLoaderData().listResponse} errorElement={<OutletContentError/>}>{(listResponse) => (<Accounts records={listResponse.data} />)}</Await></React.Suspense>
}
export const ReportsPage = () => {
    // @ts-ignore
    return <React.Suspense fallback={<OutletContentLoading resource="reports" />}><Await resolve={useLoaderData().listResponse} errorElement={<OutletContentError/>}>{(listResponse) => (<Reports records={listResponse.data} />)}</Await></React.Suspense>
}
export const Dashboard = () => {
    // @ts-ignore
    return <React.Suspense fallback={<OutletContentLoading resource="timesheets" />}><Await resolve={useLoaderData().listResponse} errorElement={<OutletContentError/>}>{(listResponse) => (<CashFlow records={listResponse.data} />)}</Await></React.Suspense>
}


