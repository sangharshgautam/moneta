import React, {useState} from "react";
import {CorpTaxReport, Expense, ExpenseDTO, Report} from "../../components/modules/common/Models";
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
    const sum = (arr: ExpenseDTO[] | undefined) => {
        if(arr){
            return Math.round(arr.reduce((sum, prop) => sum + prop.amount, 0));
        }
        return 0
    }
    const depreciation = () => {
        // @ts-ignore
        return Math.round(sum(yearReport?.projected.depreciation));
    }
    const taxable = () => {
        // @ts-ignore
        const val = yearReport?.projected.turnover - sum(yearReport?.projected.staffCosts) - sum(yearReport?.other);
        return Math.round(val);
    }
    const tax = () => {
        return Math.round(taxable() * 19/100);
    }
    const profit = () => {
        return Math.round(taxable() - tax() - depreciation());
    }
    const displayValue = (amount: number) => {
        return amount === 0 ? '-' : '£ '+amount;
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
                    <TableHeaderCell>Depreciation</TableHeaderCell>
                    <TableHeaderCell>Other Charges</TableHeaderCell>
                    <TableHeaderCell>Tax</TableHeaderCell>
                    <TableHeaderCell>Tax Paid</TableHeaderCell>
                    <TableHeaderCell>Tax due (rounded)</TableHeaderCell>
                    <TableHeaderCell>Profit before Tax</TableHeaderCell>
                    <TableHeaderCell>Profit After Tax</TableHeaderCell>
                    <TableHeaderCell>Balance</TableHeaderCell>
                    <TableHeaderCell>Action</TableHeaderCell>
                </TableRow>
            </TableHeader>
            <TableHeader>
                {props.report.taxReports.sort((y1,y2) => y1.year - y2.year).map(yearReport =>
                    <TableRow key={yearReport.year}>
                        <TableHeaderCell>{yearReport.year}</TableHeaderCell>
                        <TableCell>{displayValue(yearReport.projected.revenue)}</TableCell>
                        <TableCell>{displayValue(yearReport.projected.vat)}</TableCell>
                        <TableCell>{displayValue(yearReport.projected.turnover)}</TableCell>
                        <TableCell>
                            Reported: {displayValue(sum(yearReport?.actual.staffCosts))}<br/>
                            Projected: {displayValue(sum(yearReport.projected.staffCosts))}
                        </TableCell>
                        <TableCell>
                            Reported: {displayValue(sum(yearReport?.actual.depreciation))}<br/>
                            Projected: {displayValue(sum(yearReport.projected.depreciation))}
                        </TableCell>
                        <TableCell>
                            Reported: {displayValue(sum(yearReport?.actual.other))}<br/>
                            Projected: {displayValue(sum(yearReport?.projected.other))}
                        </TableCell>
                        <TableCell>
                            Reported: {displayValue(yearReport?.actual.tax)}<br/>
                            Projected: {displayValue(yearReport.projected.tax)}
                        </TableCell>
                        <TableCell>£ {yearReport.actual.paidTax}</TableCell>
                        <TableCell>
                            Reported: {yearReport?.actual.taxDue}<br/>
                            Projected: {yearReport.projected.taxDue}
                        </TableCell>
                        <TableCell>
                            Reported: {displayValue(yearReport?.actual.profitBeforeTax)}<br/>
                            Projected: {displayValue(yearReport.projected.profitBeforeTax)}
                        </TableCell>
                        <TableCell>
                            Reported: {displayValue(yearReport?.actual.profitAfterTax)}<br/>
                            Projected: {displayValue(yearReport.projected.profitAfterTax)}
                        </TableCell>
                        <TableCell>
                            Actual: {displayValue(yearReport?.projected.balance)}<br/>
                            Projected: {displayValue(yearReport.actual.balance)}
                        </TableCell>
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
                    <Header><Grid columns={2}>
                        <GridRow>
                            <GridColumn>
                                <h4>Turnover</h4>
                            </GridColumn>
                            <GridColumn>
                                <h4>{yearReport?.actual.turnover}</h4>
                            </GridColumn>
                        </GridRow>
                        <GridRow>
                            <GridColumn>
                                <h4>Staff cost</h4>
                            </GridColumn>
                            <GridColumn>
                                <h4>{displayValue(sum(yearReport?.actual.staffCosts))}</h4>
                            </GridColumn>
                        </GridRow>
                        <GridRow>
                            <GridColumn>
                                <h4>Depreciation and other amounts written off assets</h4>
                            </GridColumn>
                            <GridColumn>
                                <h4>{displayValue(sum(yearReport?.actual.depreciation))}</h4>
                            </GridColumn>
                        </GridRow>
                        <GridRow>
                            <GridColumn>
                                <h4>Other charges</h4>
                            </GridColumn>
                            <GridColumn>
                                <h4>{displayValue(sum(yearReport?.actual.other))}</h4>
                            </GridColumn>
                        </GridRow>
                        <GridRow>
                            <GridColumn>
                                <h4>Tax</h4>
                            </GridColumn>
                            <GridColumn>
                                {/*
                                // @ts-ignore */}
                                <h4>{displayValue(yearReport?.actual.tax)}</h4>
                            </GridColumn>
                        </GridRow>
                        <GridRow>
                            <GridColumn>
                                <h4>Profit</h4>
                            </GridColumn>
                            <GridColumn>
                                {/*
                                // @ts-ignore */}
                                <h4>{displayValue(yearReport?.actual.profitAfterTax)}</h4>
                            </GridColumn>
                        </GridRow>
                    </Grid></Header>
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
                            <GridColumn textAlign='right'>
                                £ {yearReport?.actual.turnover}
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
                        {yearReport?.actual.staffCosts.map(prop => <GridRow key={prop.description}>
                            <GridColumn>
                                <h5>&nbsp;&nbsp;&nbsp;{prop.description}</h5>
                            </GridColumn>
                            <GridColumn>
                            </GridColumn>
                            <GridColumn textAlign='right'>
                                {displayValue(prop.amount)}
                            </GridColumn>
                        </GridRow>)}
                        <GridRow>
                            <GridColumn>
                            </GridColumn>
                            <GridColumn>
                            </GridColumn>
                            <GridColumn textAlign='right'>
                                {displayValue(sum(yearReport?.actual.staffCosts))}
                            </GridColumn>
                        </GridRow>
                        <GridRow>
                            <GridColumn>
                                <h4>Depreciation and other amounts written off assets</h4>
                            </GridColumn>
                        </GridRow>
                        {yearReport?.actual.depreciation.map(prop => <GridRow key={prop.description}>
                            <GridColumn>
                                <h5>&nbsp;&nbsp;&nbsp;{prop.description}</h5>
                            </GridColumn>
                            <GridColumn>
                            </GridColumn>
                            <GridColumn textAlign='right'>
                                {displayValue(prop.amount)}
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
                        {yearReport?.actual.other.map(prop => <GridRow key={prop.description}>
                            <GridColumn>
                                <h5>&nbsp;&nbsp;&nbsp;{prop.description}</h5>
                            </GridColumn>
                            <GridColumn>
                            </GridColumn>
                            <GridColumn textAlign='right'>
                                {displayValue(prop.amount)}
                            </GridColumn>
                        </GridRow>)}
                        <GridRow>
                            <GridColumn>
                            </GridColumn>
                            <GridColumn>
                            </GridColumn>
                            <GridColumn textAlign='right'>
                                {displayValue(sum(yearReport?.actual.other))}
                            </GridColumn>
                        </GridRow>
                        <GridRow>
                            <GridColumn>
                                <h4>Profit on ordinary activities before taxation</h4>
                            </GridColumn>
                            <GridColumn>
                            </GridColumn>
                            <GridColumn textAlign='right'>
                                {/*
                                // @ts-ignore */}
                                {displayValue(yearReport?.actual.profitBeforeTax)}
                            </GridColumn>
                        </GridRow>
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