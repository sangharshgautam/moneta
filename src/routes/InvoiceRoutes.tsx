import {InvoicesPage} from "../pages/LazyOutlet";
import {defer, RouteObject} from "react-router-dom";
import {Contract} from "../components/modules/common/Models";
import AddContract from "../components/modules/contract/AddContract";
import {loadResource, loadResourceList} from "../Constants";
import React from "react";
import ViewInvoice from "../pages/invoice/ViewInvoice";

const InvoiceRoutes = (): RouteObject => {
    return {
        path: 'invoice',
        handle: {
            crumb: () => "invoice"
        },
        children: [
            {
                index: true, element: <InvoicesPage/>,
                loader: async () => {
                    return defer({listResponse: loadResourceList<Contract[]>('invoice')})
                }
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