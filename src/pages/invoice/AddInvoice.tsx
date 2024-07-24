import React, {useState} from 'react'
import {Container, Header, Message, MessageHeader, Segment} from 'semantic-ui-react'
import {Await, useLoaderData} from "react-router-dom";
import {NewInvoice} from "../../components/modules/common/Models";
import InvoiceForm from "./InvoiceForm";
import {OutletContentError, OutletContentLoading} from "../LazyOutlet";
import MonetaApi from "../../services/MonetaApi";

const AddInvoice = () => {
    const [invoice, setInvoice] = useState<NewInvoice>({
        invoiceItems: []
    })
    const [progress, setProgress] = useState(100)

    const handleSubmit = (invoiceForm: NewInvoice) => {
        MonetaApi.create<NewInvoice>('invoice', invoiceForm, setProgress).then(
            result => setInvoice(result.data)
        )
    }
    const handleCancel = () => {
        // navigate(props.parent);
    }
    return <React.Suspense fallback={<OutletContentLoading resource="agency" />}>
        {/*
        // @ts-ignore */}
        <Await resolve={Promise.all([useLoaderData().contractLoader, useLoaderData().servicesLoader])} errorElement={<OutletContentError />}>{([contractLoader, servicesLoader]) => (
            <Segment basic>
                <Header as='h3'>Add Invoice</Header>
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
                    <InvoiceForm contract={contractLoader.data} invoice={invoice} contractServices={servicesLoader.data} handleSubmit={handleSubmit} handleCancel={handleCancel}></InvoiceForm>
                </Container>
                }
            </Segment>
        )}
        </Await>
    </React.Suspense>
}
export default AddInvoice;