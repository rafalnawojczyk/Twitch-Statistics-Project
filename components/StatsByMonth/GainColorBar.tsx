// diffValue={diffValue}
// diffDirection={diffDirection}
// className={styles[props.statsIndicator]}

import styles from "./GainColorBar.module.scss";

const GainColorBar: React.FC<{
    actualAmount: number;
    maxAmount: number;
    className: string;
}> = props => {
    const diffValue = +(props.actualAmount / props.maxAmount).toFixed(2) * 100;

    return (
        <div className={styles["color-bar"]}>
            <span className={props.className} style={{ width: `${diffValue}%` }}></span>
        </div>
    );
};

export default GainColorBar;
