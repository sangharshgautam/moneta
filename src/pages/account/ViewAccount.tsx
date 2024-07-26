import React from 'react';
import {Await, useLoaderData} from "react-router-dom";
import {OutletContentError, OutletContentLoading} from "../LazyOutlet";
import ViewItemSection from "../ViewItemSection";
import Transactions from "../transaction/Transactions";

const ViewAccount = () => {
    return <>
        <ViewItemSection resource="account"/>

        {/*
        // @ts-ignore */}
        <React.Suspense fallback={<OutletContentLoading resource="accounts" />}><Await resolve={useLoaderData().transactionsLoader} errorElement={<OutletContentError />}>{(transactionsLoader) => (<Transactions records={transactionsLoader.data} />)}</Await></React.Suspense>
    </>
}
export default ViewAccount;