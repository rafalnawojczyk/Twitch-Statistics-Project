import { useState, useCallback, useEffect } from "react";
import { ResponsiveContainer, Pie, PieChart as PieCharts, Cell, Sector } from "recharts";
import { COLORS_ARRAY } from "../../config";
import styles from "./PieChart.module.scss";

const PieChart: React.FC<{ title: string; data: { name: string; value: number }[] }> = props => {
    const [activeIndex, setActiveIndex] = useState(0);

    const colors = COLORS_ARRAY;
    const data = props.data;
    const maxIndex = data.length - 1;

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex(prevIndex => {
                let finalIndex = ++prevIndex;
                finalIndex = finalIndex > maxIndex ? 0 : finalIndex;
                return finalIndex;
            });
        }, 2000);
        return () => clearInterval(interval);
    }, []);

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
                    fontSize={12}
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

    const onPieEnter = useCallback(
        (_, index) => {
            setActiveIndex(index);
        },
        [setActiveIndex]
    );

    return (
        <div className={styles.chart__wrapper}>
            <h4 className={styles.chart__title}>{props.title}</h4>
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
                        fill={"transparent"}
                        labelLine={false}
                        paddingAngle={3}
                        innerRadius={70}
                        outerRadius={90}
                        onMouseEnter={onPieEnter}
                    >
                        {data?.map((entry, index) => (
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
