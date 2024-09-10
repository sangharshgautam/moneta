import {
    Grid,
    GridColumn, GridRow,
    Header,
    Segment,
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableHeaderCell,
    TableRow
} from "semantic-ui-react";
import React from "react";
import {Report} from "../../components/modules/common/Models";

const IncomeReport = (props: {report: Report}) => {
    const reports = props.report.taxReports;
    reports.sort((one, two) => (one.year > two.year ? -1 : 1));
    return <Segment basic>
        <Header as='h3'>Income Report</Header>
        <Grid>
            <GridRow columns={6} divided>
                <GridColumn></GridColumn>
                {reports.map(yearReport =>
                    <GridColumn key={yearReport.year} textAlign="right">
                        <Header as='h5'>{yearReport.year}</Header>
                    </GridColumn>
                )}
            </GridRow>
            <div className="ui divider"></div>
            <GridRow stretched>
                <GridColumn key="turnover">
                    <Header as='h4'>Turnover</Header>
                </GridColumn>
            </GridRow>
            <GridRow columns={6} divided>
                <GridColumn key="sales">
                    <Header as='h5'>Sales</Header>
                </GridColumn>
                {reports.map(yearReport =>
                    <GridColumn key={yearReport.turnover} textAlign="right">
                        <Header as='h5'>{yearReport.turnover}</Header>
                    </GridColumn>
                )}
            </GridRow>
            <div className="ui divider"></div>
            <GridRow stretched>
                <GridColumn key="staffcosts">
                    <Header as='h4'>Staff Costs</Header>
                </GridColumn>
            </GridRow>
            <GridRow columns={6} divided>
                <GridColumn key="wages">
                    <Header as='h5'>Wages and salaries</Header>
                </GridColumn>
                {reports.map(yearReport =>
                    <GridColumn key={yearReport.wages}>
                        <Header as='h5'>{yearReport.wages}</Header>
                    </GridColumn>
                )}
            </GridRow>
            <GridRow columns={6} divided>
                <GridColumn key="travel">
                    <Header as='h5'>Travel and subsistence</Header>
                </GridColumn>
                {reports.map(yearReport =>
                    <GridColumn key={yearReport.wages}>
                        <Header as='h5'>{yearReport.wages}</Header>
                    </GridColumn>
                )}
            </GridRow>
            <GridRow columns={6} divided>
                <GridColumn key="motor">
                    <Header as='h5'>Motor</Header>
                </GridColumn>
                {reports.map(yearReport =>
                    <GridColumn key={yearReport.motor} textAlign="right">
                        <Header as='h5'>{yearReport.motor}</Header>
                    </GridColumn>
                )}
            </GridRow>
            <div className="ui divider"></div>
        </Grid>
    </Segment>
}
export default IncomeReport