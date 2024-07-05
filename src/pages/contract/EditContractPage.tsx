import React from 'react'
import {Container, Header, Message, MessageHeader, Segment} from 'semantic-ui-react'
import {Contract} from "../../components/modules/common/Models";
import MonetaApi from "../../services/MonetaApi";
import {Await, useLoaderData} from "react-router-dom";
import ContractForm from "../../components/modules/contract/ContractForm";
import {OutletContentError, OutletContentLoading} from "../LazyOutlet";

const EditContractPage = () => {
    const handleSubmit = (contractForm: Contract) => {
        MonetaApi.save<Contract>('contract', contractForm).then(
            result => {
                console.log(result)
                // setContract(result.data)
            }
        )
    }
    const handleCancel = () => {
        // navigate(props.parent);
    }
    return   <React.Suspense fallback={<OutletContentLoading resource="contract" />}>
        {/*
        // @ts-ignore */}
        <Await resolve={useLoaderData().itemResponse} errorElement={<OutletContentError />}>{(itemResponse) => (
            <Segment basic>
                <Header as='h3'>Edit Contract</Header>
                <Container>
                    <Message>
                        <MessageHeader>Changes in Service</MessageHeader>
                        <p>
                            We updated our privacy policy here to better service our customers. We
                            recommend reviewing the changes.
                        </p>
                    </Message>
                    <ContractForm contract={itemResponse.data} handleSubmit={handleSubmit} handleCancel={handleCancel}></ContractForm>
                </Container>
            </Segment>
        )}
        </Await>
    </React.Suspense>
}
export default EditContractPage