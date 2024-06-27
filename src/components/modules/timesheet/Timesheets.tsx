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
import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import {Timesheet} from "../common/Models";
import MonetaApi from "../../../services/MonetaApi";
import {RouteResource} from "../common/RouteProp";

const Timesheets = (props: RouteResource) => {
    const [progress, setProgress] = useState(0)
    const [records, setRecords] = useState<Timesheet[]>([])

    const loadRecords = () => {
        const path = props.parentId ? `contract/${props.parentId}/${props.resource}` : props.resource;
        MonetaApi.list<Timesheet[]>(path, setProgress).then(
            result => setRecords(result.data)
        )
    }
    const handleDelete = (id: string | number | undefined) => {
        if(id){
            MonetaApi.delete<string>(props.resource, id, setProgress).then(
                result => {
                    console.log(result)
                    loadRecords()
                }
            )
        }
    }
    useEffect(() => {
       loadRecords()
    }, [])
    return  <Segment basic>
        <Header as='h3'>Timesheets</Header>
        {progress !== 100 && <div className="ui indicating progress" data-value={progress} data-total="100">
            <div className="bar"></div>
            <div className="label">Loading timesheets</div>
        </div>}
        {progress === 100 && <Table celled>
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
                {records.map(record =>
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
                            <Button as={NavLink} to="1" size='small' positive icon="right arrow"></Button>
                            <Button size='small' negative icon="trash" onClick={() => handleDelete(record.id)}></Button>
                        </TableCell>
                    </TableRow>)
                }
            </TableBody>
            <TableFooter fullWidth>
                <TableRow>
                    <TableHeaderCell colSpan='8'>
                        <Button as={NavLink} to="/moneta/secure/timesheet/add" size='small' primary floated='right'><Icon name='add' />Add Timesheet</Button>
                    </TableHeaderCell>
                </TableRow>
            </TableFooter>
        </Table>
        }
    </Segment>
}
export default Timesheets;