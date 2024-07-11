import {Button, Container, Dropdown, Form, FormField, Header, Message, MessageHeader, Segment} from "semantic-ui-react";
import React, {useState} from "react";
import {OutletContentError, OutletContentLoading} from "../LazyOutlet";
import {Await, useLoaderData} from "react-router-dom";
import ViewItemSection from "../ViewItemSection";
import {NewContractService} from "../../components/modules/common/Models";

const AssignService = () => {
    const [record, setRecord] = useState<NewContractService>()
    const handleSubmit = (e: any) => {
        e.preventDefault()
        // props.handleSubmit(record);
    }
    const handleCancel = (e: any) => {
        e.preventDefault()
        // props.handleCancel()
    }
    const loaderData = useLoaderData();
    return <Segment basic>
        <Header as='h3'>Assign Service</Header>
        <Container>
            <Message>
                <MessageHeader>Changes in Service</MessageHeader>
                <p>
                    We updated our privacy policy here to better service our customers. We
                    recommend reviewing the changes.
                </p>
            </Message>
            <ViewItemSection resource="contract"/>
            <React.Suspense fallback={<OutletContentLoading resource="contract" />}>
                {/*
                // @ts-ignore */}
                <Await resolve={loaderData.listResponse} errorElement={<OutletContentError />}>{(listResponse) => (
                    <Form>
                        <FormField>
                            <label>Service</label>
                            <Dropdown
                                placeholder='Select Service'
                                icon="cog"
                                className='icon'
                                labeled button
                                selection
                                options={listResponse.data.map((service: any) => {
                                    return {key: service.id, text: service.name, value: service.id, selected:true, active: true}
                                })}
                                value={record?.service?.id}
                                onChange={(e, data) => setRecord({...record, service: {id: data.value as number}})}
                            />
                        </FormField>
                        <Button type='submit' primary onClick={handleSubmit}>Assign</Button>
                        {/*<Button onClick={handleCancel}>Cancel</Button>*/}
                    </Form>
                )}
                </Await>
            </React.Suspense>
        </Container>
    </Segment>
}
export default AssignService;