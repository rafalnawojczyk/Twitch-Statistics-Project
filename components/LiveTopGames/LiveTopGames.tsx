import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MAX_TOP_LIVE_CHANNELS } from "../../config";
import LiveTableData from "../../models/LiveTableData";
import { numFormatter, prepareImage } from "../../utils/utils";
import Card from "../layout/Card";
import GameIcon from "../layout/svg/GameIcon";
import ImageIcon from "../layout/svg/ImageIcon";
import LanguageIcon from "../layout/svg/LanguageIcon";
import ListIcon from "../layout/svg/ListIcon";
import LiveIndicator from "../layout/svg/LiveIndicator";
import GainColorBar from "../StatsByMonth/GainColorBar";
import StatsLabel from "../StatsByMonth/StatsLabel";
import StatsTitle from "../StatsByMonth/StatsTitle";
import styles from "./LiveTopGames.module.scss";

const LiveTopGames: React.FC<{ data: LiveTableData }> = ({ data }) => {
    const router = useRouter();

    const gameClickHandler = (id: string) => {
        const url = `/games/${id}`;
        router.push(url);
    };

    const gamesArr = [...data.stats];

    gamesArr.length =
        gamesArr.length > MAX_TOP_LIVE_CHANNELS ? gamesArr.length : MAX_TOP_LIVE_CHANNELS;

    const [gamesList, setGamesList] = useState(gamesArr);
    // [a, b]
    //  a: 0 Average Viewers 1 Peak Viewers 2Peak Channel 3 Average Channels 4 Viewers per Channel
    //  b: 0 - decrementally 1 - incrementally
    // TODO: CHange this into more robust sorting system for 4 data types here
    const [sortBy, setSortBy] = useState<[number, number]>([1, 0]);

    useEffect(() => {
        const sortingType = sortBy[0] === 0 ? "followers" : "viewers";
        const sortingDir = sortBy[1] === 0 ? "+" : "-";
        const newgamesList = gamesArr.sort((a, b) => {
            if (sortingDir === "-") return a[sortingType]! - b[sortingType]!;

            return b[sortingType]! - a[sortingType]!;
        });

        setGamesList(prevList => newgamesList);
    }, [sortBy]);

    const maxAverageViewers = Math.max(...gamesList.map(el => el.averageViewers!));
    const maxPeakViewers = Math.max(...gamesList.map(el => el.peakViewers!));
    const maxPeakChannels = Math.max(...gamesList.map(el => el.peakChannels!));
    const maxAverageChannels = Math.max(...gamesList.map(el => el.averageChannels!));
    const maxViewersPerChannel = Math.max(...gamesList.map(el => el.viewersPerChannel!));

    const sortingHandler = (event: React.MouseEvent<HTMLSpanElement>) => {
        let sortingType = 1;

        if (event.currentTarget.textContent == "Followers ") {
            sortingType = 0;
        }
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
                    title={`Top 20 LIVE games statistics`}
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
                    <div onClick={sortingHandler}>
                        <StatsLabel title="Viewers per Channel" />
                    </div>
                </div>

                {gamesList.map((channel, index) => (
                    <div
                        key={channel.id}
                        className={styles.stats}
                        onClick={gameClickHandler.bind(null, channel.title)}
                    >
                        <StatsLabel title={index + 1 + ""} />
                        <img className={styles.stats__image} src={channel.profileImg} />
                        <StatsLabel title={channel.title} className={styles.stats__title} />

                        <img
                            className={styles[`stats__preview-image`]}
                            src={prepareImage(channel.image, "previewImage")}
                        />

                        <StatsLabel
                            title={channel.streamTitle!}
                            className={styles["stats__stream-title"]}
                        />
                        <StatsLabel
                            title={channel.language!.toUpperCase()}
                            className={styles.stats__language}
                        />
                        <img
                            className={styles["stats__game-image"]}
                            src={prepareImage(
                                channel.gameImg!
                                    ? channel.gameImg
                                    : "https://static-cdn.jtvnw.net/ttv-boxart/31376_IGDB-{width}x{height}.jpg",
                                "previewGame"
                            )}
                        />

                        <div className={styles["stats__value-box"]}>
                            <span className={styles["stats__value"]}>
                                {numFormatter(channel.viewers)}
                            </span>
                            <GainColorBar
                                actualAmount={channel.viewers}
                                maxAmount={12}
                                className={styles["stats__value-bar"]}
                            />
                        </div>

                        <div className={styles["stats__value-box"]}>
                            <span className={styles["stats__value"]}>
                                {numFormatter(channel.followers!)}
                            </span>
                            <GainColorBar
                                actualAmount={channel.followers!}
                                maxAmount={maxFollowersValue}
                                className={styles["stats__value-bar"]}
                            />
                        </div>
                    </div>
                ))}
            </Card>
        </>
    );
};

export default LiveTopGames;
