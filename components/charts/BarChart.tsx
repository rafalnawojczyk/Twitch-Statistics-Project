import styles from "./BarChart.module.scss";

import {
    BarChart as BarCharts,
    CartesianGrid,
    Bar,
    ResponsiveContainer,
    Legend,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

const BarChart = () => {
    const data = [
        {
            name: "Page A",
            uv: 3200,
            pv: 2400,
        },
        {
            name: "Page B",
            uv: 3000,
            pv: 1398,
        },
        {
            name: "Page C",
            uv: 2000,
            pv: 5000,
        },
        {
            name: "Page D",
            uv: 2780,
            pv: 3908,
        },
        {
            name: "Page E",
            uv: 1890,
            pv: 4200,
        },
        {
            name: "Page F",
            uv: 2390,
            pv: 3800,
        },
        {
            name: "Page G",
            uv: 3490,
            pv: 4300,
        },
        {
            name: "Page A",
            uv: 3200,
            pv: 2400,
        },
        {
            name: "Page B",
            uv: 3000,
            pv: 1398,
        },
        {
            name: "Page C",
            uv: 2000,
            pv: 5000,
        },
        {
            name: "Page D",
            uv: 2780,
            pv: 3908,
        },
        {
            name: "Page E",
            uv: 1890,
            pv: 4200,
        },
        {
            name: "Page F",
            uv: 2390,
            pv: 3800,
        },
        {
            name: "Page G",
            uv: 3490,
            pv: 4300,
        },
        {
            name: "Page A",
            uv: 3200,
            pv: 2400,
        },
        {
            name: "Page B",
            uv: 3000,
            pv: 1398,
        },
        {
            name: "Page C",
            uv: 2000,
            pv: 5000,
        },
        {
            name: "Page D",
            uv: 2780,
            pv: 3908,
        },
        {
            name: "Page E",
            uv: 1890,
            pv: 4200,
        },
        {
            name: "Page F",
            uv: 2390,
            pv: 3800,
        },
        {
            name: "Page G",
            uv: 3490,
            pv: 4300,
        },
        {
            name: "Page A",
            uv: 3200,
            pv: 2400,
        },
        {
            name: "Page B",
            uv: 3000,
            pv: 1398,
        },
        {
            name: "Page C",
            uv: 2000,
            pv: 5000,
        },
        {
            name: "Page D",
            uv: 2780,
            pv: 3908,
        },
        {
            name: "Page E",
            uv: 1890,
            pv: 4200,
        },
        {
            name: "Page F",
            uv: 2390,
            pv: 3800,
        },
        {
            name: "Page G",
            uv: 3490,
            pv: 4300,
        },
        {
            name: "Page A",
            uv: 3200,
            pv: 2400,
        },
        {
            name: "Page B",
            uv: 3000,
            pv: 1398,
        },
        {
            name: "Page C",
            uv: 2000,
            pv: 5000,
        },
        {
            name: "Page D",
            uv: 2780,
            pv: 3908,
        },
        {
            name: "Page E",
            uv: 1890,
            pv: 4200,
        },
        {
            name: "Page F",
            uv: 2390,
            pv: 3800,
        },
        {
            name: "Page G",
            uv: 3490,
            pv: 4300,
        },
        {
            name: "Page A",
            uv: 3200,
            pv: 2400,
        },
        {
            name: "Page B",
            uv: 3000,
            pv: 1398,
        },
        {
            name: "Page C",
            uv: 2000,
            pv: 5000,
        },
        {
            name: "Page D",
            uv: 2780,
            pv: 3908,
        },
        {
            name: "Page E",
            uv: 1890,
            pv: 4200,
        },
        {
            name: "Page F",
            uv: 2390,
            pv: 3800,
        },
        {
            name: "Page G",
            uv: 3490,
            pv: 4300,
        },
        {
            name: "Page A",
            uv: 3200,
            pv: 2400,
        },
        {
            name: "Page B",
            uv: 3000,
            pv: 1398,
        },
        {
            name: "Page C",
            uv: 2000,
            pv: 5000,
        },
        {
            name: "Page D",
            uv: 2780,
            pv: 3908,
        },
        {
            name: "Page E",
            uv: 1890,
            pv: 4200,
        },
        {
            name: "Page F",
            uv: 2390,
            pv: 3800,
        },
        {
            name: "Page G",
            uv: 3490,
            pv: 4300,
        },
        {
            name: "Page A",
            uv: 3200,
            pv: 2400,
        },
        {
            name: "Page B",
            uv: 3000,
            pv: 1398,
        },
        {
            name: "Page C",
            uv: 2000,
            pv: 5000,
        },
        {
            name: "Page D",
            uv: 2780,
            pv: 3908,
        },
        {
            name: "Page E",
            uv: 1890,
            pv: 4200,
        },
        {
            name: "Page F",
            uv: 2390,
            pv: 3800,
        },
        {
            name: "Page G",
            uv: 3490,
            pv: 4300,
        },
        {
            name: "Page A",
            uv: 3200,
            pv: 2400,
        },
        {
            name: "Page B",
            uv: 3000,
            pv: 1398,
        },
        {
            name: "Page C",
            uv: 2000,
            pv: 5000,
        },
        {
            name: "Page D",
            uv: 2780,
            pv: 3908,
        },
        {
            name: "Page E",
            uv: 1890,
            pv: 4200,
        },
        {
            name: "Page F",
            uv: 2390,
            pv: 3800,
        },
        {
            name: "Page G",
            uv: 3490,
            pv: 4300,
        },
    ];

    return (
        <div className={styles.wrapper}>
            <ResponsiveContainer>
                <BarCharts
                    syncId={"langChart"}
                    barCategoryGap="1%"
                    width={100}
                    height={100}
                    data={data}
                >
                    <Tooltip
                        content={<div></div>}
                        cursor={{ fill: "rgb(255, 207, 42)" }}
                        position={{ y: -100 }}
                    />
                    <Bar dataKey="pv" fill="rgba(255, 207, 42, .5)" />
                </BarCharts>
            </ResponsiveContainer>
        </div>
    );
};

export default BarChart;
