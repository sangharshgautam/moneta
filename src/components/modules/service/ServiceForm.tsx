import React, {useState} from 'react';
import {Button, Form, FormField,} from 'semantic-ui-react'
import {NewService, Service} from "../common/Models";


const ServiceForm = <T extends NewService>(props: {service: T, handleSubmit: (serviceForm: T) => void, handleCancel: () => void}) => {
    const [progress, setProgress] = useState(0)
    const [record, setRecord] = useState<T>(props.service)

    const [agencies, setAgencies] = useState<Service[]>([])

    // useEffect(() => {
    //     MonetaApi.list<Service[]>('agency', setProgress).then(
    //         result => setAgencies(result.data)
    //     )
    // }, [])
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