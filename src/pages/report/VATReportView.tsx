import {Report} from "../../components/modules/common/Models";
import {
    Header,
    Segment, Table,
    TableCell,
    TableHeader,
    TableHeaderCell,
    TableRow
} from "semantic-ui-react";
import React from "react";

const VATReportView = (props: {report: Report}) => {
    return <Segment basic>
        <Header as='h3'>VAT</Header>
        <Table celled striped>
            <TableHeader>
                <TableRow key="header">
                    <TableHeaderCell>Quarter</TableHeaderCell>
                    <TableHeaderCell>Sales</TableHeaderCell>
                    <TableHeaderCell>VAT Calculated</TableHeaderCell>
                    <TableHeaderCell>VAT Paid</TableHeaderCell>
                    <TableHeaderCell>VAT Due (rounded)</TableHeaderCell>
                </TableRow>
            </TableHeader>
            <TableHeader>
                {props.report.vatReports.map(quarterReport =>
                    <TableRow key={quarterReport.quarter}>
                        <TableHeaderCell>Q{quarterReport.quarter} {quarterReport.year}</TableHeaderCell>
                        <TableCell>£ {quarterReport.revenue}</TableCell>
                        <TableCell>£ {quarterReport.calculatedVAT}</TableCell>
                        <TableCell>£ {quarterReport.paidVAT}</TableCell>
                        <TableCell>£ {quarterReport.vatDue}</TableCell>
                    </TableRow>
                )}
            </TableHeader>
        </Table>
    </Segment>
}
export default VATReportView