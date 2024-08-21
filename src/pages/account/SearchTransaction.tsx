import React, {useEffect, useState} from "react";
import {Account, Report, Transaction} from "../../components/modules/common/Models";
import VATReportView from "../report/VATReportView";
import TxnReport from "../report/TxnReport";

const SearchTransaction = (props: {account: Account}) => {
    const [report, setReport] = useState<Report>({
        vatReports: [],
        taxReports: [],
        transactions: [],
        openingBalance: 0,
        closingBalance: 0
    })

    return <>
        <VATReportView report={report}></VATReportView>
        <TxnReport report={report} />
    </>
}
export default SearchTransaction;