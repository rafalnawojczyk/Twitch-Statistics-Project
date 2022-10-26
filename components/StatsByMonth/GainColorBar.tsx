import styles from "./GainColorBar.module.scss";

const GainColorBar: React.FC<{
    actualAmount: number;
    maxAmount: number;
    className?: string;
    divClassName?: string;
}> = props => {
    const diffValue = +(props.actualAmount / props.maxAmount).toFixed(2) * 100;

    return (
        <div className={`${styles["color-bar"]} ${props.divClassName}`}>
            <span className={props.className} style={{ width: `${diffValue}%` }}></span>
        </div>
    );
};

export default GainColorBar;
