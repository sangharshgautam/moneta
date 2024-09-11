
import {defer, RouteObject} from "react-router-dom";
import {Contract} from "../components/modules/common/Models";
import AddContract from "../components/modules/contract/AddContract";
import {loadResource, loadResourceList} from "../Constants";
import React from "react";
import ViewInvoice from "../pages/invoice/ViewInvoice";
import ViewList from "../ViewList";
import {GET_INVOICES} from "../services/Wave";

const InvoiceRoutes = (): RouteObject => {
    return {
        path: 'invoice',
        handle: {
            crumb: () => "invoice"
        },
        children: [
            {
                index: true, element: <ViewList object="invoices" keys={['id', 'invoiceDate', 'dueDate']} query={GET_INVOICES}/>,
            },
            {path: 'add', element: <AddContract/>},

            {
                path: ':id', element: <ViewInvoice/>,
                loader: async ({params}) => {
                    const id = params.id as string
                    const invoiceLoader = loadResource<Contract>('invoice', id)
                    return defer({
                        id,
                        itemResponse: invoiceLoader
                    });
                },
                handle: {
                    crumb: (data: any) => data.id
                }
            }
        ]
    }
}
export default InvoiceRoutes;