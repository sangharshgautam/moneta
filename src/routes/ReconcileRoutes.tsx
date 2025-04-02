import {defer, RouteObject} from "react-router-dom";
import {Account} from "../components/modules/common/Models";
import {loadResourceList} from "../Constants";
import React, {useContext} from "react";
import {BusinessContext} from "../App";
import Reconcile from "../pages/reconcile/Reconcile";

const ReconcileRoutes = (): RouteObject => {
    const businessId = useContext(BusinessContext);
    return {
        path: 'reconcile',
        handle: {
            crumb: () => "reconcile"
        },
        children: [
            {
                index: true, element: <Reconcile/>,
                loader: async () => {
                    return defer({listResponse: loadResourceList<Account[]>(businessId, 'account')})
                }
            }
        ]
    }
}
export default ReconcileRoutes;