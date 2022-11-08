import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { MAX_TOP_LIVE_CHANNELS } from "../../config";
import LiveTableData, { StatsArr } from "../../models/LiveTableData";
import { prepareImage } from "../../utils/utils";
import BarChart from "../charts/BarChart";
import Card from "../layout/Card";
import ImageIcon from "../layout/svg/ImageIcon";
import ListIcon from "../layout/svg/ListIcon";
import LiveIndicator from "../layout/svg/LiveIndicator";
import StatsLabel from "../StatsByMonth/StatsLabel";
import StatsTitle from "../StatsByMonth/StatsTitle";
import styles from "./LiveTopGames.module.scss";
import TopGamesBox from "./TopGamesBox";

type LiveTopGamesProps = { data: LiveTableData };

const LiveTopGames = ({ data }: LiveTopGamesProps) => {
    const router = useRouter();

    const gameClickHandler = (id: string) => {
        const url = `/games/${id}`;
        router.push(url);
    };

    const gamesArr = [...data.stats];

    gamesArr.length =
        gamesArr.length > MAX_TOP_LIVE_CHANNELS ? gamesArr.length : MAX_TOP_LIVE_CHANNELS;

    const [gamesList, setGamesList] = useState(gamesArr);

    const [sortBy, setSortBy] = useState<[0 | 1 | 2 | 3 | 4, 0 | 1]>([1, 0]);

    useEffect(() => {
        const sortingName: (
            | "averageViewers"
            | "peakViewers"
            | "peakChannels"
            | "averageChannels"
            | "viewersPerChannel"
        )[] = [
            "averageViewers",
            "peakViewers",
            "peakChannels",
            "averageChannels",
            "viewersPerChannel",
        ];

        const sortingType:
            | "averageViewers"
            | "peakViewers"
            | "peakChannels"
            | "averageChannels"
            | "viewersPerChannel" = sortingName[sortBy[0]];

        const sortingDir = sortBy[1] === 0 ? "+" : "-";
        const newGamesList = gamesArr.sort((a, b) => {
            if (sortingDir === "-") return a[sortingType]! - b[sortingType]!;
            return b[sortingType]! - a[sortingType]!;
        });

        setGamesList(prevList => newGamesList);
    }, [sortBy]);

    const maxAverageViewers = Math.max(
        ...gamesList.filter(a => a.averageViewers).map(el => el.averageViewers!)
    );
    const maxPeakViewers = Math.max(
        ...gamesList.filter(a => a.peakViewers).map(el => el.peakViewers!)
    );
    const maxPeakChannels = Math.max(
        ...gamesList.filter(a => a.peakChannels).map(el => el.peakChannels!)
    );
    const maxAverageChannels = Math.max(
        ...gamesList.filter(a => a.averageChannels).map(el => el.averageChannels!)
    );
    const maxViewersPerChannel = Math.max(
        ...gamesList.filter(a => a.viewersPerChannel).map(el => el.viewersPerChannel!)
    );

    const sortingHandler = (event: React.MouseEvent<HTMLSpanElement>) => {
        const sortingTypes = [
            "Average Viewers",
            "Peak Viewers",
            "Peak Channels",
            "Average Channels",
            "Viewers/Channel",
        ];

        const sortingType = sortingTypes.indexOf(event.currentTarget.textContent!) as
            | 0
            | 1
            | 2
            | 3
            | 4;

        setSortBy(prevSorting => {
            const invertedDir = prevSorting[1] === 0 ? 1 : 0;
            const sortingDir = prevSorting[0] === sortingType ? invertedDir : 0;
            return [sortingType, sortingDir];
        });
    };

    return (
        <>
            <div className={styles.wrapper}>
                <StatsTitle
                    title={`Top 50 LIVE games statistics`}
                    icon={
                        <Card className={styles.stats__icon}>
                            <LiveIndicator />
                        </Card>
                    }
                />
            </div>

            <Card className={styles.card}>
                <div className={styles.stats}>
                    <ListIcon className={styles.stats__icon} />
                    <ImageIcon className={styles.stats__icon} />
                    <StatsLabel title="Game title" />
                    <StatsLabel title="Avg Viewers Chart" />
                    <div onClick={sortingHandler}>
                        <StatsLabel title="Average Viewers" />
                    </div>
                    <div onClick={sortingHandler}>
                        <StatsLabel title="Peak Viewers" />
                    </div>
                    <div onClick={sortingHandler}>
                        <StatsLabel title="Peak Channels" />
                    </div>
                    <div onClick={sortingHandler}>
                        <StatsLabel title="Average Channels" />
                    </div>
                    <div onClick={sortingHandler} className={styles["viewers-per-channel"]}>
                        <StatsLabel title="Viewers/Channel" />
                    </div>
                </div>

                {gamesList.map((game, index) => (
                    <div
                        key={game.id}
                        className={styles.stats}
                        onClick={gameClickHandler.bind(null, game.title)}
                    >
                        <StatsLabel title={index + 1 + ""} />
                        <img
                            className={styles["stats__game-image"]}
                            src={prepareImage(game.image, "previewGame")}
                        />
                        <StatsLabel title={game.title} className={styles.stats__title} />
                        <BarChart data={game.chartData!} />
                        <TopGamesBox amount={game.averageViewers!} maxAmount={maxAverageViewers} />
                        <TopGamesBox amount={game.peakViewers!} maxAmount={maxPeakViewers} />

                        <TopGamesBox amount={game.peakChannels!} maxAmount={maxPeakChannels} />
                        <TopGamesBox
                            amount={game.averageChannels!}
                            maxAmount={maxAverageChannels}
                        />

                        <TopGamesBox
                            className={styles["viewers-per-channel"]}
                            amount={game.viewersPerChannel!}
                            maxAmount={maxViewersPerChannel}
                        />
                    </div>
                ))}
            </Card>
        </>
    );
};

export default LiveTopGames;
