import Transactions from "../transaction/Transactions";
import React, {useEffect, useState} from "react";
import {Account, Report, Transaction} from "../../components/modules/common/Models";
import MonetaApi from "../../services/MonetaApi";
import TxnSearchForm from "../report/TxnSearchForm";
import {TxnSearchFilters} from "../report/TxnSearchFilters";
import TxnReconcile from "../report/TxnReconcile";

const SearchTransaction = (props: {account: Account}) => {
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

    return <>
        <TxnReconcile report={report}></TxnReconcile>
        <Transactions openingBalance={report.openingBalance} closingBalance={report.closingBalance} records={report.transactions} />
    </>
}
export default SearchTransaction;