import React from 'react';
import {Await, NavLink, useLoaderData} from "react-router-dom";
import Timesheets from "../../components/modules/timesheet/Timesheets";
import {OutletContentError, OutletContentLoading} from "../LazyOutlet";
import ViewItemSection from "../ViewItemSection";
import Services from "../../components/modules/service/Services";

const ViewContractPage = () => {
    return <>
        <ViewItemSection resource="contract"/>
            {/*
            // @ts-ignore */}
        <React.Suspense fallback={<OutletContentLoading resource="services" />}><Await resolve={useLoaderData().servicesResponse} errorElement={<OutletContentError />}>{(servicesResponse) => (<Services records={servicesResponse.data} actionPrefix="service/"/>)}</Await></React.Suspense>
            {/*
            // @ts-ignore */}
        <React.Suspense fallback={<OutletContentLoading resource="timesheets" />}><Await resolve={useLoaderData().listResponse} errorElement={<OutletContentError />}>{(listResponse) => (<Timesheets records={listResponse.data} />)}</Await></React.Suspense>
    </>
}
export default ViewContractPage;