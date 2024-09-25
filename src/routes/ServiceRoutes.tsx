import {ServicesPage} from "../pages/LazyOutlet";
import {defer, RouteObject} from "react-router-dom";
import {Contract, Service} from "../components/modules/common/Models";
import AddContract from "../components/modules/contract/AddContract";
import {loadResource, loadResourceList} from "../Constants";
import EditServicePage from "../pages/service/EditServicePage";
import AddService from "../components/modules/service/AddService";
import ViewServicePage from "../pages/service/ViewServicePage";
import React, {useContext} from "react";
import {BusinessContext} from "../App";

const ServiceRoutes = (): RouteObject => {
    const businessId = useContext(BusinessContext);
    return {
        path: 'service',
        handle: {
            crumb: () => "service"
        },
        children: [
            {
                index: true, element: <ServicesPage/>,
                loader: async () => {
                    return defer({listResponse: loadResourceList<Service[]>(businessId, 'service')})
                }
            },
            {path: 'add', element: <AddContract/>},
            {
                path: ':id/edit', element: <EditServicePage/>,
                loader: async ({ params }) => {
                    return defer({itemResponse: loadResource<Service>(businessId, 'service', params.id as string)})
                },
                handle: {
                    crumb: () => "edit"
                }
            },
            {
                path: ':serviceId/add', element: <AddService/>,
                handle: {
                    crumb: () => "add"
                }
            },
            {
                path: ':id', element: <ViewServicePage/>,
                loader: async ({ params}) => {
                    const id = params.id as string
                    const contractLoader = loadResource<Service>(businessId, 'service', id)
                    const timesheetsLoader = loadResourceList<Contract[]>(businessId, `service/${id}/contract`);
                    return defer({id, itemResponse: contractLoader, listResponse: timesheetsLoader});
                },
                handle: {
                    crumb: (data: any) => data.id
                }
            },
        ]
    }
}
export default ServiceRoutes;