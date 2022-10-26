import { useRouter } from "next/router";
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

    const channelsList = data.stats;
    channelsList.length =
        channelsList.length > MAX_TOP_LIVE_CHANNELS ? channelsList.length : MAX_TOP_LIVE_CHANNELS;

    const maxValue = Math.max(...channelsList.map(el => el.viewers));

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
                    <StatsLabel title="Stream title" />
                    <LanguageIcon className={styles.stats__icon} />
                    <GameIcon className={styles.stats__icon} />
                    <StatsLabel title="Live viewers" />
                </div>

                {data.stats.map((channel, index) => (
                    <div
                        key={channel.id}
                        className={styles.stats}
                        onClick={channelClickHandler.bind(null, channel.title)}
                    >
                        <StatsLabel title={index + 1 + ""} />
                        <img
                            className={styles.stats__image}
                            src={prepareImage(channel.image, "activeChannels")}
                        />
                        <StatsLabel title={channel.title} className={styles.stats__title} />
                        {/* <StreamTitleTicker
                            title={channel.streamTitle!}
                            className={styles["stats__stream-title"]}
                        /> */}
                        <StatsLabel
                            title={channel.streamTitle!}
                            className={styles["stats__stream-title"]}
                        />
                        <StatsLabel
                            title={channel.language!.toUpperCase()}
                            className={styles.stats__language}
                        />
                        <img
                            className={styles.stats__image}
                            src={prepareImage(channel.image, "activeChannels")}
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
                    </div>
                ))}
            </Card>
        </>
    );
};

export default LiveTopChannels;
