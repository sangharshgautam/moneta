import {AccountsPage, ReportsPage} from "../pages/LazyOutlet";
import {defer, RouteObject} from "react-router-dom";
import {Account, Invoice, Transaction} from "../components/modules/common/Models";
import AddContract from "../components/modules/contract/AddContract";
import {loadResource, loadResourceList} from "../Constants";
import React from "react";
import ViewAccount from "../pages/account/ViewAccount";
import ViewReport from "../pages/report/ViewReport";

const ReportRoutes = (): RouteObject => {
    return {
        path: 'report',
        handle: {
            crumb: () => "report"
        },
        children: [
            {
                index: true, element: <ReportsPage/>,
                loader: async () => {
                    return defer({listResponse: loadResourceList<Account[]>('account')})
                }
            },
            {path: 'add', element: <AddContract/>},
            {
                path: ':id', element: <ViewReport/>,
                loader: async ({params}) => {
                    const id = params.id as string
                    const accountLoader = loadResource<Account>('account', id)
                    // const transactionsLoader = loadResourceList<Transaction[]>(`report/account/${id}/transaction`);
                    return defer({
                        id,
                        itemResponse: accountLoader,
                        // transactionsLoader
                    });
                },
                handle: {
                    crumb: (data: any) => data.id
                }
            }
        ]
    }
}
export default ReportRoutes;