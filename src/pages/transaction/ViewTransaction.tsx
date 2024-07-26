import React from 'react';
import {Await, useLoaderData} from "react-router-dom";
import {OutletContentError, OutletContentLoading} from "../LazyOutlet";
import ViewItemSection from "../ViewItemSection";

const ViewAccount = () => {
    return <>
        <ViewItemSection resource="transaction"/>

        {/*
        // @ts-ignore */}
        <React.Suspense fallback={<OutletContentLoading resource="invoices" />}><Await resolve={useLoaderData().itemResponse} errorElement={<OutletContentError />}>{(itemResponse) => (<><InvoiceItems records={itemResponse.data.invoiceItems} /><Accounts records={itemResponse.data.transactions} /></>)}</Await></React.Suspense>
    </>
}
export default ViewAccount;