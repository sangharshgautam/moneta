import React from "react";
import {Report} from "../../components/modules/common/Models";
import {Header, Segment, Table, TableCell, TableHeader, TableHeaderCell, TableRow} from "semantic-ui-react";

const CorpTaxReportView = (props: {report: Report}) => {
    return <Segment basic>
        <Header as='h3'>Tax</Header>
        <Table celled striped>
            <TableHeader>
                <TableRow key="header">
                    <TableHeaderCell>FY Ending</TableHeaderCell>
                    <TableHeaderCell>Revenue</TableHeaderCell>
                    <TableHeaderCell>VAT</TableHeaderCell>
                    <TableHeaderCell>Turnover - sales</TableHeaderCell>
                    <TableHeaderCell>Staff Costs</TableHeaderCell>
                    <TableHeaderCell>Other Expense</TableHeaderCell>
                    <TableHeaderCell>Tax Calculated</TableHeaderCell>
                    <TableHeaderCell>Tax Paid</TableHeaderCell>
                    <TableHeaderCell>Due (rounded)</TableHeaderCell>
                    <TableHeaderCell>Profit</TableHeaderCell>
                </TableRow>
            </TableHeader>
            <TableHeader>
                {props.report.taxReports.map(yearReport =>
                    <TableRow key={yearReport.year}>
                        <TableHeaderCell>{yearReport.year}</TableHeaderCell>
                        <TableCell>£ {yearReport.revenue}</TableCell>
                        <TableCell>£ {yearReport.calculatedVAT}</TableCell>
                        <TableCell>£ {yearReport.turnover}</TableCell>
                        <TableCell>£ {yearReport.staffCosts}</TableCell>
                        <TableCell>£ {yearReport.expense}</TableCell>
                        <TableCell>£ {yearReport.calculatedTax}</TableCell>
                        <TableCell>£ {yearReport.paidTax}</TableCell>
                        <TableCell>£ {yearReport.taxDue}</TableCell>
                        <TableCell>£ {yearReport.profit}</TableCell>
                    </TableRow>
                )}
            </TableHeader>
        </Table>
    </Segment>
}
export default CorpTaxReportView