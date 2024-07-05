import {OutletContentError, OutletContentLoading} from "./LazyOutlet";
import {Await, NavLink, useLoaderData} from "react-router-dom";
import {
    Button,
    Header,
    Icon,
    Segment,
    Table,
    TableFooter,
    TableHeader,
    TableHeaderCell,
    TableRow
} from "semantic-ui-react";
import React from "react";

const ViewItemSection = () => {
    return <React.Suspense fallback={<OutletContentLoading resource="agency" />}>
        {/*
        // @ts-ignore */}
        <Await resolve={useLoaderData().itemResponse} errorElement={<OutletContentError />}>{(itemResponse) => (
            <Segment basic>
                <Header as='h3'>Agency: {itemResponse.data?.name}</Header>
                <Table celled>
                    <TableHeader>
                        {/*
                            // @ts-ignore */}
                        {Object.getOwnPropertyNames(itemResponse.data).filter(prop => (typeof itemResponse.data?.[`${prop}`] === 'string') ).map(prop =>
                            <TableRow key={prop}>
                                <TableHeaderCell>{prop}</TableHeaderCell>
                                {/*
                                    // @ts-ignore */}
                                <TableHeaderCell>{itemResponse.data?.[`${prop}`]}</TableHeaderCell>
                            </TableRow>
                        )}
                    </TableHeader>
                    <TableFooter fullWidth>
                        <TableRow>
                            <TableHeaderCell colSpan='3'>
                                <Button as={NavLink} to="edit" size='small' primary floated='right'><Icon name='edit' /> Edit</Button>
                            </TableHeaderCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </Segment>
        )}
        </Await>
    </React.Suspense>
}
export default ViewItemSection