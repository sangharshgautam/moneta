import React, {useEffect, useState} from 'react';
import {Await, useLoaderData} from "react-router-dom";
import {OutletContentError, OutletContentLoading} from "../LazyOutlet";
import ViewItemSection from "../ViewItemSection";
import {Segment, Tab, TabPane} from "semantic-ui-react";
import {Account, Report} from "../../components/modules/common/Models";
import TxnSearchForm from "./TxnSearchForm";
import {TxnSearchFilters} from "./TxnSearchFilters";
import MonetaApi from "../../services/MonetaApi";
import TxnReport from "./TxnReport";
import VATReportView from "./VATReportView";
import CorpTaxReportView from "./CorpTaxReportView";
import TxnChart from "./TxnChart";

const ViewReport = () => {
    const [account, setAccount] = useState<Account>()
    const [report, setReport] = useState<Report>({
        vatReports: [],
        taxReports: [],
        transactions:[],
        openingBalance: 0,
        closingBalance: 0
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
        { menuItem: 'Transaction', render: () => <TabPane><TxnReport report={report}></TxnReport></TabPane> },
        { menuItem: 'VAT', render: () => <TabPane><VATReportView report={report}></VATReportView></TabPane> },
        { menuItem: 'Tax', render: () => <TabPane><CorpTaxReportView report={report}></CorpTaxReportView></TabPane> },
    ]
    return <React.Suspense fallback={<OutletContentLoading resource={'account'} />}>
        {/*
        // @ts-ignore */}
        <Await resolve={useLoaderData().itemResponse} errorElement={<OutletContentError />}>{(itemResponse) => (
            <>
                <ViewItemSection resource="account"/>
                <TxnSearchForm startDate={txnFilters.startDate} endDate={txnFilters.endDate} handleSubmit={handleSubmit}></TxnSearchForm>
                <TxnChart report={report}></TxnChart>
                <Segment basic>
                    <Tab panes={panes} />
                </Segment>
            </>
        )}
        </Await>
    </React.Suspense>
}
export default ViewReport