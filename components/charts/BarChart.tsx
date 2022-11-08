import styles from "./BarChart.module.scss";

import { BarChart as BarCharts, Bar, ResponsiveContainer, Tooltip } from "recharts";
import BarChartLabel from "./BarChartLabel";

type BarChartProps = { data: { name: string; value: number }[] };

const BarChart = ({ data }: BarChartProps) => {
    return (
        <div className={styles.chart__wrapper}>
            <ResponsiveContainer>
                <BarCharts
                    margin={{ top: 10, right: 5, bottom: 5, left: 5 }}
                    syncId={"langChart"}
                    barCategoryGap="1%"
                    width={100}
                    height={100}
                    data={data}
                >
                    <Tooltip
                        content={<BarChartLabel />}
                        cursor={{ fill: "rgba(255, 207, 42, .8)" }}
                        position={{ x: 0, y: 0 }}
                    />
                    <Bar dataKey="value" fill="rgba(255, 207, 42, .5)" />
                </BarCharts>
            </ResponsiveContainer>
        </div>
    );
};

export default BarChart;
