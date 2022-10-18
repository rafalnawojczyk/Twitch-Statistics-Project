import LiveIndicator from "../layout/svg/LiveIndicator";
import styles from "./LiveStatsBox.module.scss";

type statsType =
    | "activeViewers"
    | "activeChannels"
    | "gamesStreamed"
    | "totalChannels"
    | "peakViewers"
    | "peakChannels";

const LiveStatsBox: React.FC<{
    title: string;
    type: statsType;
    value: number;
    date?: string;
    live?: boolean;
}> = props => {
    return (
        <div className={`${styles[props.type]} ${styles.stats__box}`}>
            <span className={styles.stats__title}>{props.title}</span>
            <p className={styles.stats__value}>
                {props.live && <LiveIndicator />}
                {props.value.toLocaleString()}
            </p>
            <p className={`${props.date ? "" : styles.hidden} ${styles.stats__date}`}>
                {props.date}
            </p>
        </div>
    );
};

export default LiveStatsBox;
