import React from 'react'
import {Container, Header, Message, MessageHeader, Segment} from 'semantic-ui-react'
import {Service} from "../../components/modules/common/Models";
import MonetaApi from "../../services/MonetaApi";
import {Await, useLoaderData} from "react-router-dom";
import {OutletContentError, OutletContentLoading} from "../LazyOutlet";
import ServiceForm from "../../components/modules/service/ServiceForm";

const EditServicePage = () => {
    const handleSubmit = (serviceForm: Service) => {
        MonetaApi.save<Service>('service', serviceForm).then(
            result => {
                console.log(result)
                // setContract(result.data)
            }
        )
    }
    const handleCancel = () => {
        // navigate(props.parent);
    }
    return   <React.Suspense fallback={<OutletContentLoading resource="service" />}>
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
                    <ServiceForm service={itemResponse.data} handleSubmit={handleSubmit} handleCancel={handleCancel}></ServiceForm>
                </Container>
            </Segment>
        )}
        </Await>
    </React.Suspense>
}
export default EditServicePage