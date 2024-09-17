import React, {useState} from "react";
import {Report} from "../../components/modules/common/Models";
import VATReportView from "../report/VATReportView";
import TxnReport from "../report/TxnReport";

const SearchTransaction = () => {
    const [report] = useState<Report>({
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