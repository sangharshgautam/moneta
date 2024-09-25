import {TimesheetsPage} from "../pages/LazyOutlet";
import {defer, RouteObject} from "react-router-dom";
import {Agency, Contract, Timesheet} from "../components/modules/common/Models";
import {loadResource, loadResourceList} from "../Constants";
import React, {useContext} from "react";
import AddTimesheet from "../components/modules/timesheet/AddTimesheet";
import EditTimesheetPage from "../pages/timesheet/EditTimesheetPage";
import ViewTimesheetPage from "../pages/timesheet/ViewTimesheetPage";
import {BusinessContext} from "../App";

const TimesheetRoutes = (): RouteObject => {
    const businessId = useContext(BusinessContext);
    return {
        path: 'timesheet',
        handle: {
            crumb: () => "timesheet"
        },
        children: [
            {
                index: true, element: <TimesheetsPage />,
                loader: async () => {
                    return defer({listResponse: loadResourceList<Timesheet[]>(businessId, 'timesheet')})
                }
            },
            {
                path: 'add', element: <AddTimesheet/>,
                handle: {
                    crumb: () => "add"
                }
            },
            {
                path: ':id/edit', element: <EditTimesheetPage/>,
                loader: async ({ params }) => {
                    return defer({itemResponse: loadResource<Agency>(businessId, 'timesheet', params.id as string)})
                }
            },
            {
                path: ':id', element: <ViewTimesheetPage/>,
                loader: async ({ params}) => {
                    const id = params.id as string
                    const timesheetLoader = loadResource<Contract>(businessId, 'timesheet', id)
                    return defer({id, itemResponse: timesheetLoader});
                },
                handle: {
                    crumb: (data: any) => data.id
                }
            }
        ]
    }
}
export default TimesheetRoutes;