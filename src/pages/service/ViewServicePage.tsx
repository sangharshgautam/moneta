import React from 'react';
import {Await, useLoaderData} from "react-router-dom";
import {OutletContentError, OutletContentLoading} from "../LazyOutlet";
import ViewItemSection from "../ViewItemSection";
import Services from "../../components/modules/service/Services";
import Contracts from "../../components/modules/contract/Contracts";

const ViewServicePage = () => {
    return <>
        <ViewItemSection />
        {/*
        // @ts-ignore */}
        <React.Suspense fallback={<OutletContentLoading resource="services" />}><Await resolve={useLoaderData().listResponse} errorElement={<OutletContentError />}>{(listResponse) => (<Contracts records={listResponse.data} />)}</Await></React.Suspense>
    </>
}
export default ViewServicePage;