import LiveIndicator from "../layout/svg/LiveIndicator";
import styles from "./LiveStatsBox.module.scss";

type statsType =
    | "activeViewers"
    | "activeChannels"
    | "gamesStreamed"
    | "totalChannels"
    | "peakViewers"
    | "peakChannels";

type LiveStatsBoxProps = {
    title: string;
    type: statsType;
    value: number;
    date?: string;
    live?: boolean;
};

const LiveStatsBox = ({ title, type, value, date, live }: LiveStatsBoxProps) => {
    return (
        <div className={`${styles[type]} ${styles.stats__box}`}>
            <span className={styles.stats__title}>{title}</span>
            <p className={styles.stats__value}>
                {live && <LiveIndicator />}
                {value.toLocaleString()}
            </p>
            <p className={`${date ? "" : styles.hidden} ${styles.stats__date}`}>{date}</p>
        </div>
    );
};

export default LiveStatsBox;
