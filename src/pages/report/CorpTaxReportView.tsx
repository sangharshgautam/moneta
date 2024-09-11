import React, {useState} from "react";
import {CorpTaxReport, Report} from "../../components/modules/common/Models";
import {
    Button, Grid, GridColumn, GridRow,
    Header, Image,
    Modal, ModalActions, ModalContent, ModalDescription, ModalHeader,
    Segment,
    Table,
    TableCell,
    TableHeader,
    TableHeaderCell,
    TableRow
} from "semantic-ui-react";
import {NavLink} from "react-router-dom";

const CorpTaxReportView = (props: {report: Report}) => {
    const [yearReport, setYearReport] = useState<CorpTaxReport>();
    const [open, setOpen] = React.useState(false)

    const openReport = (rpt: CorpTaxReport) => {
        setYearReport(rpt);
        setOpen(true)
    }
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
                    <TableHeaderCell>Action</TableHeaderCell>
                </TableRow>
            </TableHeader>
            <TableHeader>
                {props.report.taxReports.sort((y1,y2) => y1.year - y2.year).map(yearReport =>
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
                        <TableCell key="action">
                            <Button onClick={() => openReport(yearReport)} size='small' positive icon="zoom-in"></Button>
                        </TableCell>
                    </TableRow>
                )}
            </TableHeader>
        </Table>
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
        >
            <ModalHeader>Income Statement {yearReport?.year}</ModalHeader>
            <ModalContent image>
                <Image size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' wrapped />
                <ModalDescription>
                    {/*<Header>Default Profile Image</Header>*/}
                    {/*<p>*/}
                    {/*    {JSON.stringify(yearReport?.other)}*/}
                    {/*</p>*/}
                    <Grid columns={3}>
                        <GridRow>
                            <GridColumn>
                                <h4>Turnover</h4>
                            </GridColumn>
                            <GridColumn>

                            </GridColumn>
                            <GridColumn>
                            </GridColumn>
                        </GridRow>
                        <GridRow>
                            <GridColumn>
                                <h5>&nbsp;&nbsp;&nbsp;Sales</h5>
                            </GridColumn>
                            <GridColumn>

                            </GridColumn>
                            <GridColumn>
                                £ {yearReport?.turnover}
                            </GridColumn>
                        </GridRow>
                        <GridRow>
                            <GridColumn>
                                <h4>Staff costs</h4>
                            </GridColumn>
                            <GridColumn>

                            </GridColumn>
                            <GridColumn>
                            </GridColumn>
                        </GridRow>
                        {yearReport?.staffCost.map(prop => <GridRow key={prop.description}>
                            <GridColumn>
                                <h5>&nbsp;&nbsp;&nbsp;{prop.description}</h5>
                            </GridColumn>
                            <GridColumn>
                            </GridColumn>
                            <GridColumn>
                                £ {prop.amount}
                            </GridColumn>
                        </GridRow>)}
                        <GridRow>
                            <GridColumn>
                                <h4>Depreciation and other amounts written off assets</h4>
                            </GridColumn>
                        </GridRow>
                        {yearReport?.depreciation.map(prop => <GridRow key={prop.description}>
                            <GridColumn>
                                <h5>&nbsp;&nbsp;&nbsp;{prop.description}</h5>
                            </GridColumn>
                            <GridColumn>
                            </GridColumn>
                            <GridColumn>
                                £ {prop.amount}
                            </GridColumn>
                        </GridRow>)}

                        <GridRow>
                            <GridColumn>
                                <h4>Other</h4>
                            </GridColumn>
                            <GridColumn>
                            </GridColumn>
                            <GridColumn>
                            </GridColumn>
                        </GridRow>
                        {yearReport?.other.map(prop => <GridRow key={prop.description}>
                            <GridColumn>
                                <h5>&nbsp;&nbsp;&nbsp;{prop.description}</h5>
                            </GridColumn>
                            <GridColumn>
                            </GridColumn>
                            <GridColumn>
                                £ {prop.amount}
                            </GridColumn>
                        </GridRow>)}
                    </Grid>
                </ModalDescription>
            </ModalContent>
            <ModalActions>
                <Button color='black' onClick={() => setOpen(false)}>
                    Nope
                </Button>
                <Button
                    content="OK"
                    labelPosition='right'
                    icon='checkmark'
                    onClick={() => setOpen(false)}
                    positive
                />
            </ModalActions>
        </Modal>
    </Segment>
}
export default CorpTaxReportView