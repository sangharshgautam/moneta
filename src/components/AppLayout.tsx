import React, {useState} from 'react';
import {Icon, Menu, MenuItem, Segment, Sidebar, SidebarPushable, SidebarPusher} from 'semantic-ui-react'
import {NavLink, Outlet, useMatches} from "react-router-dom";
import {SemanticICONS} from "semantic-ui-react/dist/commonjs/generic";

const AppLayout = () =>  {
    const items = [
        {id: 1, label: 'Dashboard', icon: 'chart pie', route: 'dashboard'},
        {id: 2, label: 'Agency', icon: 'umbrella', route: 'agency'},
        {id: 3, label: 'Service', icon: 'cog', route: 'service'},
        {id: 4, label: 'Contract', icon: 'handshake', route: 'contract'},
        {id: 5, label: 'Invoice', icon: 'clipboard outline', route: 'invoice'},
        {id: 6, label: 'Timesheet', icon: 'clock', route: 'timesheet'},
        {id: 7, label: 'Settings', icon: 'settings', route: 'settings'}
    ];
    const [activeMenu, setActiveMenu] = useState<number>(1)
    let matches = useMatches();
    // @ts-ignore
    let crumbs = matches.filter((match) => Boolean(match.handle?.crumb)).map((match) => match.handle.crumb(match.data));
    return (
        <SidebarPushable as={Segment} className="main">
            <Sidebar
                as={Menu}
                animation='overlay'
                direction='left'
                icon='labeled'
                vertical
                visible
            >
                {items.map(item => <MenuItem key={item.id} as={NavLink} to={item.route} active={activeMenu === item.id}
                                             onClick={() => setActiveMenu(item.id)}>
                    <Icon name={item.icon as SemanticICONS}/>
                    {item.label}
                </MenuItem>)}
            </Sidebar>
            <SidebarPusher>
                <div className="ui small breadcrumb">
                    {/*<NavLink to="/" className="section">Home</NavLink>*/}
                    <React.Fragment>
                        {crumbs.map((crumb, index) => <React.Fragment key={index}>
                            <div className="right chevron icon divider"> /</div>
                            <NavLink to={crumb} className="section">{crumb}</NavLink>
                        </React.Fragment>)}
                    </React.Fragment>
                </div>
                <Outlet/>
            </SidebarPusher>
        </SidebarPushable>
    )
}

export default AppLayout;
