import React, {useContext, useEffect, useState} from "react";
import {BusinessContext} from "../../App";
import {loadResource, loadResourceList} from "../../Constants";
import {Invoice, ReconcileTimesheet, Timesheet} from "../../components/modules/common/Models";
import {Header, Segment, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow} from "semantic-ui-react";
import {NavLink} from "react-router-dom";

const Reconcile = () => {
    const businessId = useContext(BusinessContext)

    const [timesheets, setTimesheets] = useState<Timesheet[]>([])
    const [groupedTimesheets, setGroupedTimesheets] = useState<Map<string, number>>(new Map<string, number>());

    const getInvoiceForTimesheet = (timesheets: Timesheet[]) => {
        return timesheets.map(timesheet => {
            return {
                invoice_urls: loadResource<Invoice>(businessId, 'invoice', timesheet.invoiceId)
            }
        });
    }
    useEffect(() => {
        loadResourceList<Timesheet[]>(businessId, 'timesheet').then(result => setTimesheets(result.data))

    }, [businessId]);
    const displayValue = (amount: number) => {
        return amount === 0 ? '-' : '£ '+amount;
    }
    const invoiced = () => {
        loadResource<Invoice>(businessId, 'invoice', '994226678706247701').then(result => console.log(result.data))
    }
    useEffect(() => {
        setGroupedTimesheets(timesheets.reduce((groups: Map<string, number>, ts: Timesheet) => {
            groups.set(ts.invoiceId, (groups.get(ts.invoiceId) || 0) + ts.total)
            return groups;
        }, new Map<string, number>()))

    }, [timesheets]);


    return <Segment basic>
        <Header as='h3'>Reconciliation</Header>
        {/*
        // @ts-ignore */}
        {/*{[...groupedTimesheets.keys()].map((key) => <h3>{key} : {groupedTimesheets.get(key)}</h3>)}*/}
        <Table celled>
            <TableHeader>
                <TableRow>
                    <TableHeaderCell>Timesheet</TableHeaderCell>
                    <TableHeaderCell>Agency</TableHeaderCell>
                    <TableHeaderCell>Contract</TableHeaderCell>
                    <TableHeaderCell>Invoice</TableHeaderCell>
                    <TableHeaderCell>Start</TableHeaderCell>
                    <TableHeaderCell>End</TableHeaderCell>
                    <TableHeaderCell>Days</TableHeaderCell>
                    <TableHeaderCell>Status</TableHeaderCell>
                    <TableHeaderCell>Total Earning</TableHeaderCell>
                    <TableHeaderCell>Net Payment</TableHeaderCell>
                    <TableHeaderCell>Action</TableHeaderCell>
                </TableRow>
            </TableHeader>

            <TableBody>
                {timesheets.map(record =>
                    <TableRow key={record.id}>
                        <TableCell key="refId">
                            <NavLink to={`/timesheet/${record.id}`}>{displayValue(record.total)}</NavLink>
                        </TableCell>
                        <TableCell key="agencyId">
                            <NavLink to={`/agency/${record.contractService.contract.agency.id}`}>{record.contractService.contract.agency.name}</NavLink>
                        </TableCell>
                        <TableCell key="contractId">
                            <NavLink to={`/contract/${record.contractService.contract.id}`}>{record.contractService.contract.refId}</NavLink>
                        </TableCell>
                        <TableCell>
                            <NavLink to={`/invoice/${record.invoiceId}`}>{record.invoiceId}</NavLink>
                        </TableCell>
                        <TableCell key="startDate">{record.startDate}</TableCell>
                        <TableCell key="endDate">{record.endDate}</TableCell>
                        <TableCell key="days">{record.days}</TableCell>
                        <TableCell key="status">{record.status}</TableCell>
                        <TableCell key="status">{record.salarySlip.totalEarning}</TableCell>
                        <TableCell key="status">{record.salarySlip.netPayment}</TableCell>
                    </TableRow>)
                }
            </TableBody>
        </Table>
    </Segment>
}
export default  Reconcile;