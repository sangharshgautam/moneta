import React from "react";
import {
    Button,
    Dimmer,
    Header, Icon,
    Loader,
    Segment,
    Table,
    TableBody, TableCell, TableFooter,
    TableHeader,
    TableHeaderCell,
    TableRow
} from "semantic-ui-react";
import {Await, isRouteErrorResponse, NavLink, useLoaderData, useRouteError} from "react-router-dom";
import Agencies from "../components/modules/agency/Agencies";
import Contracts from "../components/modules/contract/Contracts";
import Timesheets from "../components/modules/timesheet/Timesheets";
import CashFlow from "../components/modules/dashboard/CashFlow";
import Services from "../components/modules/service/Services";
import Invoices from "./invoice/Invoices";
import Expenses from "./expense/Expenses";
import Accounts from "./account/Accounts";
import Reports from "./report/Reports";
import {gql, useQuery} from "@apollo/client";
import type {DocumentNode, TypedDocumentNode} from "@apollo/client/core";
import type {NoInfer, QueryHookOptions} from "@apollo/client/react/types/types";
import {GET_CUSTOMERS, GET_SERVICES} from "../services/Wave";

export const OutletContentError = () => {
    const error = useRouteError();
    if (isRouteErrorResponse(error)) {
        return (
            <Segment basic>
                <Header as='h3'>Oops</Header>
                <h2>{error.status}</h2>
                <p>{error.statusText}</p>
                {error.data?.message && <p>{error.data.message}</p>}
            </Segment>
        );
    } else {
        return <div>Oops</div>;
    }
}
export const ViewRecords = (props: {query: any}) => {

    const { loading, error, data } = useQuery(props.query);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;
    return (<Segment basic>
            <Header as='h3'>Agencies</Header>
            <Table celled>
                <TableHeader>
                    <TableRow>
                        <TableHeaderCell>Name</TableHeaderCell>
                        <TableHeaderCell>Contact</TableHeaderCell>
                        <TableHeaderCell>Website</TableHeaderCell>
                        <TableHeaderCell>Action</TableHeaderCell>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {data.business.customers.edges.map((edge: any) => edge.node).map((record: any) => <TableRow key={record.id}>
                        <TableCell key="name">
                            <NavLink to={`${record.id}`}>{record.name}</NavLink>
                        </TableCell>
                        <TableCell key="contact">{record.email}</TableCell>
                        <TableCell key="website">{record.website}</TableCell>
                        <TableCell key="action">
                            <Button as={NavLink} to={`/agency/${record.id}/edit`} size='small' positive icon="edit"></Button>
                            {/*<Button size='small' negative icon="trash" onClick={() => handleDelete(record.id)}></Button>*/}
                        </TableCell>
                    </TableRow>)}

                </TableBody>
                {/*<TableFooter fullWidth>*/}
                {/*    <TableRow>*/}
                {/*        <TableHeaderCell colSpan='4'>*/}
                {/*            <Button as={NavLink} to="add" size='small' primary floated='right'><Icon name='add' />Add Agency</Button>*/}
                {/*        </TableHeaderCell>*/}
                {/*    </TableRow>*/}
                {/*</TableFooter>*/}
            </Table>
        </Segment>)
}
export const OutletContentLoading = (props: {resource: string}) => <Dimmer active><Loader inverted>Loading {props.resource}</Loader></Dimmer>
export const AgenciesPage = () => {
    const { loading, error, data } = useQuery(GET_CUSTOMERS);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;
    return <Agencies records={data.business.customers.edges} />
}
export const ServicesPage = () => {
    const { loading, error, data } = useQuery(GET_SERVICES);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;
    return <Services records={data.business.products.edges} />
}
export const ContractsPage = () => {
    // @ts-ignore
    return <React.Suspense fallback={<OutletContentLoading resource="contracts" />}><Await resolve={useLoaderData().listResponse} errorElement={<OutletContentError/>}>{(listResponse) => (<Contracts records={listResponse.data} />)}</Await></React.Suspense>
}
export const TimesheetsPage = () => {
    // @ts-ignore
    return <React.Suspense fallback={<OutletContentLoading resource="timesheets" />}><Await resolve={useLoaderData().listResponse} errorElement={<OutletContentError/>}>{(listResponse) => (<Timesheets records={listResponse.data} />)}</Await></React.Suspense>
}
export const InvoicesPage = () => {
    // @ts-ignore
    return <React.Suspense fallback={<OutletContentLoading resource="invoices" />}><Await resolve={useLoaderData().listResponse} errorElement={<OutletContentError/>}>{(listResponse) => (<Invoices records={listResponse.data} />)}</Await></React.Suspense>
}
export const ExpensesPage = () => {
    // @ts-ignore
    return <React.Suspense fallback={<OutletContentLoading resource="expenses" />}><Await resolve={useLoaderData().listResponse} errorElement={<OutletContentError/>}>{(listResponse) => (<Expenses records={listResponse.data} />)}</Await></React.Suspense>
}
export const AccountsPage = () => {
    // @ts-ignore
    return <React.Suspense fallback={<OutletContentLoading resource="accounts" />}><Await resolve={useLoaderData().listResponse} errorElement={<OutletContentError/>}>{(listResponse) => (<Accounts records={listResponse.data} />)}</Await></React.Suspense>
}
export const ReportsPage = () => {
    // @ts-ignore
    return <React.Suspense fallback={<OutletContentLoading resource="reports" />}><Await resolve={useLoaderData().listResponse} errorElement={<OutletContentError/>}>{(listResponse) => (<Reports records={listResponse.data} />)}</Await></React.Suspense>
}
export const Dashboard = () => {
    // @ts-ignore
    return <React.Suspense fallback={<OutletContentLoading resource="timesheets" />}><Await resolve={useLoaderData().listResponse} errorElement={<OutletContentError/>}>{(listResponse) => (<CashFlow records={listResponse.data} />)}</Await></React.Suspense>
}


