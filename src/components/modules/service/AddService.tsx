import React, {useState} from 'react'
import {Container, Header, Message, MessageHeader, Segment} from 'semantic-ui-react'
import {NewService} from "../common/Models";
import ServiceForm from "./ServiceForm";
import MonetaApi from "../../../services/MonetaApi";
import {useParams} from "react-router-dom";

const AddService = () => {
    const routeParams = useParams<{agencyId: string}>();
    const [service, setService] = useState<NewService>({
        name: '',
        rate: 0
    })
    const [progress, setProgress] = useState(100)
    const handleSubmit = (serviceForm: NewService) => {
        MonetaApi.create<NewService>('service', serviceForm, setProgress).then(
            result => setService(result.data)
        )
    }
    const handleCancel = () => {
        // navigate(props.parent);
    }
    return   <Segment basic>
        <Header as='h3'>Add Service</Header>
        {progress !== 100 && <div className="ui indicating progress" data-value={progress} data-total="100">
            <div className="bar"></div>
            <div className="label">Loading service</div>
        </div>}
        {progress === 100 && <Container>
            <Message>
                <MessageHeader>Changes in Service</MessageHeader>
                <p>
                    We updated our privacy policy here to better service our customers. We
                    recommend reviewing the changes.
                </p>
            </Message>
            <ServiceForm service={service} handleSubmit={handleSubmit} handleCancel={handleCancel}/>
        </Container>
        }
    </Segment>
}
export default AddService;