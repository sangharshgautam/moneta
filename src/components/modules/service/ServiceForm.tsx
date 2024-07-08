import React, {useEffect, useState} from 'react';
import {Button, Form, FormField,} from 'semantic-ui-react'
import {Contract, NewService} from "../common/Models";
import MonetaApi from "../../../services/MonetaApi";


const ServiceForm = <T extends NewService>(props: {service: T, handleSubmit: (serviceForm: T) => void, handleCancel: () => void}) => {
    const [progress, setProgress] = useState(0)
    const [record, setRecord] = useState<T>(props.service)

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
    console.log(progress)
    const options = contracts.map(contract => {
        return {key: contract.id, text: contract.refId, value: contract.id, selected:true, active: true}
    });
    console.log(options)
    return <Form>
            <FormField>
                <label>Name</label>
                <input type="text" placeholder='Name for the service' value={record.name} onChange={(e) => setRecord({...record, name: e.target.value})}/>
            </FormField>
            <FormField>
                <label>Rate</label>
                <input type="text" placeholder='Rate for the Service' value={record.rate} onChange={(e) => setRecord({...record, rate: e.target.value})}/>
            </FormField>
            <Button type='submit' primary onClick={handleSubmit}>Submit</Button>
            <Button onClick={handleCancel}>Cancel</Button>
        </Form>
}
export default ServiceForm;