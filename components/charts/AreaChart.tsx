import Card from "../layout/Card";
import styles from "./AreaChart.module.scss";
import { AreaChart as AreaCharts, Area, Tooltip, ResponsiveContainer } from "recharts";
import { DUMMY_CHART_LIVE_DATA } from "../../config";
import CustomTooltip from "./CustomTooltip";
import LiveStatsTitle from "../LiveStatsTable/LiveStatsTitle";
import StatsTitle from "../StatsByMonth/StatsTitle";
import LiveIndicator from "../layout/svg/LiveIndicator";

const data = DUMMY_CHART_LIVE_DATA;

const AreaChart: React.FC<{ color: string; title: string }> = props => {
    const randomClass = Math.abs(Math.random() * 1000) + "";
    const randomClass2 = Math.abs(Math.random() * 1000) + "";

    return (
        <>
            <StatsTitle
                title={props.title}
                icon={
                    <Card className={styles.icon}>
                        <LiveIndicator />
                    </Card>
                }
            />
            <Card className={styles.chart__wrapper}>
                <ResponsiveContainer>
                    <AreaCharts
                        syncId={"stats"}
                        width={100}
                        height={60}
                        data={data}
                        margin={{
                            top: 5,
                            right: 0,
                            left: 0,
                            bottom: 5,
                        }}
                    >
                        <defs>
                            <linearGradient id={randomClass} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="10%" stopColor={props.color} stopOpacity={0.4} />
                                <stop offset="100%" stopColor={props.color} stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id={randomClass2} x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="rgb(241, 241, 241)"
                                    stopOpacity={0.15}
                                />
                                <stop offset="95%" stopColor="rgb(241, 241, 241)" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <Tooltip cursor={false} content={<CustomTooltip />} />
                        <Area
                            type="monotone"
                            dataKey="previousWeekViewers"
                            stroke={"rgba(241, 241, 241, 0.5)"}
                            fill={`url(#${randomClass2})`}
                            strokeDasharray="4 4"
                        />
                        <Area
                            type="monotone"
                            dataKey="thisWeekViewers"
                            stroke={props.color}
                            fill={`url(#${randomClass})`}
                        />
                    </AreaCharts>
                </ResponsiveContainer>
            </Card>
        </>
    );
};

export default AreaChart;
