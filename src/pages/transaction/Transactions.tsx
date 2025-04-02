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
import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import {Transaction} from "../../components/modules/common/Models";
import MonetaApi from "../../services/MonetaApi";

const Transactions = (props: {openingBalance?: number, closingBalance?: number, records: Transaction[]}) => {
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
    let balance = 0
    return  <Segment basic>
        <Header as='h3'>Transactions</Header>
        <Table celled striped>
            <TableHeader>
                <TableRow key="header">
                    <TableHeaderCell>RefId</TableHeaderCell>
                    <TableHeaderCell>Date</TableHeaderCell>
                    <TableHeaderCell>Category</TableHeaderCell>
                    <TableHeaderCell>Description</TableHeaderCell>
                    <TableHeaderCell>IN</TableHeaderCell>
                    <TableHeaderCell>OUT</TableHeaderCell>
                    <TableHeaderCell>Balance</TableHeaderCell>
                    <TableHeaderCell>Action</TableHeaderCell>
                </TableRow>
            </TableHeader>

            <TableBody>
                <TableRow>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell>CLOSING BALANCE</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell>{props.closingBalance}</TableCell>
                    <TableBody></TableBody>
                    <TableBody></TableBody>
                </TableRow>
                {props.records.sort((t1, t2) => new Date(t1.date).getTime() - new Date(t2.date).getTime()).map(record => {balance = record.type == 'DEPOSIT' ?  balance + record.amount : balance - record.amount; record.balance = balance; return record}).map(record =>
                    <TableRow key={record.id}>
                        <TableCell key="refId">
                            <NavLink to={`/transaction/${record.id}`}>{record.id}</NavLink>
                        </TableCell>
                        <TableCell key="date">{record.date}</TableCell>
                        <TableCell key="category">{record.category}</TableCell>
                        <TableCell key="description">{record.description}</TableCell>
                        <TableCell key="in">{getAmount('DEPOSIT', record)}</TableCell>
                        <TableCell key="out">{getAmount('WITHDRAWAL', record)}</TableCell>
                        <TableCell key="amount">£ {record.balance}</TableCell>
                        <TableCell key="action">
                            <Button as={NavLink} to={`/transaction/${record.id}/edit`} size='small' positive icon="edit"></Button>
                            <Button size='small' negative icon="trash" onClick={() => handleDelete(record.id)}></Button>
                        </TableCell>
                    </TableRow>
                )
                }
                <TableRow>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell>OPENING BALANCE</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell>{props.openingBalance}</TableCell>
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
export default Transactions;