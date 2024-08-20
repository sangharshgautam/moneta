import React from "react";
import {Report} from "../../components/modules/common/Models";
import Transactions from "../transaction/Transactions";

const TransactionReport = (props: {report: Report}) => {
    return <Transactions openingBalance={props.report.openingBalance} closingBalance={props.report.closingBalance} records={props.report.transactions} />
}
export default TransactionReport