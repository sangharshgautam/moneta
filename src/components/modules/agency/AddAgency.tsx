import React, {useState} from 'react'
import {Container, Header, Message, MessageHeader, Segment} from 'semantic-ui-react'
import MonetaApi from "../../../services/MonetaApi";
import {NewAgency} from "../common/Models";
import AgencyForm from "./AgencyForm";

const AddAgency = () => {
    const [progress, setProgress] = useState(100)
    const [newAgency, setAgency] = useState<NewAgency>({
        name: '',
        contact: '',
        website: ''
    })

    const handleSubmit = (agencyForm: NewAgency) => {
        MonetaApi.create<NewAgency>('agency', agencyForm, setProgress).then(
            result => {
                setAgency(result.data);
                // navigate(props.parent);
            }
        )
    }
    const handleCancel = () => {
        // navigate(props.parent);
    }
    return   <Segment basic>
        <Header as='h3'>Add Agency</Header>
        {progress !== 100 && <div className="ui indicating progress" data-value={progress} data-total="100">
            <div className="bar"></div>
            <div className="label">Loading agency</div>
        </div>}
        {progress === 100 &&
            <Container>
                <Message>
                    <MessageHeader>Changes in Service</MessageHeader>
                    <p>
                        We updated our privacy policy here to better service our customers. We
                        recommend reviewing the changes.
                    </p>
                </Message>
                <AgencyForm agency={newAgency} handleSubmit={handleSubmit} handleCancel={handleCancel}></AgencyForm>
            </Container>
        }
    </Segment>
}
export default AddAgency;