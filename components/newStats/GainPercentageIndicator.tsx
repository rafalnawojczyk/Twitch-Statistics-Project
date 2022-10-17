import Arrow from "../layout/svg/Arrow";
import styles from "./GainPercentageIndicator.module.scss";

const GainPercentageIndicator: React.FC<{
    prevAmount: number;
    actualAmount: number;
}> = props => {
    const diffDirection = props.actualAmount - props.prevAmount > 0 ? "gain" : "loss";
    const diffValue = Math.abs(
        ((props.actualAmount - props.prevAmount) / props.prevAmount) * 100
    ).toFixed(1);

    return (
        <div className={styles.percentage}>
            {/* <Arrow className={styles[`percentage__${diffDirection}`]} /> */}
            <p className={styles[`percentage__amount`]}>{diffValue}%</p>
        </div>
    );
};

export default GainPercentageIndicator;
