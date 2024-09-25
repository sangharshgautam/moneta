import {ReportsPage} from "../pages/LazyOutlet";
import {defer, RouteObject} from "react-router-dom";
import {Account} from "../components/modules/common/Models";
import AddContract from "../components/modules/contract/AddContract";
import {loadResource, loadResourceList} from "../Constants";
import React, {useContext} from "react";
import ViewReport from "../pages/report/ViewReport";
import {BusinessContext} from "../App";

const ReportRoutes = (): RouteObject => {
    const businessId = useContext(BusinessContext);
    return {
        path: 'report',
        handle: {
            crumb: () => "report"
        },
        children: [
            {
                index: true, element: <ReportsPage/>,
                loader: async () => {
                    return defer({listResponse: loadResourceList<Account[]>(businessId, 'account')})
                }
            },
            {path: 'add', element: <AddContract/>},
            {
                path: ':id', element: <ViewReport/>,
                loader: async ({params}) => {
                    const id = params.id as string
                    const accountLoader = loadResource<Account>(businessId, 'account', id)
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