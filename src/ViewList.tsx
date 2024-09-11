import {
    Dimmer,
    Header, Icon,
    Loader, Menu, MenuItem,
    Segment,
    Table,
    TableBody,
    TableCell, TableFooter,
    TableHeader,
    TableHeaderCell,
    TableRow
} from "semantic-ui-react";
import {NavLink} from "react-router-dom";
import React from "react";
import {useQuery} from "@apollo/client";
import {BUSINESS_ID} from "./services/Wave";

const ViewList = (props: {object: string, keys: string[], query: any}) => {
    const { loading, error, data, refetch } = useQuery(props.query, {variables: {
            id: BUSINESS_ID
        }});
    if (loading) return <Dimmer active><Loader inverted>Loading {props.object}</Loader></Dimmer>;
    if (error) return <p>Error : {error.message}</p>;

    return <Segment basic>
        <Header as='h3'>{props.object}</Header>
        <Table celled>
            <TableHeader>
                <TableRow>
                    {props.keys.filter(key => key !== 'id').map(key => <TableHeaderCell>{key}</TableHeaderCell>)}
                </TableRow>
            </TableHeader>

            <TableBody>
                {data.business?.[`${props.object}`].edges.map((edge: any) => edge.node).map((record: any) =>
                    <TableRow key={record.id}>
                        {props.keys.map((key, index) => (
                            <>
                                {index === 1 && <TableCell key={key}><NavLink to={`${record.id}`}>{record?.[`${key}`]}</NavLink></TableCell>}
                                {index > 1 && <TableCell key={key}>{record?.[`${key}`]}</TableCell>}
                            </>
                        ))}
                    </TableRow>)}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableHeaderCell colSpan='3'>
                        <Menu floated='right' pagination>
                            <MenuItem as='a' icon>
                                <Icon name='chevron left' />
                            </MenuItem>
                            <MenuItem as='a'>1</MenuItem>
                            <MenuItem as='a'>2</MenuItem>
                            <MenuItem as='a'>3</MenuItem>
                            <MenuItem as='a'>4</MenuItem>
                            <MenuItem as='a' icon>
                                <Icon name='chevron right' />
                            </MenuItem>
                        </Menu>
                    </TableHeaderCell>
                </TableRow>
            </TableFooter>
        </Table>
    </Segment>
}
export default ViewList;