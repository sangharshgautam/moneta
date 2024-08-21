import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import React from "react";
import {Report} from "../../components/modules/common/Models";

const TxnChart = (props: {report: Report}) => {
    return <ResponsiveContainer width="95%" height={400}>
        <BarChart
            width={500}
            height={300}
            data={props.report.transactions}
            margin={{
                top: 25,
                right: 30,
                left: 20,
                bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="balance" fill="#2884d8" stackId="balance" />
        </BarChart>
    </ResponsiveContainer>
}
export default TxnChart