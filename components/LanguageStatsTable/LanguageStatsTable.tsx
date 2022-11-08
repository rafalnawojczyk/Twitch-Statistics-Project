import PieChart from "../charts/PieChart";

import BarChart from "../charts/BarChart";
import Card from "../layout/Card";
import StatsLabel from "../StatsByMonth/StatsLabel";
import StatsTitle from "../StatsByMonth/StatsTitle";
import styles from "./LanguageStatsTable.module.scss";
import { useCallback, useEffect, useState } from "react";
import LoadingSpinner from "../ui/LoadingSpinner";
import LanguageStats from "../../models/LanguageStats";

type LanguageStatsTableProps = { data: LanguageStats[] };

const LanguageStatsTable = ({ data }: LanguageStatsTableProps) => {
    const [dataIsLoading, setDataIsLoading] = useState(true);
    const [viewersChartData, setViewersChartData] = useState<
        {
            name: string;
            value: number;
        }[]
    >();
    const [channelsChartData, setChannelsChartData] = useState<
        {
            name: string;
            value: number;
        }[]
    >();

    const [pieChartActiveIndex, setPieChartActiveIndex] = useState(0);

    useEffect(() => {
        if (viewersChartData && channelsChartData) {
            const maxIndex = channelsChartData.length - 1;
            const interval = setInterval(() => {
                setPieChartActiveIndex(prevIndex => {
                    let finalIndex = ++prevIndex;
                    finalIndex = finalIndex > maxIndex ? 0 : finalIndex;
                    return finalIndex;
                });
            }, 2000);
            return () => clearInterval(interval);
        }
        const maxIndex = channelsChartData ? channelsChartData.length - 1 : 2;

        const interval = setInterval(() => {
            setPieChartActiveIndex(prevIndex => {
                let finalIndex = ++prevIndex;
                finalIndex = finalIndex > maxIndex ? 0 : finalIndex;
                return finalIndex;
            });
        }, 2000);
        return () => clearInterval(interval);
    }, [viewersChartData, channelsChartData]);

    useEffect(() => {
        setViewersChartData(
            data.map((lang: LanguageStats) => {
                const avgValue =
                    lang.chartData.reduce((a, b) => a + b.value, 0) / lang.chartData.length;
                return {
                    name: lang.title,
                    value: Math.trunc(avgValue),
                };
            })
        );
        setChannelsChartData(
            data.map((lang: LanguageStats) => {
                return {
                    name: lang.title,
                    value: Math.trunc(lang.averageChannels),
                };
            })
        );

        setDataIsLoading(false);
    }, []);

    const onPieEnter = useCallback((_: any, index: number) => {
        setPieChartActiveIndex(index);
    }, []);

    return (
        <div>
            <div className={styles.stats__header}>
                <StatsTitle title="Twitch stats by month" />
            </div>
            <Card className={styles.stats}>
                {dataIsLoading && <LoadingSpinner />}
                {!dataIsLoading && (
                    <>
                        <div className={styles.stats__grid}>
                            <StatsLabel
                                title="Language"
                                upperTitle={true}
                                className={styles.left}
                            />
                            <StatsLabel
                                className={styles.center}
                                title="Average concurrent viewers chart"
                                upperTitle={true}
                            />
                            <StatsLabel title="Average concurrent Viewers" upperTitle={true} />
                            <StatsLabel title="Average concurrent Channels" upperTitle={true} />
                        </div>

                        {data.map((lang: LanguageStats) => {
                            return (
                                <div className={styles.stats__grid} key={lang.title}>
                                    <StatsLabel title={lang.title} className={styles.left} />
                                    <BarChart data={lang.chartData} />
                                    <p className={styles.stats__value}>
                                        {lang.averageViewers.toLocaleString()}
                                    </p>
                                    <p className={styles.stats__value}>
                                        {lang.averageChannels.toLocaleString()}
                                    </p>
                                </div>
                            );
                        })}
                        <div className={styles.stats__charts}>
                            <PieChart
                                onPieEnter={onPieEnter}
                                index={pieChartActiveIndex}
                                data={viewersChartData!}
                                title="Average Conc. Viewers"
                            />
                            <PieChart
                                onPieEnter={onPieEnter}
                                index={pieChartActiveIndex}
                                data={channelsChartData!}
                                title="Average Conc. Channels"
                            />
                        </div>
                    </>
                )}
            </Card>
        </div>
    );
};

export default LanguageStatsTable;
