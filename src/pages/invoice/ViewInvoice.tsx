import React from 'react';
import {Await, useLoaderData} from "react-router-dom";
import {OutletContentError, OutletContentLoading} from "../LazyOutlet";
import ViewItemSection from "../ViewItemSection";
import InvoiceItems from "./InvoiceItems";
import Payments from "../payment/Payments";

const ViewInvoice = () => {
    return <>
        <ViewItemSection resource="invoice"/>

        {/*
        // @ts-ignore */}
        <React.Suspense fallback={<OutletContentLoading resource="invoices" />}><Await resolve={useLoaderData().itemResponse} errorElement={<OutletContentError />}>{(itemResponse) => (<><InvoiceItems records={itemResponse.data.invoiceItems} />
            {/*<Payments records={itemResponse.data.invoicePayments} />*/}
        </>)}</Await></React.Suspense>
    </>
}
export default ViewInvoice;