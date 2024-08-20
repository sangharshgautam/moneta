import {Report} from "../../components/modules/common/Models";
import {
    Container,
    Header,
    Segment, Table,
    TableBody,
    TableCell,
    TableHeader,
    TableHeaderCell,
    TableRow
} from "semantic-ui-react";
import React from "react";

const TxnReconcile = (props: {report: Report}) => {
    return <Segment basic>
        <Header as='h3'>VAT</Header>
        <Table celled striped>
            <TableHeader>
                <TableRow key="header">
                    <TableHeaderCell>Quarter</TableHeaderCell>
                    <TableHeaderCell>Revenue</TableHeaderCell>
                    <TableHeaderCell>Calculated VAT</TableHeaderCell>
                    <TableHeaderCell>Paid VAT</TableHeaderCell>
                </TableRow>
            </TableHeader>
            <TableHeader>
                <TableRow>
                    <TableHeaderCell>Q1 (APR to JUN 2020)</TableHeaderCell>
                    <TableCell>{props.report.revenueQ1}</TableCell>
                    <TableCell>{props.report.calculatedVATQ1}</TableCell>
                    <TableCell>{props.report.paidVATQ1}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHeaderCell>Q2 (JUL to SEP 2020)</TableHeaderCell>
                    <TableCell>{props.report.revenueQ2}</TableCell>
                    <TableCell>{props.report.calculatedVATQ2}</TableCell>
                    <TableCell>{props.report.paidVATQ2}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHeaderCell>Q3 (OCT to DEC 2020)</TableHeaderCell>
                    <TableCell>{props.report.revenueQ3}</TableCell>
                    <TableCell>{props.report.calculatedVATQ3}</TableCell>
                    <TableCell>{props.report.paidVATQ3}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHeaderCell>Q4 (JAN to MAR 2021)</TableHeaderCell>
                    <TableCell>{props.report.revenueQ4}</TableCell>
                    <TableCell>{props.report.calculatedVATQ4}</TableCell>
                    <TableCell>{props.report.paidVATQ4}</TableCell>
                </TableRow>
            </TableHeader>
        </Table>
    </Segment>
}
export default TxnReconcile