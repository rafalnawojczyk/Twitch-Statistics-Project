import Arrow from "../layout/svg/Arrow";
import styles from "./GainPercentageIndicator.module.scss";

type GainPercentageIndicatorProps = {
    prevAmount: number;
    actualAmount: number;
    className?: string;
};

const GainPercentageIndicator = ({
    prevAmount,
    actualAmount,
    className,
}: GainPercentageIndicatorProps) => {
    const diffDirection = actualAmount - prevAmount > 0 ? "gain" : "loss";
    const diffValue = Math.abs(((actualAmount - prevAmount) / prevAmount) * 100).toFixed(1);

    return (
        <div className={`${className} ${styles.percentage}`}>
            <Arrow className={styles[`percentage__${diffDirection}`]} />
            <p className={styles[`percentage__amount`]}>{diffValue}%</p>
        </div>
    );
};

export default GainPercentageIndicator;
