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

const Agencies = (props: {records: any[]}) => {
    const keys = ['name', 'email', 'website']
    return <Segment basic>
        <Header as='h3'>Agencies</Header>
        <Table celled>
            <TableHeader>
                <TableRow>
                    {keys.map(key => <TableHeaderCell>{key}</TableHeaderCell>)}
                </TableRow>
            </TableHeader>

            <TableBody>
                {props.records.map((edge: any) => edge.node).map((record: any) =>
                    <TableRow key={record.id}>
                    {keys.map((key, index) => (
                        <>
                        {index === 0 && <TableCell key={key}><NavLink to={`${record.id}`}>{record?.[`${key}`]}</NavLink></TableCell>}
                        {index > 0 && <TableCell key={key}>{record?.[`${key}`]}</TableCell>}
                        </>
                    ))}
                </TableRow>)}

            </TableBody>
        </Table>
    </Segment>
}
export default Agencies;