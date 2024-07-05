import React from 'react';
import SalarySlip from "./SalarySlip";
import ViewTimesheetSection from "./ViewTimesheetSection";
import {OutletContentError, OutletContentLoading} from "../LazyOutlet";
import {Await, useLoaderData} from "react-router-dom";

const ViewTimesheetPage = () => {
    return <React.Suspense fallback={<OutletContentLoading resource="agency" />}>
        {/*
        // @ts-ignore */}
        <Await resolve={useLoaderData().itemResponse} errorElement={<OutletContentError />}>{(itemResponse) => (
            <>
                <ViewTimesheetSection />
                <SalarySlip></SalarySlip>
            </>

        )}
        </Await>
    </React.Suspense>
}
export default ViewTimesheetPage;