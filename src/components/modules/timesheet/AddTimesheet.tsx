import React, {useState} from 'react'
import {Container, Header, Message, MessageHeader, Segment} from 'semantic-ui-react'
import {useParams} from "react-router-dom";
import MonetaApi from "../../../services/MonetaApi";
import {NewTimesheet} from "../common/Models";
import TimesheetForm from "./TimesheetForm";

const AddTimesheet = () => {
    const routeParams = useParams<{contractId: string}>();
    const [timesheet, setTimesheet] = useState<NewTimesheet>({
        contract:{
          id: Number(routeParams.contractId)
        },
        startDate: '15/06/2024',
        endDate: '21/06/2024',
        days: 5,
        refId: 'PSR1TS04070707',
        status: 'Approved'
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

    return   <Segment basic>
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
            <TimesheetForm timesheet={timesheet} handleSubmit={handleSubmit} handleCancel={handleCancel}></TimesheetForm>
        </Container>
        }
    </Segment>
}
export default AddTimesheet;