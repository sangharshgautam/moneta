import React, {useState} from 'react';
import {Button, Form, FormField, Input} from 'semantic-ui-react'
import {NewAgency} from "../common/Models";

const AgencyForm = <T extends NewAgency>(props: {agency: T, handleSubmit: (agencyForm: T) => void, handleCancel: () => void}) => {
    const [record, setRecord] = useState<T>(props.agency)
    const handleSubmit = (e: any) => {
        e.preventDefault()
        props.handleSubmit(record);
    }
    const handleCancel = (e: any) => {
        e.preventDefault()
        props.handleCancel()
    }
    return <Form>
            <FormField>
                <label>Name</label>
                <Input placeholder='Name of the agency' value={record.name} onChange={(e) => setRecord({...record, name: e.target.value})}/>
            </FormField>
            <FormField>
                <label>Contact</label>
                <input placeholder='Contact person at the agency' value={record.contact} onChange={(e) => setRecord({...record, contact: e.target.value})}/>
            </FormField>
            <FormField>
                <label>Website</label>
                <input placeholder='Url of the agency company' value={record.website} onChange={(e) => setRecord({...record, website: e.target.value})}/>
            </FormField>
            <Button type='submit' primary onClick={handleSubmit}>Submit</Button>
            <Button onClick={handleCancel}>Cancel</Button>
        </Form>
}
export default AgencyForm;