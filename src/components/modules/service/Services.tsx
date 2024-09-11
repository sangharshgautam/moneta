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

const Services = (props: {records: any[]}) => {
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
                {props.records.map(edge => edge.node).map(record => <TableRow key={record.id}>
                    <TableCell key="name">
                        <NavLink to={`/service/${record.id}`}>{record.name}</NavLink>
                    </TableCell>
                    <TableCell key="action">
                        <Button as={NavLink} to={`/service/${record.id}/edit`} size='small' positive icon="edit"></Button>
                        {/*<Button size='small' negative icon="trash" onClick={() => handleDelete(record.id)}></Button>*/}
                    </TableCell>
                </TableRow>)}
            </TableBody>
        </Table>
    </Segment>
}
export default Services;