import React from 'react';
import {Await, useLoaderData} from "react-router-dom";
import Timesheets from "../../components/modules/timesheet/Timesheets";
import {OutletContentError, OutletContentLoading} from "../LazyOutlet";
import ViewItemSection from "../ViewItemSection";
import Services from "../../components/modules/service/Services";
import Invoices from "../invoice/Invoices";
import ContractServices from "../contract-services/ContractServices";

const ViewContractPage = () => {
    return <>
        <ViewItemSection resource="contract"/>
        {/*
        // @ts-ignore */}
        <React.Suspense fallback={<OutletContentLoading resource="services" />}><Await resolve={useLoaderData().servicesResponse} errorElement={<OutletContentError />}>{(servicesResponse) => (<ContractServices records={servicesResponse.data} actionPrefix="service/"/>)}</Await></React.Suspense>
        {/*
        // @ts-ignore */}
        <React.Suspense fallback={<OutletContentLoading resource="invoices" />}><Await resolve={useLoaderData().invoices} errorElement={<OutletContentError />}>{(invoices) => (<Invoices records={invoices.data} />)}</Await></React.Suspense>
        {/*
        // @ts-ignore */}
        <React.Suspense fallback={<OutletContentLoading resource="timesheets" />}><Await resolve={useLoaderData().listResponse} errorElement={<OutletContentError />}>{(listResponse) => (<Timesheets records={listResponse.data} />)}</Await></React.Suspense>
    </>
}
export default ViewContractPage;