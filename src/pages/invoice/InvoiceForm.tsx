import React, {useState} from 'react';
import {
    Button,
    Dropdown,
    Form,
    FormField,
    Icon,
    Input,
    Table,
    TableBody,
    TableFooter,
    TableHeader,
    TableHeaderCell,
    TableRow,
} from 'semantic-ui-react'
import {Contract, ContractService, NewInvoice, NewInvoiceItem} from "../../components/modules/common/Models";
import InvoiceItem from "./InvoiceItem";

const InvoiceForm = <T extends NewInvoice>(props: {contract: Contract, invoice: T, contractServices: ContractService[], handleSubmit: (form: NewInvoice) => void, handleCancel: () => void}) => {
    const [record, setRecord] = useState<NewInvoice>(props.invoice)
    const [items, setItems] = useState<NewInvoiceItem[]>(props.invoice.invoiceItems)

    const handleAdd = () => {
        // e.preventDefault()
        setItems((items) => [
            ...items,
            {
                contractService: undefined,
                days: 0,
                id: undefined
            }
        ]);
    }
    // const updateRecord = (index: number, updates: { }) => {
    //     // e.preventDefault()
    //     Object.assign(items[index], updates)
    //     // setRecords((t) => [...newTodos]);
    // }
    // const handleDelete = (e: any) => {
    //     e.preventDefault()
    // }
    const handleSubmit = (e: any) => {
        e.preventDefault()
        record[`invoiceItems`] = items
        props.handleSubmit(record);
    }
    const handleCancel = (e: any) => {
        e.preventDefault()
        props.handleCancel()
    }
    // const contracts = props.contracts.map(item => {
    //     return {key: item.id, text: item.refId, description: `${item.startDate} to ${item.endDate}`,value: item.id, selected:false, active: true}
    // });
    const status = [
        {key: 'draft', text: 'Draft', description: 'Draft',value: 'Draft', selected:true, active: true},
        {key: 'approved', text: 'Approved', description: 'Approved',value: 'Approved', selected:false, active: true}
    ];
   const listItems =  items.map((item, index) => <InvoiceItem index={index} item={item} services={props.contractServices} /> )
    return <Form>
            <FormField>
                <label>RefId</label>
                <Input placeholder='referenceID' value={record.refId}
                       onChange={(e) => setRecord({...record, refId: e.target.value})}
                />
            </FormField>
            <FormField>
                <label>Start Date</label>
                <input type="date" placeholder='Start data for the contract' value={record.startDate} onChange={(e) => setRecord({...record, startDate: e.target.value})}/>
            </FormField>
            <FormField>
                <label>End Date</label>
                <input type="date" placeholder='End data for the contract' value={record.endDate} onChange={(e) => setRecord({...record, endDate: e.target.value})}/>
            </FormField>
            <FormField>
                <label>Status</label>
                {/*
                // @ts-ignore */}
                <Dropdown onChange={(e, data) => setRecord({...record, status: data.value})}
                    placeholder='Status'
                    icon="mail"
                    className='icon'
                    labeled button
                    selection
                    options={status}
                    value={record.status}
                />
            </FormField>
            <Table celled>
                <TableHeader>
                    <TableRow>
                        <TableHeaderCell>Service</TableHeaderCell>
                        <TableHeaderCell>Rate</TableHeaderCell>
                        <TableHeaderCell>Days</TableHeaderCell>
                        <TableHeaderCell>Amount</TableHeaderCell>
                        <TableHeaderCell>Actions</TableHeaderCell>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {listItems}
                </TableBody>
                <TableFooter fullWidth>
                    <TableRow>
                        <TableHeaderCell colSpan='5'>
                            <Button size='small' primary floated='right' onClick={handleAdd}><Icon name='add' />Add Item</Button>
                        </TableHeaderCell>
                    </TableRow>
                </TableFooter>
            </Table>
            <Button type='submit' primary onClick={handleSubmit}>Save</Button>
            <Button onClick={handleCancel}>Cancel</Button>
        </Form>
}
export default InvoiceForm;