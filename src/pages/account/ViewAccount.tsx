import React from 'react';
import {Await, useLoaderData} from "react-router-dom";
import {OutletContentError, OutletContentLoading} from "../LazyOutlet";
import ViewItemSection from "../ViewItemSection";
import SearchTransaction from "./SearchTransaction";
import Transactions from "../transaction/Transactions";

const ViewAccount = () => {
    return <React.Suspense fallback={<OutletContentLoading resource={'account'} />}>
        {/*
        // @ts-ignore */}
        <Await resolve={useLoaderData().itemResponse} errorElement={<OutletContentError />}>{(itemResponse) => (
            <ViewItemSection resource="account"/>
        )}
        </Await>
        {/*
        // @ts-ignore */}
        <Await resolve={useLoaderData().transactions} errorElement={<OutletContentError />}>{(transactions) => (
            <Transactions records={transactions.data}/>
        )}
        </Await>
    </React.Suspense>
}
export default ViewAccount;