import {AgenciesPage, ViewRecords} from "../pages/LazyOutlet";
import {defer, RouteObject} from "react-router-dom";
import {Agency, Contract} from "../components/modules/common/Models";
import AddAgency from "../components/modules/agency/AddAgency";
import EditAgencyPage from "../pages/agency/EditAgencyPage";
import AddContract from "../components/modules/contract/AddContract";
import ViewAgencyPage from "../pages/agency/ViewAgencyPage";
import {loadResource, loadResourceList} from "../Constants";
import {gql} from "@apollo/client";
import ViewList from "../ViewList";
import {GET_CUSTOMERS} from "../services/Wave";

const AgencyRoutes = (): RouteObject => {
    return {
        path: 'agency',
        handle: {
            crumb: () => "agency"
        },
        children: [
            {
                index: true, element: <ViewList object="customers" keys={['id', 'name', 'email', 'website']} query={GET_CUSTOMERS}/>,
            },
            {
                path: 'add', element: <AddAgency/>,
                handle: {
                    crumb: () => "add"
                }
            },
            {
                path: ':id/edit', element: <EditAgencyPage/>,
                // @ts-ignore
                loader: async ({ params }) => {
                    return defer({itemResponse: loadResource<Agency>('agency', params.id as string)})
                },
                handle: {
                    crumb: () => "edit"
                }
            },
            {
                path: ':agencyId/add', element: <AddContract/>},
            {
                path: ':id', element: <ViewAgencyPage/>,
                // @ts-ignore
                loader: async ({ params }) => {
                    const id = params.id as string
                    const agencyLoader = loadResource<Agency>('agency', id)
                    const contractsLoader = loadResourceList<Contract[]>(`agency/${id}/contract`);
                    return defer({id, itemResponse: agencyLoader, listResponse: contractsLoader});
                },
                handle: {
                    crumb: (data: any) => data.id
                }
            },
        ]
    }
}
export default AgencyRoutes;