import {ContractsPage} from "../pages/LazyOutlet";
import {defer, RouteObject} from "react-router-dom";
import {Agency, Contract, ContractService, Invoice, Timesheet} from "../components/modules/common/Models";
import AddContract from "../components/modules/contract/AddContract";
import ViewContractPage from "../pages/contract/ViewContractPage";
import EditContractPage from "../pages/contract/EditContractPage";
import AddTimesheet from "../components/modules/timesheet/AddTimesheet";
import AssignService from "../pages/contract/AssignService";
import AddInvoice from "../pages/invoice/AddInvoice";
import React from "react";
import {loadResource, loadResourceList} from "../Constants";

const ContractRoutes = (): RouteObject => {

    return {
        path: 'contract',
        handle: {
            crumb: () => "contract"
        },
        children: [
            {
                index: true, element: <ContractsPage/>,
                loader: async () => {
                    return defer({listResponse: loadResourceList<Contract[]>('contract')})
                }
            },
            {path: 'add', element: <AddContract/>},

            {
                path: ':id', element: <ViewContractPage/>,
                // @ts-ignore
                loader: async ({params}) => {
                    const id = params.id as string
                    const contractLoader = loadResource<Contract>('contract', id)
                    const timesheetsLoader = loadResourceList<Timesheet[]>(`contract/${id}/timesheet`);
                    const servicesLoader = loadResourceList<ContractService[]>(`contract/${id}/service`);
                    const invoicesLoader = loadResourceList<Invoice[]>(`contract/${id}/invoice`);
                    return defer({id, itemResponse: contractLoader, listResponse: timesheetsLoader, servicesResponse: servicesLoader, invoices: invoicesLoader});
                },
                handle: {
                    crumb: (data: any) => data.id
                }
            },
            {
                path: ':id/edit', element: <EditContractPage/>,
                // @ts-ignore
                loader: async ({ params }) => {
                    return defer({itemResponse: loadResource<Agency>('contract', params.id as string)})
                },
                handle: {
                    crumb: () => "edit"
                }
            },
            {
                path: ':id/timesheet/add', element: <AddTimesheet/>,
                // @ts-ignore
                loader: async ({ params}) => {
                    const id = params.id as string
                    const contractLoader = loadResource<Contract>('contract', id)
                    const contractsLoader = loadResourceList<Contract[]>(`contract`);
                    const servicesLoader = loadResourceList<ContractService[]>(`contract/${id}/service`);
                    const invoicesLoader = loadResourceList<Invoice[]>(`contract/${id}/invoice`);
                    return defer({id, itemResponse: contractLoader, contractsResponse: contractsLoader, servicesResponse: servicesLoader, invoices: invoicesLoader});
                },
                handle: {
                    crumb: () => "add"
                }
            },
            {
                path: ':id/service/add', element: <AssignService/>,
                // @ts-ignore
                loader: async ({ params }) => {
                    const id = params.id as string
                    const contractLoader = loadResource<Contract>('contract', id)
                    const servicesLoader = loadResourceList<Contract[]>(`service`);
                    return defer({id, itemResponse: contractLoader, listResponse: servicesLoader})
                },
                handle: {
                    crumb: (data: any) => data.id
                }
            },
            {
                path: ':id/invoice/add', element: <AddInvoice/>,
                // @ts-ignore
                loader: async ({ params}) => {
                    const id = params.id as string
                    const contractLoader = loadResource<Contract>('contract', id)
                    const servicesLoader = loadResourceList<ContractService[]>(`contract/${id}/service`);
                    return defer({id, contractLoader, servicesLoader});
                },
                handle: {
                    crumb: () => "add"
                }
            },
        ]
    }
}
export default ContractRoutes