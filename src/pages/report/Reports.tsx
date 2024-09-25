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
import {Account} from "../../components/modules/common/Models";
import MonetaApi from "../../services/MonetaApi";

const Reports = (props: {records: Account[]}) => {
    const handleDelete = (id: string | number | undefined) => {
        if(id){
            MonetaApi.delete<string>('account', id).then(
                result => {
                    console.log(result)
                }
            )
        }
    }
    return  <Segment basic>
        <Header as='h3'>Reports - Accounts</Header>
        <Table celled>
            <TableHeader>
                <TableRow>
                    <TableHeaderCell>RefId</TableHeaderCell>
                    <TableHeaderCell>Name</TableHeaderCell>
                    <TableHeaderCell>Balance</TableHeaderCell>
                    <TableHeaderCell>Action</TableHeaderCell>
                </TableRow>
            </TableHeader>

            <TableBody>
                {props.records.map(account =>
                    <TableRow key={account.id}>
                        <TableCell key="refId">
                            <NavLink to={`/report/${account.id}`}>{account.id}</NavLink>
                        </TableCell>
                        <TableCell key="name">{account.name}</TableCell>
                        <TableCell key="balance">£ {account.balance}</TableCell>
                        <TableCell key="action">
                            <Button as={NavLink} to={`/report/${account.id}/edit`} size='small' positive icon="edit"></Button>
                            <Button size='small' negative icon="trash" onClick={() => handleDelete(account.id)}></Button>
                        </TableCell>
                    </TableRow>
                    )
                }
            </TableBody>
            <TableFooter fullWidth>
                <TableRow>
                    <TableHeaderCell colSpan='9'>
                        <Button as={NavLink} to="account/add" size='small' primary floated='right'><Icon name='add' />Add Account</Button>
                    </TableHeaderCell>
                </TableRow>
            </TableFooter>
        </Table>
    </Segment>
}
export default Reports;