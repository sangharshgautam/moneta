import React, {useContext, useEffect, useState} from 'react';
import {Button, Dropdown, Form, FormField,} from 'semantic-ui-react'
import MonetaApi from "../../../services/MonetaApi";
import {Agency, NewContract} from "../common/Models";
import {BusinessContext} from "../../../App";


const ContractForm = <T extends NewContract>(props: {contract: T, handleSubmit: (contractForm: T) => void, handleCancel: () => void}) => {
    const [progress, setProgress] = useState(0)
    const [record, setRecord] = useState<T>(props.contract)

    const [agencies, setAgencies] = useState<Agency[]>([])
    const businessId = useContext(BusinessContext);
    useEffect(() => {
        MonetaApi.list<Agency[]>(businessId, 'agency', setProgress).then(
            result => setAgencies(result.data)
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
    const options = agencies.map(agency => {
        return {key: agency.id, text: agency.name, value: agency.id, selected:true, active: true}
    });
    return <Form>
            <FormField>
                <label>Agency/Client</label>
                <Dropdown
                    placeholder='Select Agency'
                    icon="umbrella"
                    className='icon'
                    labeled button
                    selection
                    options={options}
                    value={record.agency?.id}
                    loading={progress!==100}
                    onChange={(e, data) => setRecord({...record, agency: {id: data.value as number}})}
                />
            </FormField>
            <FormField>
                <label>RefId</label>
                <input type="text" placeholder='Ref Id for the contract' value={record.refId} onChange={(e) => setRecord({...record, refId: e.target.value})}/>
            </FormField>
            <FormField>
                <label>Start Date</label>
                <input type="date" placeholder='Start date for the contract' value={record.startDate} onChange={(e) => setRecord({...record, startDate: e.target.value})}/>
            </FormField>
            <FormField>
                <label>End Date</label>
                <input type="date" placeholder='End date for the contract' value={record.endDate} onChange={(e) => setRecord({...record, endDate: e.target.value})}/>
            </FormField>
            <Button type='submit' primary onClick={handleSubmit}>Submit</Button>
            <Button onClick={handleCancel}>Cancel</Button>
        </Form>
}
export default ContractForm;