import React, {useState} from 'react'
import {Container, Header, Message, MessageHeader, Segment} from 'semantic-ui-react'
import {Await, useLoaderData, useParams} from "react-router-dom";
import MonetaApi from "../../../services/MonetaApi";
import {NewTimesheet} from "../common/Models";
import TimesheetForm from "./TimesheetForm";
import {OutletContentError, OutletContentLoading} from "../../../pages/LazyOutlet";

const AddTimesheet = () => {
    const routeParams = useParams<{contractId: string}>();
    const [timesheet, setTimesheet] = useState<NewTimesheet>({
        startDate: '',
        endDate: '',
        days: 0,
        refId: '',
        status: 'Draft'
    })
    const [progress, setProgress] = useState(100)

    const handleSubmit = (timesheetForm: NewTimesheet) => {
        MonetaApi.create<NewTimesheet>('timesheet', timesheetForm, setProgress).then(
            result => setTimesheet(result.data)
        )
    }
    const handleCancel = () => {
        // navigate(props.parent);
    }
    return <React.Suspense fallback={<OutletContentLoading resource="agency" />}>
        {/*
        // @ts-ignore */}
        <Await resolve={Promise.all([useLoaderData().itemResponse, useLoaderData().contractsResponse, useLoaderData().servicesResponse])} errorElement={<OutletContentError />}>{([itemResponse, contractsResponse, servicesResponse]) => (
            <Segment basic>
                <Header as='h3'>Add Timesheet</Header>
                {progress !== 100 && <div className="ui indicating progress" data-value={progress} data-total="100">
                    <div className="bar"></div>
                    <div className="label">Loading agency</div>
                </div>}
                {progress === 100 && <Container>
                    <Message>
                        <MessageHeader>Changes in Service</MessageHeader>
                        <p>
                            We updated our privacy policy here to better service our customers. We
                            recommend reviewing the changes.
                        </p>
                    </Message>
                    <TimesheetForm contractId={itemResponse.data.id} timesheet={timesheet} contracts={contractsResponse.data} contractServices={servicesResponse.data} handleSubmit={handleSubmit} handleCancel={handleCancel}></TimesheetForm>
                </Container>
                }
            </Segment>
        )}
        </Await>
    </React.Suspense>
}
export default AddTimesheet;