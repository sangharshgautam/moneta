import React, {useState} from 'react';
import {Button, Dropdown, Form, FormField, Input,} from 'semantic-ui-react'
import {Contract, ContractService, NewTimesheet} from "../common/Models";


const TimesheetForm = <T extends NewTimesheet>(props: {contractId: number, timesheet: T, contracts: Contract[], contractServices: ContractService[], handleSubmit: (form: T) => void, handleCancel: () => void}) => {
    const [record, setRecord] = useState<T>(props.timesheet)

    const handleSubmit = (e: any) => {
        e.preventDefault()
        props.handleSubmit(record);
    }
    const handleCancel = (e: any) => {
        e.preventDefault()
        props.handleCancel()
    }
    const contracts = props.contracts.map(item => {
        return {key: item.id, text: item.refId, description: `${item.startDate} to ${item.endDate}`,value: item.id, selected:false, active: true}
    });
    const status = [
        {key: 'draft', text: 'Draft', description: 'Draft',value: 'Draft', selected:true, active: true},
        {key: 'approved', text: 'Approved', description: 'Approved',value: 'Approved', selected:false, active: true}
    ];
    const services = props.contractServices.map(item => {
        return {key: item.id, text: item.service.name, value: item.id, selected:true, active: true}
    });
    return <Form>
            <FormField>
                <label>Contract</label>
                <Dropdown
                    placeholder='Select Contract'
                    icon="mail"
                    className='icon'
                    labeled button
                    selection
                    options={contracts}
                    value={props.contractId}
                    disabled={true}
                />
            </FormField>
            <FormField>
                <label>Contract Service</label>
                <Dropdown
                    placeholder='Select Contract Service'
                    icon="cog"
                    className='icon'
                    labeled button
                    selection
                    options={services}
                    value={record.contractService?.id}
                    onChange={(e, data) => setRecord({...record, contractService: {id: data.value as number}})}
                />
            </FormField>
            <FormField>
                <label>RefId</label>
                <input type="text" placeholder='Ref Id for the Timesheet' value={record.refId} onChange={(e) => setRecord({...record, refId: e.target.value})}/>
            </FormField>
            <FormField>
                <label>Start Date</label>
                <input type="date" placeholder='Start data for the Timesheet' value={record.startDate} onChange={(e) => setRecord({...record, startDate: e.target.value})}/>
            </FormField>
            <FormField>
                <label>End Date</label>
                <input type="date" placeholder='End data for the Timesheet' value={record.endDate} onChange={(e) => setRecord({...record, endDate: e.target.value})}/>
            </FormField>
            <FormField>
                <Input label={{ basic: true, content: 'Days' }} placeholder='No of days' value={record.days} onChange={(e) => setRecord({...record, days: e.target.value as unknown as number})}/>
            </FormField>
            <FormField>
                <label>Status</label>
                <Dropdown
                    placeholder='Select State'
                    icon="mail"
                    className='icon'
                    labeled button
                    selection
                    options={status}
                    value={record.status}
                    onChange={(e, data) => setRecord({...record, status: data.value})}
                />
            </FormField>
            <Button type='submit' primary onClick={handleSubmit}>Submit</Button>
            <Button onClick={handleCancel}>Cancel</Button>
        </Form>
}
export default TimesheetForm;