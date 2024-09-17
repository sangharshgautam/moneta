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
import {ContractService} from "../../components/modules/common/Models";
import MonetaApi from "../../services/MonetaApi";

interface ServicesProps {
    actionPrefix: string,
    records: ContractService[]
}

const ContractServices = (props: React.PropsWithChildren<ServicesProps>) => {
    const handleDelete = (id: string | number | undefined) => {
        if(id){
            MonetaApi.delete<string>('contractservice', id).then(
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
                    <TableHeaderCell>Rate</TableHeaderCell>
                    <TableHeaderCell>Action</TableHeaderCell>
                </TableRow>
            </TableHeader>

            <TableBody>
                {props.records.map(record => <TableRow key={record.service.id}>
                    <TableCell key="name">
                        <NavLink to={`/service/${record.service.id}`}>{record.service.name}</NavLink>
                    </TableCell>
                    <TableCell key="rate">{record.rate}</TableCell>
                    <TableCell key="action">
                        <Button as={NavLink} to={`/service/${record.service.id}/edit`} size='small' positive icon="edit"></Button>
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
export default ContractServices;