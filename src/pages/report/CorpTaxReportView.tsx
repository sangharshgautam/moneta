import React from "react";
import {Report} from "../../components/modules/common/Models";
import {Header, Segment, Table, TableCell, TableHeader, TableHeaderCell, TableRow} from "semantic-ui-react";

const CorpTaxReportView = (props: {report: Report}) => {
    return <Segment basic>
        <Header as='h3'>Tax</Header>
        <Table celled striped>
            <TableHeader>
                <TableRow key="header">
                    <TableHeaderCell>Year</TableHeaderCell>
                    <TableHeaderCell>Revenue</TableHeaderCell>
                    <TableHeaderCell>VAT Paid</TableHeaderCell>
                    <TableHeaderCell>Turnover - sales</TableHeaderCell>
                    <TableHeaderCell>Staff Costs</TableHeaderCell>
                    <TableHeaderCell>Other Expense</TableHeaderCell>
                    <TableHeaderCell>Tax Due</TableHeaderCell>
                    <TableHeaderCell>Tax Paid</TableHeaderCell>
                    <TableHeaderCell>Due</TableHeaderCell>
                </TableRow>
            </TableHeader>
            <TableHeader>
                {props.report.taxReports.map(quarterReport =>
                    <TableRow key={quarterReport.year}>
                        <TableHeaderCell>{quarterReport.year}</TableHeaderCell>
                        <TableCell>£ {quarterReport.revenue}</TableCell>
                        <TableCell>£ {quarterReport.paidVAT}</TableCell>
                        <TableCell>£ {quarterReport.turnover.sales}</TableCell>
                        <TableCell>£ {quarterReport.staffCosts}</TableCell>
                        <TableCell>£ {quarterReport.expense}</TableCell>
                        <TableCell>£ {quarterReport.calculatedTax}</TableCell>
                        <TableCell>£ {quarterReport.paidTax}</TableCell>
                        <TableCell>£ {quarterReport.taxDue}</TableCell>
                    </TableRow>
                )}
            </TableHeader>
        </Table>
    </Segment>
}
export default CorpTaxReportView