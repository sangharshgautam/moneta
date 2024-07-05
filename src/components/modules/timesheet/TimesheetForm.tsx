import React, {useEffect, useState} from 'react';
import {Button, Dropdown, Form, FormField, Input,} from 'semantic-ui-react'
import MonetaApi from "../../../services/MonetaApi";
import {Contract, NewTimesheet} from "../common/Models";


const TimesheetForm = <T extends NewTimesheet>(props: {timesheet: T, handleSubmit: (form: T) => void, handleCancel: () => void}) => {
    const [progress, setProgress] = useState(0)
    const [record, setRecord] = useState<T>(props.timesheet)

    const [contracts, setContracts] = useState<Contract[]>([])

    useEffect(() => {
        MonetaApi.list<Contract[]>('contract', setProgress).then(
            result => setContracts(result.data)
        )
    }, [])
    const handleSubmit = (e: any) => {
        e.preventDefault()
        props.handleSubmit(record);
    }
    const handleCancel = (e: any) => {
        e.preventDefault()
        props.handleCancel()
    }
    const options = contracts.map(item => {
        return {key: item.id, text: `${item.startDate} to ${item.endDate}`, value: item.id, selected:true, active: true}
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
                    options={options}
                    value={record.contract?.id}
                    loading={progress!==100}
                    onChange={(e, data) => setRecord({...record, agency: {id: data.value as number}})}
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
                <Input placeholder='Status' value={record.status} onChange={(e) => setRecord({...record, status: e.target.value})}/>
            </FormField>
            <Button type='submit' primary onClick={handleSubmit}>Submit</Button>
            <Button onClick={handleCancel}>Cancel</Button>
        </Form>
}
export default TimesheetForm;