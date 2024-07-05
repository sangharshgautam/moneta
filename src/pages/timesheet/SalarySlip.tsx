import React from "react";
import {OutletContentError, OutletContentLoading} from "../LazyOutlet";
import {Await, useLoaderData} from "react-router-dom";
import {
    Grid,
    GridColumn,
    GridRow,
    Header,
    Segment,
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHeader,
    TableHeaderCell,
    TableRow
} from "semantic-ui-react";

const SalarySlip = () => {
    return <React.Suspense fallback={<OutletContentLoading resource="agency" />}>
        {/*
        // @ts-ignore */}
        <Await resolve={useLoaderData().itemResponse} errorElement={<OutletContentError />}>{(itemResponse) => (
            <Segment basic>
                <Header as='h3'>Income Statement</Header>
                    <Grid columns='two' divided>
                        <GridRow>
                            <GridColumn>
                                <Table celled>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHeaderCell colSpan='4'>Company Income received</TableHeaderCell>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>Company Income and Costs</TableCell>
                                            <TableCell>{itemResponse.data.salarySlip.totalEarning}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Apprenticeship Levy</TableCell>
                                            <TableCell>{itemResponse.data.salarySlip.apprenticeshipLevy}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Employer's NI</TableCell>
                                            <TableCell>{itemResponse.data.salarySlip.employerNI}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Employer's Pension</TableCell>
                                            <TableCell>{itemResponse.data.salarySlip.employerPension}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Company Margin</TableCell>
                                            <TableCell>{itemResponse.data.salarySlip.companyMargin}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                    {/*<TableFooter fullWidth>*/}
                                    {/*    <TableRow>*/}
                                    {/*        <TableHeaderCell colSpan='4'>*/}
                                    {/*            <Button as={NavLink} to="edit" size='small' primary floated='right'><Icon name='edit' /> Edit</Button>*/}
                                    {/*        </TableHeaderCell>*/}
                                    {/*    </TableRow>*/}
                                    {/*</TableFooter>*/}
                                </Table>
                            </GridColumn>
                            <GridColumn>
                                <Table celled>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHeaderCell colSpan='3'>Assignment Rate(s)</TableHeaderCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableHeaderCell>Units</TableHeaderCell>
                                            <TableHeaderCell>Rate</TableHeaderCell>
                                            <TableHeaderCell>Total</TableHeaderCell>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow key={itemResponse.data.id}>
                                            <TableCell>{itemResponse.data.days}</TableCell>
                                            <TableCell key="rate">{itemResponse.data.contract.rate}</TableCell>
                                            <TableCell>{itemResponse.data.salarySlip.totalEarning}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                    {/*<TableFooter fullWidth>*/}
                                    {/*    <TableRow>*/}
                                    {/*        <TableHeaderCell colSpan='4'>*/}
                                    {/*            <Button as={NavLink} to="edit" size='small' primary floated='right'><Icon name='edit' /> Edit</Button>*/}
                                    {/*        </TableHeaderCell>*/}
                                    {/*    </TableRow>*/}
                                    {/*</TableFooter>*/}
                                </Table>
                            </GridColumn>
                        </GridRow>
                        <GridRow>
                            <GridColumn>
                                <Table celled>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHeaderCell colSpan='5'>Payments</TableHeaderCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableHeaderCell colSpan='2'>Description</TableHeaderCell>
                                            <TableHeaderCell>Units</TableHeaderCell>
                                            <TableHeaderCell>Rate(£)</TableHeaderCell>
                                            <TableHeaderCell>Amount(£)</TableHeaderCell>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell colSpan='2'>Basic Rate</TableCell>
                                            <TableCell>TBD</TableCell>
                                            <TableCell>TBD</TableCell>
                                            <TableCell>TBD</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell colSpan='2'>Holiday Pay</TableCell>
                                            <TableCell>TBD</TableCell>
                                            <TableCell>TBD</TableCell>
                                            <TableCell>TBD</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell colSpan='2'>Additional Taxable Wage</TableCell>
                                            <TableCell>TBD</TableCell>
                                            <TableCell>TBD</TableCell>
                                            <TableCell>TBD</TableCell>
                                        </TableRow>
                                    </TableBody>
                                    <TableFooter>
                                        <TableRow>
                                            <TableHeaderCell colSpan='4'>Total Payments</TableHeaderCell>
                                            <TableHeaderCell>{itemResponse.data.salarySlip.totalPayment}</TableHeaderCell>
                                        </TableRow>
                                    </TableFooter>
                                </Table>
                            </GridColumn>
                            <GridColumn>
                                <Table celled>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHeaderCell colSpan='3'>Deductions</TableHeaderCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableHeaderCell colSpan='2'>Description</TableHeaderCell>
                                            <TableHeaderCell>Amount(£)</TableHeaderCell>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell colSpan='2'>PAYE(Income tax)</TableCell>
                                            <TableCell>{itemResponse.data.salarySlip.incomeTax}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell colSpan='2'>Employee's NIC</TableCell>
                                            <TableCell>{itemResponse.data.salarySlip.employeeNI}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell colSpan='2'>Employee's Pension Deductions</TableCell>
                                            <TableCell>{itemResponse.data.salarySlip.employeePension}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                    <TableFooter>
                                        <TableRow>
                                            <TableHeaderCell colSpan='2'>Total Deductions</TableHeaderCell>
                                            <TableHeaderCell>{itemResponse.data.salarySlip.totalDeductions}</TableHeaderCell>
                                        </TableRow>
                                    </TableFooter>
                                </Table>
                            </GridColumn>
                        </GridRow>
                        <GridRow>
                            <GridColumn>
                                <Table celled>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHeaderCell colSpan='3'>This Period</TableHeaderCell>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell colSpan='2'>Total Taxable Pay</TableCell>
                                            <TableCell>{itemResponse.data.salarySlip.totalTaxablePay}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell colSpan='2'>Earnings for NICs</TableCell>
                                            <TableCell>{itemResponse.data.salarySlip.niablePay}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell colSpan='2'>Expenses</TableCell>
                                            <TableCell>{itemResponse.data.salarySlip.expenses}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell colSpan='2'>Net Payment</TableCell>
                                            <TableCell>{itemResponse.data.salarySlip.netPayment}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </GridColumn>
                        </GridRow>
                    </Grid>
            </Segment>
        )}
        </Await>
    </React.Suspense>
}
export default SalarySlip;