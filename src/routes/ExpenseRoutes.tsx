import {ExpensesPage} from "../pages/LazyOutlet";
import {defer, RouteObject} from "react-router-dom";
import {Contract, Expense} from "../components/modules/common/Models";
import AddContract from "../components/modules/contract/AddContract";
import {loadResource, loadResourceList} from "../Constants";
import React, {useContext} from "react";
import ViewInvoice from "../pages/invoice/ViewInvoice";
import {BusinessContext} from "../App";

const ExpenseRoutes = (): RouteObject => {
    const businessId = useContext(BusinessContext);
    return {
        path: 'expense',
        handle: {
            crumb: () => "invoice"
        },
        children: [
            {
                index: true, element: <ExpensesPage/>,
                loader: async () => {
                    return defer({listResponse: loadResourceList<Expense[]>(businessId, 'expense')})
                }
            },
            {path: 'add', element: <AddContract/>},

            {
                path: ':id', element: <ViewInvoice/>,
                loader: async ({params}) => {
                    const id = params.id as string
                    const invoiceLoader = loadResource<Contract>(businessId, 'invoice', id)
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
export default ExpenseRoutes;