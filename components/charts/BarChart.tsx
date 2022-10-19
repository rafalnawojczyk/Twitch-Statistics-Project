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
import BarChartLabel from "./BarChartLabel";
import { useState } from "react";

const BarChart = () => {
    const [date, setDate] = useState("");
    const [value, setValue] = useState("");

    const data = [
        {
            name: "13 Oct, 2022 07:30",
            value: 3200,
            pv: 2400,
        },
        {
            name: "13 Oct, 2022 07:30",
            value: 3000,
            pv: 1398,
        },
        {
            name: "14 Oct, 2022 12:10",
            value: 2000,
            pv: 5000,
        },
        {
            name: "15 Oct, 2022 07:30",
            value: 2780,
            pv: 3908,
        },
        {
            name: "16 Oct, 2022 08:10",
            value: 1890,
            pv: 4200,
        },
        {
            name: "17 Oct, 2022 10:20",
            value: 2390,
            pv: 3800,
        },
        {
            name: "18 Oct, 2022 12:30",
            value: 3490,
            pv: 4300,
        },
        {
            name: "13 Oct, 2022 07:30",
            value: 3200,
            pv: 2400,
        },
        {
            name: "13 Oct, 2022 07:30",
            value: 3000,
            pv: 1398,
        },
        {
            name: "14 Oct, 2022 12:10",
            value: 2000,
            pv: 5000,
        },
        {
            name: "15 Oct, 2022 07:30",
            value: 2780,
            pv: 3908,
        },
        {
            name: "16 Oct, 2022 08:10",
            value: 1890,
            pv: 4200,
        },
        {
            name: "17 Oct, 2022 10:20",
            value: 2390,
            pv: 3800,
        },
        {
            name: "18 Oct, 2022 12:30",
            value: 3490,
            pv: 4300,
        },
        {
            name: "13 Oct, 2022 07:30",
            value: 3200,
            pv: 2400,
        },
        {
            name: "13 Oct, 2022 07:30",
            value: 3000,
            pv: 1398,
        },
        {
            name: "14 Oct, 2022 12:10",
            value: 2000,
            pv: 5000,
        },
        {
            name: "15 Oct, 2022 07:30",
            value: 2780,
            pv: 3908,
        },
        {
            name: "16 Oct, 2022 08:10",
            value: 1890,
            pv: 4200,
        },
        {
            name: "17 Oct, 2022 10:20",
            value: 2390,
            pv: 3800,
        },
        {
            name: "18 Oct, 2022 12:30",
            value: 3490,
            pv: 4300,
        },
        {
            name: "13 Oct, 2022 07:30",
            value: 3200,
            pv: 2400,
        },
        {
            name: "13 Oct, 2022 07:30",
            value: 3000,
            pv: 1398,
        },
        {
            name: "14 Oct, 2022 12:10",
            value: 2000,
            pv: 5000,
        },
        {
            name: "15 Oct, 2022 07:30",
            value: 2780,
            pv: 3908,
        },
        {
            name: "16 Oct, 2022 08:10",
            value: 1890,
            pv: 4200,
        },
        {
            name: "17 Oct, 2022 10:20",
            value: 2390,
            pv: 3800,
        },
        {
            name: "18 Oct, 2022 12:30",
            value: 3490,
            pv: 4300,
        },
        {
            name: "13 Oct, 2022 07:30",
            value: 3200,
            pv: 2400,
        },
        {
            name: "13 Oct, 2022 07:30",
            value: 3000,
            pv: 1398,
        },
        {
            name: "14 Oct, 2022 12:10",
            value: 2000,
            pv: 5000,
        },
        {
            name: "15 Oct, 2022 07:30",
            value: 2780,
            pv: 3908,
        },
        {
            name: "16 Oct, 2022 08:10",
            value: 1890,
            pv: 4200,
        },
        {
            name: "17 Oct, 2022 10:20",
            value: 2390,
            pv: 3800,
        },
        {
            name: "18 Oct, 2022 12:30",
            value: 3490,
            pv: 4300,
        },
        {
            name: "13 Oct, 2022 07:30",
            value: 3200,
            pv: 2400,
        },
        {
            name: "13 Oct, 2022 07:30",
            value: 3000,
            pv: 1398,
        },
        {
            name: "14 Oct, 2022 12:10",
            value: 2000,
            pv: 5000,
        },
        {
            name: "15 Oct, 2022 07:30",
            value: 2780,
            pv: 3908,
        },
        {
            name: "16 Oct, 2022 08:10",
            value: 1890,
            pv: 4200,
        },
        {
            name: "17 Oct, 2022 10:20",
            value: 2390,
            pv: 3800,
        },
        {
            name: "18 Oct, 2022 12:30",
            value: 3490,
            pv: 4300,
        },
        {
            name: "13 Oct, 2022 07:30",
            value: 3200,
            pv: 2400,
        },
        {
            name: "13 Oct, 2022 07:30",
            value: 3000,
            pv: 1398,
        },
        {
            name: "14 Oct, 2022 12:10",
            value: 2000,
            pv: 5000,
        },
        {
            name: "15 Oct, 2022 07:30",
            value: 2780,
            pv: 3908,
        },
        {
            name: "16 Oct, 2022 08:10",
            value: 1890,
            pv: 4200,
        },
        {
            name: "17 Oct, 2022 10:20",
            value: 2390,
            pv: 3800,
        },
        {
            name: "18 Oct, 2022 12:30",
            value: 3490,
            pv: 4300,
        },
        {
            name: "13 Oct, 2022 07:30",
            value: 3200,
            pv: 2400,
        },
        {
            name: "13 Oct, 2022 07:30",
            value: 3000,
            pv: 1398,
        },
        {
            name: "14 Oct, 2022 12:10",
            value: 2000,
            pv: 5000,
        },
        {
            name: "15 Oct, 2022 07:30",
            value: 2780,
            pv: 3908,
        },
        {
            name: "16 Oct, 2022 08:10",
            value: 1890,
            pv: 4200,
        },
        {
            name: "17 Oct, 2022 10:20",
            value: 2390,
            pv: 3800,
        },
        {
            name: "18 Oct, 2022 12:30",
            value: 3490,
            pv: 4300,
        },
        {
            name: "13 Oct, 2022 07:30",
            value: 3200,
            pv: 2400,
        },
        {
            name: "13 Oct, 2022 07:30",
            value: 3000,
            pv: 1398,
        },
        {
            name: "14 Oct, 2022 12:10",
            value: 2000,
            pv: 5000,
        },
        {
            name: "15 Oct, 2022 07:30",
            value: 2780,
            pv: 3908,
        },
        {
            name: "16 Oct, 2022 08:10",
            value: 1890,
            pv: 4200,
        },
        {
            name: "17 Oct, 2022 10:20",
            value: 2390,
            pv: 3800,
        },
        {
            name: "18 Oct, 2022 12:30",
            value: 3490,
            pv: 4300,
        },
    ];

    const changeDetailsHandler = (date: string, value: number) => {
        setDate(date);
        setValue(value.toLocaleString());
    };

    return (
        <div className={styles.chart__wrapper}>
            <div className={styles.chart__details}>
                <p>{date}</p>
                <p>{value}</p>
            </div>
            <ResponsiveContainer>
                <BarCharts
                    syncId={"langChart"}
                    barCategoryGap="1%"
                    width={100}
                    height={100}
                    data={data}
                >
                    <Tooltip
                        content={<BarChartLabel onMouse={changeDetailsHandler} />}
                        cursor={{ fill: "rgba(255, 207, 42, .8)" }}
                        position={{ y: -100 }}
                    />
                    <Bar dataKey="value" fill="rgba(255, 207, 42, .5)" />
                </BarCharts>
            </ResponsiveContainer>
        </div>
    );
};

export default BarChart;
