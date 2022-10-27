import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MAX_TOP_LIVE_CHANNELS, SERVER } from "../../config";
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
import styles from "./LiveTopChannels.module.scss";
import StreamTitleTicker from "./StreamTitleTicker";

const LiveTopChannels: React.FC<{ data: LiveTableData }> = ({ data }) => {
    const router = useRouter();

    const channelClickHandler = (id: string) => {
        const url = `/channel/${id}`;
        router.push(url);
    };

    const channelsArr = [...data.stats];

    channelsArr.length =
        channelsArr.length > MAX_TOP_LIVE_CHANNELS ? channelsArr.length : MAX_TOP_LIVE_CHANNELS;

    const [channelsList, setChannelsList] = useState(channelsArr);
    // [a, b] a: 0 - followers, 1 - viewers; b: 0 - decrementally 1 - incrementally
    const [sortBy, setSortBy] = useState<[number, number]>([1, 0]);

    useEffect(() => {
        const sortingType = sortBy[0] === 0 ? "followers" : "viewers";
        const sortingDir = sortBy[1] === 0 ? "+" : "-";
        const newChannelsList = channelsArr.sort((a, b) => {
            if (sortingDir === "-") return a[sortingType]! - b[sortingType]!;

            return b[sortingType]! - a[sortingType]!;
        });

        setChannelsList(prevList => newChannelsList);
    }, [sortBy]);

    const maxValue = Math.max(...channelsList.map(el => el.viewers));
    const maxFollowersValue = Math.max(...channelsList.map(el => el.followers!));

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
                    title={`Top 50 LIVE channels statistics`}
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
                    <StatsLabel title="Channel name" />
                    <StatsLabel title="Preview" />
                    <StatsLabel title="Stream title" />
                    <LanguageIcon className={styles.stats__icon} />
                    <GameIcon className={styles.stats__icon} />
                    <div onClick={sortingHandler}>
                        <StatsLabel title="Live viewers" />
                    </div>
                    <div onClick={sortingHandler}>
                        <StatsLabel title="Followers" />
                    </div>
                </div>

                {channelsList.map((channel, index) => (
                    <div
                        key={channel.id}
                        className={styles.stats}
                        onClick={channelClickHandler.bind(null, channel.title)}
                    >
                        <StatsLabel title={index + 1 + ""} />
                        <img className={styles.stats__image} src={channel.profileImg} />
                        <StatsLabel title={channel.title} className={styles.stats__title} />

                        <img
                            className={styles[`stats__preview-image`]}
                            src={prepareImage(channel.image, "previewImage")}
                        />
                        <StreamTitleTicker
                            title={channel.streamTitle!}
                            className={styles["stats__stream-title"]}
                        />
                        {/* <StatsLabel
                            title={channel.streamTitle!}
                            className={styles["stats__stream-title"]}
                        /> */}
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
                                maxAmount={maxValue}
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

export default LiveTopChannels;
