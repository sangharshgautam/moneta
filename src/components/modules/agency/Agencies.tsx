import React from 'react';
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
} from 'semantic-ui-react'
import {NavLink} from "react-router-dom";
import MonetaApi from "../../../services/MonetaApi";
import {Agency} from "../common/Models";

const Agencies = (props: {records: Agency[]}) => {
    const handleDelete = (id: string | number | undefined) => {
        if(id){
            MonetaApi.delete<string>('agency', id).then(
                result => {
                    console.log(result)
                    // loadRecords()
                }
            )
        }
    }
    return <Segment basic>
        <Header as='h3'>Agencies</Header>
        <Table celled>
            <TableHeader>
                <TableRow>
                    <TableHeaderCell>Name</TableHeaderCell>
                    <TableHeaderCell>Contact</TableHeaderCell>
                    <TableHeaderCell>Website</TableHeaderCell>
                    <TableHeaderCell>Action</TableHeaderCell>
                </TableRow>
            </TableHeader>

            <TableBody>
                {props.records.map(record => <TableRow key={record.id}>
                    <TableCell key="name">
                        <NavLink to={`${record.id}`}>{record.name}</NavLink>
                    </TableCell>
                    <TableCell key="contact">{record.contact}</TableCell>
                    <TableCell key="website">{record.website}</TableCell>
                    <TableCell key="action">
                        <Button as={NavLink} to={`/secure/agency/${record.id}/edit`} size='small' positive icon="edit"></Button>
                        <Button size='small' negative icon="trash" onClick={() => handleDelete(record.id)}></Button>
                    </TableCell>
                </TableRow>)}

            </TableBody>
            <TableFooter fullWidth>
                <TableRow>
                    <TableHeaderCell colSpan='4'>
                        <Button as={NavLink} to="add" size='small' primary floated='right'><Icon name='add' />Add Agency</Button>
                    </TableHeaderCell>
                </TableRow>
            </TableFooter>
        </Table>
    </Segment>
}
export default Agencies;