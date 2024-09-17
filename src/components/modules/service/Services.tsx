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
import {Service} from "../common/Models";
import MonetaApi from "../../../services/MonetaApi";

interface ServicesProps {
    actionPrefix: string,
    records: Service[]
}

const Services = (props: React.PropsWithChildren<ServicesProps>) => {
    const handleDelete = (id: string | number | undefined) => {
        if(id){
            MonetaApi.delete<string>('service', id).then(
                result => {
                    console.log(result)
                }
            )
        }
    }
    return  <Segment basic>
        <Header as='h3'>Services</Header>
        <Table celled>
            <TableHeader>
                <TableRow>
                    <TableHeaderCell>Name</TableHeaderCell>
                    <TableHeaderCell>Action</TableHeaderCell>
                </TableRow>
            </TableHeader>

            <TableBody>
                {props.records.map(record => <TableRow key={record.id}>
                    <TableCell key="name">
                        <NavLink to={`/service/${record.id}`}>{record.name}</NavLink>
                    </TableCell>
                    <TableCell key="action">
                        <Button as={NavLink} to={`/service/${record.id}/edit`} size='small' positive icon="edit"></Button>
                        <Button size='small' negative icon="trash" onClick={() => handleDelete(record.id)}></Button>
                    </TableCell>
                </TableRow>)}

            </TableBody>
            <TableFooter fullWidth>
                <TableRow>
                    <TableHeaderCell colSpan='3'>
                        <Button as={NavLink} to={props.actionPrefix+"add"} size='small' primary floated='right'><Icon name='add' />Add Service</Button>
                    </TableHeaderCell>
                </TableRow>
                {props.children}
            </TableFooter>
        </Table>
    </Segment>
}
export default Services;