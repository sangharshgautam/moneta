import React from 'react';
import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';

const CashFlow = (props: {records: any[]}) => {
        return (
            <ResponsiveContainer width="95%" height={400}>
                <BarChart
                    width={500}
                    height={300}
                    data={props.records.map(record => record.salarySlip)}
                    margin={{
                        top: 25,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="endDate" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="totalEarning" fill="#2884d8" stackId="earnings" />
                    <Bar dataKey="apprenticeshipLevy" fill="#8884d8" stackId="deductions" />
                    <Bar dataKey="companyMargin" fill="#82ca9d" stackId="deductions"/>
                    <Bar dataKey="employerPension" fill="#62ca7d" stackId="deductions"/>
                    <Bar dataKey="employerNI" fill="#06AD74" stackId="deductions"/>
                    <Bar dataKey="incomeTax" fill="#BEF251" stackId="deductions"/>
                </BarChart>
            </ResponsiveContainer>
        );
}
export default CashFlow;
