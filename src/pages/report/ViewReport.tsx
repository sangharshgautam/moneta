import React, {useEffect, useState} from 'react';
import {Await, useLoaderData} from "react-router-dom";
import {OutletContentError, OutletContentLoading} from "../LazyOutlet";
import ViewItemSection from "../ViewItemSection";
import {Segment, Tab, TabPane} from "semantic-ui-react";
import VATReport from "./VATReport";
import TransactionReport from "./TransactionReport";
import {Account, Report} from "../../components/modules/common/Models";
import TxnSearchForm from "./TxnSearchForm";
import {TxnSearchFilters} from "./TxnSearchFilters";
import MonetaApi from "../../services/MonetaApi";

const ViewReport = () => {
    const [account, setAccount] = useState<Account>()
    const [report, setReport] = useState<Report>({
        openingBalance: 0,
        closingBalance: 0,
        revenueQ1: 0,
        revenueQ2: 0,
        revenueQ3: 0,
        revenueQ4: 0,
        calculatedVATQ1: 0,
        calculatedVATQ2: 0,
        calculatedVATQ3: 0,
        calculatedVATQ4: 0,
        paidVATQ1: 0,
        paidVATQ2: 0,
        paidVATQ3: 0,
        paidVATQ4: 0,
        transactions: []
    })
    const txnFilters = {
        startDate: "2020-04-01",
        endDate: "2021-03-31"
    }
    const handleSubmit = (txnFilters: TxnSearchFilters) => {
        if(account){
            MonetaApi.search<Report>(`report/account/${account.id}/transaction`, txnFilters).then(
                result => setReport(result.data)
            )
        }
    }
    useEffect(() => {
        handleSubmit(txnFilters);
    }, [account])
    // @ts-ignore
    useLoaderData().itemResponse.then(resp => setAccount(resp.data));
    const panes = [
        { menuItem: 'Transaction', render: () => <TabPane><TransactionReport report={report}></TransactionReport></TabPane> },
        { menuItem: 'VAT', render: () => <TabPane><VATReport report={report}></VATReport></TabPane> },
        { menuItem: 'Corp Tax', render: () => <TabPane>Tab 3 Content</TabPane> },
    ]
    return <React.Suspense fallback={<OutletContentLoading resource={'account'} />}>
        {/*
        // @ts-ignore */}
        <Await resolve={useLoaderData().itemResponse} errorElement={<OutletContentError />}>{(itemResponse) => (
            <>
                <ViewItemSection resource="account"/>
                <TxnSearchForm startDate={txnFilters.startDate} endDate={txnFilters.endDate} handleSubmit={handleSubmit}></TxnSearchForm>
                <Segment basic>
                    <Tab panes={panes} />
                </Segment>
            </>
        )}
        </Await>
    </React.Suspense>
}
export default ViewReport;