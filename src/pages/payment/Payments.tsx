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
import {Payment} from "../../components/modules/common/Models";
import MonetaApi from "../../services/MonetaApi";

const Payments = (props: {records: Payment[]}) => {
    const handleDelete = (id: string | number | undefined) => {
        if(id){
            MonetaApi.delete<string>('payment', id).then(
                result => {
                    console.log(result)
                }
            )
        }
    }
    return  <Segment basic>
        <Header as='h3'>Payments</Header>
        <Table celled>
            <TableHeader>
                <TableRow>
                    <TableHeaderCell>RefId</TableHeaderCell>
                    <TableHeaderCell>Payment Date</TableHeaderCell>
                    <TableHeaderCell>Amount</TableHeaderCell>
                    <TableHeaderCell>Action</TableHeaderCell>
                </TableRow>
            </TableHeader>

            <TableBody>
                {props.records.map(record =>
                    <TableRow key={record.id}>
                        <TableCell key="refId">
                            <NavLink to={`/payment/${record.id}`}>{record.id}</NavLink>
                        </TableCell>
                        <TableCell key="date">{record.date}</TableCell>
                        <TableCell key="amount">£ {record.amount}</TableCell>
                        <TableCell key="action">
                            <Button as={NavLink} to={`/payment/${record.id}/edit`} size='small' positive icon="edit"></Button>
                            <Button size='small' negative icon="trash" onClick={() => handleDelete(record.id)}></Button>
                        </TableCell>
                    </TableRow>
                )
                }
            </TableBody>
            <TableFooter fullWidth>
                <TableRow>
                    <TableHeaderCell colSpan='9'>
                        <Button as={NavLink} to="payment/add" size='small' primary floated='right'><Icon name='add' />Add Invoice</Button>
                    </TableHeaderCell>
                </TableRow>
            </TableFooter>
        </Table>
    </Segment>
}
export default Payments;