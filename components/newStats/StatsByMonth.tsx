import { useState } from "react";
import { DUMMY_MAX_MONTHLY_DATA, DUMMY_MONTHLY_DATA, MONTHS_LABELS } from "../../config";
import NewCard from "../layout/NewCard";
import StatsBox from "./StatsBox";
import styles from "./StatsByMonth.module.scss";
import StatsLabel from "./StatsLabel";
import StatsTitle from "./StatsTItle";

type monthlyDataObj = {
    [key: number]: {
        activeChannels: number;
        peakViewers: number;
        peakChannels: number;
        avgViewers: number;
        avgChannels: number;
        hoursWatched: number;
        gamesStreamed: number;
    }[];
};

type statsIndicator =
    | "activeChannels"
    | "peakViewers"
    | "peakChannels"
    | "avgViewers"
    | "avgChannels"
    | "hoursWatched"
    | "gamesStreamed";

const StatsByMonth = () => {
    const [selectedYear, setSelectedYear] = useState(2022);

    //TODO: PARSE IT FROM DB USING API ROUTE
    const data: monthlyDataObj = DUMMY_MONTHLY_DATA;

    const maxData: monthlyDataObj = DUMMY_MAX_MONTHLY_DATA;

    const maxFilteredData = maxData[selectedYear][0];

    const filteredData = data[selectedYear];

    const statisticsType: statsIndicator[] = [
        "activeChannels",
        "peakViewers",
        "peakChannels",
        "avgViewers",
        "avgChannels",
        "hoursWatched",
        "gamesStreamed",
    ];

    return (
        <>
            <div className={styles.stats__header}>
                <StatsTitle title="Twitch stats by month" />
            </div>
            <NewCard className={styles.stats}>
                <div className={styles.stats__grid}>
                    <StatsLabel title="Month" upperTitle={true} />
                    <StatsLabel title="Active Channels" upperTitle={true} />
                    <StatsLabel title="Peak Viewers" upperTitle={true} />
                    <StatsLabel title="Peak Channels" upperTitle={true} />
                    <StatsLabel title="Average Viewers" upperTitle={true} />
                    <StatsLabel title="Average Channels" upperTitle={true} />
                    <StatsLabel title="Hours Watched" upperTitle={true} />
                    <StatsLabel title="Games Streamed" upperTitle={true} />
                </div>

                {filteredData.map((month, index) => {
                    return (
                        <div className={styles.stats__grid}>
                            <StatsLabel title={`${MONTHS_LABELS[index]} ${selectedYear}`} />
                            {statisticsType.map(type => {
                                return (
                                    <StatsBox
                                        statsIndicator={type}
                                        actualAmount={month[type]}
                                        prevAmount={data[selectedYear - 1][index][type]}
                                        maxAmount={maxFilteredData[type]}
                                    />
                                );
                            })}
                            {/* ; // 7x statsBox which includes %loss/gain, actual number, and a bar. //
                            it should take props like thisYearNumber, lastYearNumber, statsIndicator
                            // stats indicator should be a className which will set some styles
                            on(color for bar) // gain/loss% should take loss/gain %, check if its
                            +/- and render things based on that // should make one mor ecomponent
                            with arrow up and arrow down probably */}
                        </div>
                    );
                })}
            </NewCard>
        </>
    );
};

export default StatsByMonth;
