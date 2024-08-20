import TxnReconcile from "./TxnReconcile";
import React from "react";
import {Report} from "../../components/modules/common/Models";

const VATReport = (props: {report: Report}) => {
    return <TxnReconcile report={props.report}></TxnReconcile>
}
export default VATReport