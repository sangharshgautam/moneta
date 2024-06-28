import {
    Button,
    Header,
    Icon,
    Segment,
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHeader,
    TableHeaderCell,
    TableRow
} from "semantic-ui-react";
import React from "react";
import {NavLink} from "react-router-dom";
import {Timesheet} from "../common/Models";
import MonetaApi from "../../../services/MonetaApi";

const Timesheets = (props: {records: Timesheet[]}) => {
    const handleDelete = (id: string | number | undefined) => {
        if(id){
            MonetaApi.delete<string>('timesheet', id).then(
                result => {
                    console.log(result)
                }
            )
        }
    }
    return  <Segment basic>
        <Header as='h3'>Timesheets</Header>
        <Table celled>
            <TableHeader>
                <TableRow>
                    <TableHeaderCell>RefId</TableHeaderCell>
                    <TableHeaderCell>Agency</TableHeaderCell>
                    <TableHeaderCell>Contract</TableHeaderCell>

                    <TableHeaderCell>Start</TableHeaderCell>
                    <TableHeaderCell>End</TableHeaderCell>
                    <TableHeaderCell>Days</TableHeaderCell>
                    <TableHeaderCell>Status</TableHeaderCell>
                    <TableHeaderCell>Action</TableHeaderCell>
                </TableRow>
            </TableHeader>

            <TableBody>
                {props.records.map(record =>
                    <TableRow key={record.id}>
                        <TableCell key="refId">
                            <NavLink to={`/moneta/secure/timesheet/${record.id}`}>{record.refId}</NavLink>
                        </TableCell>
                        <TableCell key="agencyId">
                            <NavLink to={`/moneta/secure/agency/${record.contract.agency.id}`}>{record.contract.agency.name}</NavLink>
                        </TableCell>
                        <TableCell key="contractId">
                            <NavLink to={`/moneta/secure/contract/${record.contract.id}`}>{record.contract.refId}</NavLink>
                        </TableCell>
                        <TableCell key="startDate">{record.startDate}</TableCell>
                        <TableCell key="endDate">{record.endDate}</TableCell>
                        <TableCell key="days">{record.days}</TableCell>
                        <TableCell key="status">{record.status}</TableCell>
                        <TableCell key="action">
                            <Button as={NavLink} to={`/moneta/secure/timesheet/${record.id}/edit`} size='small' positive icon="edit"></Button>
                            <Button size='small' negative icon="trash" onClick={() => handleDelete(record.id)}></Button>
                        </TableCell>
                    </TableRow>)
                }
            </TableBody>
            <TableFooter fullWidth>
                <TableRow>
                    <TableHeaderCell colSpan='8'>
                        <Button as={NavLink} to="add" size='small' primary floated='right'><Icon name='add' />Add Timesheet</Button>
                    </TableHeaderCell>
                </TableRow>
            </TableFooter>
        </Table>
    </Segment>
}
export default Timesheets;