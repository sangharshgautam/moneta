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
import {NavLink} from "react-router-dom";
import React from "react";
import {Contract} from "../common/Models";
import MonetaApi from "../../../services/MonetaApi";

const Contracts = (props: {records: Contract[]}) => {
    const handleDelete = (id: string | number | undefined) => {
        if(id){
            MonetaApi.delete<string>('contract', id).then(
                result => {
                    console.log(result)
                }
            )
        }
    }
    return  <Segment basic>
        <Header as='h3'>Contracts</Header>
        <Table celled>
            <TableHeader>
                <TableRow>
                    <TableHeaderCell>RefId</TableHeaderCell>
                    <TableHeaderCell>Agency</TableHeaderCell>
                    <TableHeaderCell>IR35</TableHeaderCell>
                    <TableHeaderCell>Start Date</TableHeaderCell>
                    <TableHeaderCell>End Date</TableHeaderCell>
                    <TableHeaderCell>Action</TableHeaderCell>
                </TableRow>
            </TableHeader>

            <TableBody>
                {props.records.map(record => <TableRow key={record.id}>
                    <TableCell key="refId">
                        <NavLink to={`/contract/${record.id}`}>{record.refId}</NavLink>
                    </TableCell>
                    <TableCell key="agencyId">
                        <NavLink to={`/agency/${record.agency.id}`}>{record.agency.name}</NavLink>
                    </TableCell>
                    <TableCell key="type">{record.type}</TableCell>
                    <TableCell key="start">{record.startDate}</TableCell>
                    <TableCell key="end">{record.endDate}</TableCell>
                    <TableCell key="action">
                        <Button as={NavLink} to={`/contract/${record.id}/edit`} size='small' positive icon="edit"></Button>
                        <Button size='small' negative icon="trash" onClick={() => handleDelete(record.id)}></Button>
                    </TableCell>
                </TableRow>)}

            </TableBody>
            <TableFooter fullWidth>
                <TableRow>
                    <TableHeaderCell colSpan='6'>
                        <Button as={NavLink} to="add" size='small' primary floated='right'><Icon name='add' />Add Contract</Button>
                    </TableHeaderCell>
                </TableRow>
            </TableFooter>
        </Table>
    </Segment>
}
export default Contracts;