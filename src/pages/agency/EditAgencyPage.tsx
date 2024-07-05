import React from 'react'
import {Container, Header, Message, MessageHeader, Segment} from 'semantic-ui-react'
import MonetaApi from "../../services/MonetaApi";
import {Agency} from "../../components/modules/common/Models";
import {Await, useLoaderData} from "react-router-dom";
import AgencyForm from "../../components/modules/agency/AgencyForm";
import {OutletContentError, OutletContentLoading} from "../LazyOutlet";

const EditAgencyPage = () => {

    const handleSubmit = (agencyForm: Agency) => {
        MonetaApi.save<Agency>('agency', agencyForm).then(
            result => {
                console.log(result)
                // setAgency(result.data);
                // navigate(props.parent);
            }
        )
    }
    const handleCancel = () => {
        // navigate(props.parent);
    }

    return <React.Suspense fallback={<OutletContentLoading resource="agency" />}>
        {/*
        // @ts-ignore */}
        <Await resolve={useLoaderData().itemResponse} errorElement={<OutletContentError />}>{(itemResponse) => (
            <Segment basic>
                <Header as='h3'>Edit Agency</Header>
                <Container>
                    <Message>
                        <MessageHeader>Changes in Service</MessageHeader>
                        <p>
                            We updated our privacy policy here to better service our customers. We
                            recommend reviewing the changes.
                        </p>
                    </Message>
                    <AgencyForm agency={itemResponse.data} handleSubmit={handleSubmit} handleCancel={handleCancel}></AgencyForm>
                </Container>
            </Segment>
        )}
        </Await>
    </React.Suspense>
}
export default EditAgencyPage;