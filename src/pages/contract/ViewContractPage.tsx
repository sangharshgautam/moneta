import React from 'react';
import {Await, useLoaderData} from "react-router-dom";
import Timesheets from "../../components/modules/timesheet/Timesheets";
import {OutletContentError, OutletContentLoading} from "../LazyOutlet";
import ViewItemSection from "../ViewItemSection";

const ViewContractPage = () => {
    return <>
        <ViewItemSection />
        {/*
        // @ts-ignore */}
        <React.Suspense fallback={<OutletContentLoading resource="timesheets" />}><Await resolve={useLoaderData().listResponse} errorElement={<OutletContentError />}>{(listResponse) => (<Timesheets records={listResponse.data} />)}</Await></React.Suspense>
    </>
}
export default ViewContractPage;