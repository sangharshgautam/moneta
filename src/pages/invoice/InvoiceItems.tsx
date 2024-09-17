import {InvoiceItem} from "../../components/modules/common/Models";
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
import MonetaApi from "../../services/MonetaApi";

const InvoiceItems = (props: {records: InvoiceItem[]}) => {
    const handleDelete = (id: string | number | undefined) => {
        if(id){
            MonetaApi.delete<string>('invoice-item', id).then(
                result => {
                    console.log(result)
                }
            )
        }
    }
    return  <Segment basic>
        <Header as='h3'>Tasks</Header>
        <Table celled>
            <TableHeader>
                <TableRow>
                    <TableHeaderCell>Service</TableHeaderCell>
                    <TableHeaderCell>Contract</TableHeaderCell>
                    <TableHeaderCell>Rate</TableHeaderCell>
                    <TableHeaderCell>Days</TableHeaderCell>
                    <TableHeaderCell>Amount</TableHeaderCell>
                    <TableHeaderCell>Action</TableHeaderCell>
                </TableRow>
            </TableHeader>

            <TableBody>
                {props.records.map(record =>
                    <TableRow key={record.id}>
                        <TableCell key="service">
                            <NavLink to={`/service/${record.contractService.service.id}`}>{record.contractService.service.name}</NavLink>
                        </TableCell>
                        <TableCell key="contract">
                            <NavLink to={`/contract/${record.contractService.contract.id}`}>{record.contractService.contract.refId}</NavLink>
                        </TableCell>
                        <TableCell key="rate">{record.contractService.rate}</TableCell>
                        <TableCell key="days">{record.days}</TableCell>
                        <TableCell key="status">£ {record.amount}</TableCell>
                        <TableCell key="action">
                            <Button as={NavLink} to={`/invoice-item/${record.id}/edit`} size='small' positive icon="edit"></Button>
                            <Button size='small' negative icon="trash" onClick={() => handleDelete(record.id)}></Button>
                        </TableCell>
                    </TableRow>)
                }
            </TableBody>
            <TableFooter fullWidth>
                <TableRow>
                    <TableHeaderCell colSpan='3'></TableHeaderCell>
                    <TableHeaderCell>
                        Subtotal
                    </TableHeaderCell>
                    <TableHeaderCell colSpan='2'>
                        Subtotal
                    </TableHeaderCell>
                </TableRow>
                <TableRow>
                    <TableHeaderCell colSpan='6'>
                        <Button as={NavLink} to="invoice-item/add" size='small' primary floated='right'><Icon name='add' />Add Task</Button>
                    </TableHeaderCell>
                </TableRow>
            </TableFooter>
        </Table>
    </Segment>
}
export default InvoiceItems;