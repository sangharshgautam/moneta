import React, {useEffect, useState} from 'react';
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
import {RouteResource} from "../common/RouteProp";

const Agencies = (props: RouteResource) => {
    const [progress, setProgress] = useState(0)
    const [records, setRecords] = useState<Agency[]>([])
    const loadRecords =  () => {
        MonetaApi.list<Agency[]>(props.resource, setProgress).then(
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
    })
    return <Segment basic>
        <Header as='h3'>Agencies</Header>
        {progress !== 100 && <div className="ui indicating progress" data-value={progress} data-total="100">
            <div className="bar"></div>
            <div className="label">Loading agencies</div>
        </div>}
        {progress === 100 && <Table celled>
            <TableHeader>
                <TableRow>
                    <TableHeaderCell>Id</TableHeaderCell>
                    <TableHeaderCell>Name</TableHeaderCell>
                    <TableHeaderCell>Contact</TableHeaderCell>
                    <TableHeaderCell>Website</TableHeaderCell>
                    <TableHeaderCell>Action</TableHeaderCell>
                </TableRow>
            </TableHeader>

            <TableBody>
                {records.map(record => <TableRow key={record.id}>
                    <TableCell key="id">{record.id}</TableCell>
                    <TableCell key="name">
                        <NavLink to={`${record.id}`}>{record.name}</NavLink>
                    </TableCell>
                    <TableCell key="contact">{record.contact}</TableCell>
                    <TableCell key="website">{record.website}</TableCell>
                    <TableCell key="action">
                        <Button as={NavLink} to={`${record.id}/edit`} size='small' positive icon="edit"></Button>
                        <Button size='small' negative icon="trash" onClick={() => handleDelete(record.id)}></Button>
                    </TableCell>
                </TableRow>)}

            </TableBody>
            <TableFooter fullWidth>
                <TableRow>
                    <TableHeaderCell colSpan='5'>
                        <Button as={NavLink} to="add" size='small' primary floated='right'><Icon name='add' />Add Agency</Button>
                    </TableHeaderCell>
                </TableRow>
            </TableFooter>
        </Table>}
    </Segment>
}
export default Agencies;