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

type StatsBoxProps = {
    actualAmount: number;
    prevAmount: number;
    statsIndicator: statsIndicator;
    maxAmount: number;
};

const StatsBox = ({ actualAmount, prevAmount, statsIndicator, maxAmount }: StatsBoxProps) => {
    const showPercentage = prevAmount !== 0 ? true : false;

    return (
        <div className={styles.stats__box}>
            <GainPercentageIndicator
                prevAmount={prevAmount}
                actualAmount={actualAmount}
                className={`${showPercentage ? "" : styles.hidden}`}
            />

            <span
                className={`${styles.stats__amount} ${
                    actualAmount === maxAmount ? styles["stats__amount--bold"] : ""
                }`}
            >
                {actualAmount.toLocaleString()}
            </span>
            <GainColorBar
                maxAmount={maxAmount}
                actualAmount={actualAmount}
                className={styles[statsIndicator]}
            />
        </div>
    );
};

export default StatsBox;
