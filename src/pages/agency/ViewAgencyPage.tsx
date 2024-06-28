import React from 'react';
import {Await, NavLink, useLoaderData} from "react-router-dom";
import Contracts from "../../components/modules/contract/Contracts";
import {OutletContentError, OutletContentLoading} from "../LazyOutlet";
import ViewItemSection from "../ViewItemSection";

const ViewAgencyPage = () => {
    return <>
        <ViewItemSection />
        {/*
        // @ts-ignore */}
        <React.Suspense fallback={<OutletContentLoading resource="contracts" />}><Await resolve={useLoaderData().listResponse} errorElement={<OutletContentError />}>{(listResponse) => (<Contracts records={listResponse.data} />)}</Await></React.Suspense>
    </>
}
export default ViewAgencyPage;