import React, { useState } from "react";
import { DUMMY_MAX_MONTHLY_DATA, DUMMY_MONTHLY_DATA, MONTHS_LABELS } from "../../config";
import Card from "../layout/Card";
import ExpandSvg from "../layout/svg/ExpandSvg";
import Button from "../ui/Button";
import DropdownSelector from "../ui/DropdownSelector";
import StatsBox from "./StatsBox";
import styles from "./StatsByMonth.module.scss";
import StatsLabel from "./StatsLabel";
import StatsTitle from "./StatsTitle";

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
    const [showYearSelector, setShowYearSelector] = useState(false);

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

    const yearSelectingShowHandler = (event: React.MouseEvent) => {
        event.preventDefault();
        setShowYearSelector(prevState => !prevState);
    };

    const yearSelectingHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (!(event.target instanceof HTMLButtonElement)) {
            return;
        }
        const clickedYear = +event.target.dataset.value!;

        if (clickedYear !== selectedYear) setSelectedYear(clickedYear);

        setShowYearSelector(false);
    };

    const listedYears = Object.keys(data);

    const statisticsMarkup = filteredData.map((month, index) => {
        return (
            <div key={MONTHS_LABELS[index]} className={styles.stats__grid}>
                <StatsLabel title={`${MONTHS_LABELS[index]} ${selectedYear}`} />
                {statisticsType.map(type => {
                    return (
                        <StatsBox
                            key={month[type]}
                            statsIndicator={type}
                            actualAmount={month[type]}
                            prevAmount={data[selectedYear - 1]?.[index]?.[type] || 0}
                            maxAmount={maxFilteredData[type]}
                        />
                    );
                })}
            </div>
        );
    });

    return (
        <>
            <div className={styles.stats__header}>
                <StatsTitle title="Twitch stats by month" />
                <div className={styles["stats__button-box"]}>
                    <Button
                        type="button"
                        onClick={yearSelectingShowHandler}
                        className={styles.stats__button}
                    >
                        <p>{selectedYear}</p>
                        <ExpandSvg className={styles["stats__header-icon"]} />
                    </Button>
                    {showYearSelector && (
                        <DropdownSelector
                            values={listedYears}
                            className={styles.stats__dropdown}
                            onClick={yearSelectingHandler}
                        />
                    )}
                </div>
            </div>
            <Card className={styles.stats}>
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

                {statisticsMarkup}
            </Card>
        </>
    );
};

export default StatsByMonth;
