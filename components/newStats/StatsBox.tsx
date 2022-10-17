import GainColorBar from "./GainColorBar";
import GainPercentageIndicator from "./GainPercentageIndicator";
import styles from "./StatsBox.module.scss";

type statsIndicator =
    | "activeChannels"
    | "peakViewers"
    | "peakChannels"
    | "avgViewers"
    | "avgChannels"
    | "hoursWatched"
    | "gamesStreamed";

const StatsBox: React.FC<{
    actualAmount: number;
    prevAmount: number;
    statsIndicator: statsIndicator;
    maxAmount: number;
}> = props => {
    return (
        <div className={styles.stats__box}>
            <GainPercentageIndicator
                prevAmount={props.prevAmount}
                actualAmount={props.actualAmount}
            />
            <span
                className={`${styles.stats__amount} ${
                    props.actualAmount === props.maxAmount ? styles["stats__amount--bold"] : ""
                }`}
            >
                {props.actualAmount.toLocaleString()}
            </span>
            <GainColorBar
                maxAmount={props.maxAmount}
                actualAmount={props.actualAmount}
                className={styles[props.statsIndicator]}
            />
        </div>
    );
};

export default StatsBox;
