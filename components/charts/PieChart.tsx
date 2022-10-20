import { useState, useCallback } from "react";
import { Label, Sector } from "recharts";
import { ResponsiveContainer, Pie, PieChart as PieCharts, Cell, Tooltip } from "recharts";
import { COLORS_ARRAY } from "../../config";
import styles from "./PieChart.module.scss";

const PieChart = () => {
    const colors = COLORS_ARRAY;
    const [activeIndex, setActiveIndex] = useState(0);

    const data = [
        {
            name: "Group A",
            value: 400,
        },
        {
            name: "Group B",
            value: 300,
        },
        {
            name: "Group C",
            value: 300,
        },
        {
            name: "Group D",
            value: 200,
        },
        {
            name: "Group E",
            value: 278,
        },
        {
            name: "Group F",
            value: 189,
        },
        {
            name: "Group A",
            value: 400,
        },
        {
            name: "Group B",
            value: 300,
        },
        {
            name: "Group C",
            value: 300,
        },
        {
            name: "Group D",
            value: 200,
        },
        {
            name: "Group E",
            value: 278,
        },
        {
            name: "Group F",
            value: 189,
        },
    ];

    // TODO: ADD A FUNCTION THAT WILL CHANGE ACTIVEINDEX EACH 3 SECONDS. EACH MOUSEOVER SHOULD RESET THAT TIMER

    const renderActiveShape = (props: any) => {
        const RADIAN = Math.PI / 180;
        const {
            cx,
            cy,

            innerRadius,
            outerRadius,
            startAngle,
            endAngle,
            fill,
            payload,
            percent,
            value,
        } = props;

        return (
            <g>
                <text
                    x={cx}
                    y={cy}
                    dy={0}
                    textAnchor="middle"
                    fontSize={20}
                    fill={fill}
                    className={styles.chart__name}
                >
                    {`${payload.name} 
                      
                    `}
                </text>
                <text
                    x={cx}
                    y={cy}
                    dy={0}
                    textAnchor="middle"
                    className={styles.chart__value}
                    fill={"rgba(255,255,255, .8)"}
                >
                    {`
                      ${payload.value} 
                    `}
                </text>

                <Sector
                    cx={cx}
                    cy={cy}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    fill={fill}
                />
                <Sector
                    cx={cx}
                    cy={cy}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    innerRadius={outerRadius + 6}
                    outerRadius={outerRadius + 10}
                    fill={fill}
                />
            </g>
        );
    };

    // const renderCustomizedLabel = ({
    //     cx,
    //     cy,
    //     midAngle,
    //     innerRadius,
    //     outerRadius,
    //     percent,
    //     index,
    // }) => {
    //     const RADIAN = Math.PI / 180;
    //     const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    //     const x = cx + radius * Math.cos(-midAngle * RADIAN);
    //     const y = cy + radius * Math.sin(-midAngle * RADIAN);

    //     return (
    //         <text
    //             x={x}
    //             y={y}
    //             fill="white"
    //             textAnchor={x > cx ? "start" : "end"}
    //             dominantBaseline="central"
    //         >
    //             {`${(percent * 100).toFixed(0)}%`}
    //         </text>
    //     );
    // };
    const onPieEnter = useCallback(
        (_, index) => {
            setActiveIndex(index);
        },
        [setActiveIndex]
    );

    return (
        <div className={styles.chart__wrapper}>
            <ResponsiveContainer>
                <PieCharts width={730} height={250}>
                    <Pie
                        data={data}
                        activeIndex={activeIndex}
                        activeShape={renderActiveShape}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        paddingAngle={3}
                        innerRadius={70}
                        outerRadius={90}
                        onMouseEnter={onPieEnter}
                    >
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={colors[index % colors.length]}
                                stroke={colors[index % colors.length]}
                            />
                        ))}
                    </Pie>
                </PieCharts>
            </ResponsiveContainer>
        </div>
    );
};

export default PieChart;
