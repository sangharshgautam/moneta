import {Container, Header, Message, MessageHeader, Segment} from "semantic-ui-react";
import React from "react";
import CashFlow from "./CashFlow";
import {OutletContentError, OutletContentLoading} from "../../../pages/LazyOutlet";
import {Await, useLoaderData} from "react-router-dom";

const Dashboard = () => {
    return <React.Suspense fallback={<OutletContentLoading resource="agency" />}>
        {/*
        // @ts-ignore */}
        <Await resolve={useLoaderData().listResponse} errorElement={<OutletContentError />}>{(itemResponse) => (
            <Segment basic>
                <Header as='h3'>Dashboard</Header>
                <Container fluid>
                    <Message>
                        <MessageHeader>Changes in Service</MessageHeader>
                        <p>
                            We updated our privacy policy here to better service our customers. We
                            recommend reviewing the changes.
                        </p>
                    </Message>
                    <CashFlow records={itemResponse.data}></CashFlow>
                </Container>
            </Segment>
        )}
        </Await>
    </React.Suspense>
}
export default Dashboard;