import React, {useState} from 'react'
import {Container, Header, Message, MessageHeader, Segment} from 'semantic-ui-react'
import {NewContract} from "../common/Models";
import ContractForm from "./ContractForm";
import MonetaApi from "../../../services/MonetaApi";
import {useParams} from "react-router-dom";

const AddContract = () => {
    const routeParams = useParams<{agencyId: string}>();
    const [contract, setContract] = useState<NewContract>({
        agency:{
            id: Number(routeParams.agencyId)
        },
        refId: '',
        startDate: '',
        endDate: ''
    })
    const [progress, setProgress] = useState(100)
    const handleSubmit = (contractForm: NewContract) => {
        MonetaApi.create<NewContract>('contract', contractForm, setProgress).then(
            result => setContract(result.data)
        )
    }
    const handleCancel = () => {
        // navigate(props.parent);
    }
    return   <Segment basic>
        <Header as='h3'>Add Contract</Header>
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
            <ContractForm contract={contract} handleSubmit={handleSubmit} handleCancel={handleCancel}/>
        </Container>
        }
    </Segment>
}
export default AddContract;