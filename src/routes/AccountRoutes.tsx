import {AccountsPage} from "../pages/LazyOutlet";
import {defer, RouteObject} from "react-router-dom";
import {Account, Invoice} from "../components/modules/common/Models";
import AddContract from "../components/modules/contract/AddContract";
import {loadResource, loadResourceList} from "../Constants";
import React from "react";
import ViewAccount from "../pages/account/ViewAccount";

const AccountRoutes = (): RouteObject => {
    return {
        path: 'account',
        handle: {
            crumb: () => "account"
        },
        children: [
            {
                index: true, element: <AccountsPage/>,
                loader: async () => {
                    return defer({listResponse: loadResourceList<Account[]>('account')})
                }
            },
            {path: 'add', element: <AddContract/>},

            {
                path: ':id', element: <ViewAccount/>,
                loader: async ({params}) => {
                    const id = params.id as string
                    const accountLoader = loadResource<Account>('account', id)
                    const transactionsLoader = loadResourceList<Invoice[]>(`account/${id}/transaction`);
                    return defer({
                        id,
                        itemResponse: accountLoader,
                        transactionsLoader
                    });
                },
                handle: {
                    crumb: (data: any) => data.id
                }
            }
        ]
    }
}
export default AccountRoutes;