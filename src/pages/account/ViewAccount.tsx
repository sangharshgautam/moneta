import React from 'react';
import {Await, useLoaderData} from "react-router-dom";
import {OutletContentError, OutletContentLoading} from "../LazyOutlet";
import ViewItemSection from "../ViewItemSection";
import SearchTransaction from "./SearchTransaction";

const ViewAccount = () => {
    return <React.Suspense fallback={<OutletContentLoading resource={'account'} />}>
        {/*
        // @ts-ignore */}
        <Await resolve={useLoaderData().itemResponse} errorElement={<OutletContentError />}>{(itemResponse) => (
            <>
            <ViewItemSection resource="account"/>
            <SearchTransaction></SearchTransaction>
            </>
        )}
        </Await>
    </React.Suspense>
}
export default ViewAccount;