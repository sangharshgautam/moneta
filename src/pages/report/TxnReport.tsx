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
import {Report, Transaction} from "../../components/modules/common/Models";
import MonetaApi from "../../services/MonetaApi";

const TxnReport = (props: {report: Report}) => {
    const handleDelete = (id: string | number | undefined) => {
        if(id){
            MonetaApi.delete<string>('transaction', id).then(
                result => {
                    console.log(result)
                }
            )
        }
    }
    const getAmount = (type: string, record: Transaction) => {
        return record.type === type ? '£ '+record.amount: '';
    }
    const approved = (txn: Transaction) => {
        return txn.approved ? <Icon color='green' name='checkmark' size='large' /> : <Icon color='red' name='close' size='large' />
    }
    return <Segment basic>
        <Header as='h3'>Transactions</Header>
        <Table celled striped>
            <TableHeader>
                <TableRow key="header">
                    <TableHeaderCell>refId</TableHeaderCell>
                    <TableHeaderCell>Date</TableHeaderCell>
                    <TableHeaderCell>Category</TableHeaderCell>
                    <TableHeaderCell>Description</TableHeaderCell>
                    <TableHeaderCell>IN</TableHeaderCell>
                    <TableHeaderCell>OUT</TableHeaderCell>
                    <TableHeaderCell>Approved</TableHeaderCell>
                    <TableHeaderCell>Balance</TableHeaderCell>
                    <TableHeaderCell>Action</TableHeaderCell>
                </TableRow>
            </TableHeader>

            <TableBody>
                <TableRow>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell>OPENING BALANCE</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableBody></TableBody>
                    <TableCell>{props.report.openingBalance}</TableCell>
                    <TableCell></TableCell>
                </TableRow>
                {props.report.transactions.map(record =>
                    <TableRow key={record.id}>
                        <TableCell key="refId">
                            <NavLink to={`/secure/transaction/${record.id}`}>{record.id}</NavLink>
                        </TableCell>
                        <TableCell key="date">{record.date}</TableCell>
                        <TableCell key="category">{record.category}</TableCell>
                        <TableCell key="description">{record.description}</TableCell>
                        <TableCell key="in">{getAmount('IN', record)}</TableCell>
                        <TableCell key="out">{getAmount('OUT', record)}</TableCell>
                        <TableCell>
                            {approved(record)}
                        </TableCell>
                        <TableCell key="amount">£ {record.balance}</TableCell>
                            <TableCell key="action">
                                <Button as={NavLink} to={`/secure/transaction/${record.id}/edit`} size='small' positive
                                        icon="edit"></Button>
                                <Button size='small' negative icon="trash"
                                        onClick={() => handleDelete(record.id)}></Button>
                            </TableCell>
                    </TableRow>
                    )
                }
                <TableRow>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell>CLOSING BALANCE</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableBody></TableBody>
                    <TableCell>{props.report.closingBalance}</TableCell>
                    <TableCell></TableCell>
                </TableRow>
            </TableBody>
            <TableFooter fullWidth>
                <TableRow key="footer">
                    <TableHeaderCell colSpan='10'>
                        <Button as={NavLink} to="transaction/add" size='small' primary floated='right'><Icon name='add' />Add Transaction</Button>
                    </TableHeaderCell>
                </TableRow>
            </TableFooter>
        </Table>
    </Segment>
}
export default TxnReport;