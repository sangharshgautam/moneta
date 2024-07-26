import {RouteObject} from "react-router-dom";
import React from "react";
import Settings from "../components/modules/settings/Settings";

const SettingsRoutes = (): RouteObject => {
    return {
        path: 'settings', element: <Settings />,
        // loader: async () => {
        //     return defer({listResponse: loadResourceList<Timesheet[]>('timesheet')})
        // },
        handle: {
            crumb: () => "settings"
        },
    }
}
export default SettingsRoutes;