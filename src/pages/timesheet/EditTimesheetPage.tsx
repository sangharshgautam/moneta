import React from 'react'
import {Container, Header, Message, MessageHeader, Segment} from 'semantic-ui-react'
import {Await, useLoaderData} from "react-router-dom";
import MonetaApi from "../../services/MonetaApi";
import {NewTimesheet} from "../../components/modules/common/Models";
import TimesheetForm from "../../components/modules/timesheet/TimesheetForm";
import {OutletContentError, OutletContentLoading} from "../LazyOutlet";

const EditTimesheetPage = () => {

    const handleSubmit = (timesheetForm: NewTimesheet) => {
        MonetaApi.create<NewTimesheet>('timesheet', timesheetForm).then(
            result => {
                console.log(result)
                // setTimesheet(result.data)
            }
        )
    }
    const handleCancel = () => {
        // navigate(props.parent);
    }

    return   <React.Suspense fallback={<OutletContentLoading resource="agency" />}>
        {/*
        // @ts-ignore */}
        <Await resolve={Promise.all([useLoaderData().itemResponse, useLoaderData().contractsResponse, useLoaderData().servicesResponse])} errorElement={<OutletContentError />}>{([itemResponse, contractsResponse, servicesResponse]) => (
            <Segment basic>
                <Header as='h3'>Edit Timesheet</Header>
                <Container>
                    <Message>
                        <MessageHeader>Changes in Service</MessageHeader>
                        <p>
                            We updated our privacy policy here to better service our customers. We
                            recommend reviewing the changes.
                        </p>
                    </Message>
                    <TimesheetForm contractId={itemResponse.data.id} timesheet={itemResponse.data} contracts={contractsResponse.data} contractServices={servicesResponse.data} handleSubmit={handleSubmit} handleCancel={handleCancel}></TimesheetForm>
                </Container>
            </Segment>
        )}
        </Await>
    </React.Suspense>
}
export default EditTimesheetPage;