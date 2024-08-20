import TxnReconcile from "./TxnReconcile";
import React from "react";
import {Report} from "../../components/modules/common/Models";

const CorpTaxReport = (props: {report: Report}) => {
    return <TxnReconcile report={props.report}></TxnReconcile>
}
export default CorpTaxReport