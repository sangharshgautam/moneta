import React from "react";
import {Dimmer, Loader} from "semantic-ui-react";
import {Await, useLoaderData} from "react-router-dom";
import Agencies from "../components/modules/agency/Agencies";
import Contracts from "../components/modules/contract/Contracts";
import Timesheets from "../components/modules/timesheet/Timesheets";
import CashFlow from "../components/modules/dashboard/CashFlow";

export const OutletContentError = () => <h1>Error..</h1>
export const OutletContentLoading = (props: {resource: string}) => <Dimmer active><Loader inverted>Loading {props.resource}</Loader></Dimmer>
export const AgenciesPage = () => {
    // @ts-ignore
    return <React.Suspense fallback={<OutletContentLoading resource="agencies"/>}><Await resolve={useLoaderData().listResponse} errorElement={<OutletContentError/>}>{(listResponse) => (<Agencies records={listResponse.data} />)}</Await></React.Suspense>
}
export const ContractsPage = () => {
    // @ts-ignore
    return <React.Suspense fallback={<OutletContentLoading resource="contracts" />}><Await resolve={useLoaderData().listResponse} errorElement={<OutletContentError/>}>{(listResponse) => (<Contracts records={listResponse.data} />)}</Await></React.Suspense>
}
export const TimesheetsPage = () => {
    // @ts-ignore
    return <React.Suspense fallback={<OutletContentLoading resource="timesheets" />}><Await resolve={useLoaderData().listResponse} errorElement={<OutletContentError/>}>{(listResponse) => (<Timesheets records={listResponse.data} />)}</Await></React.Suspense>
}
export const Dashboard = () => {
    // @ts-ignore
    return <React.Suspense fallback={<OutletContentLoading resource="timesheets" />}><Await resolve={useLoaderData().listResponse} errorElement={<OutletContentError/>}>{(listResponse) => (<CashFlow records={listResponse.data} />)}</Await></React.Suspense>
}


