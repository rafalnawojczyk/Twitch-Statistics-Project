import styles from "./GainColorBar.module.scss";

type GainColorBarProps = {
    actualAmount: number;
    maxAmount: number;
    className?: string;
    divClassName?: string;
};

const GainColorBar = ({ actualAmount, maxAmount, className, divClassName }: GainColorBarProps) => {
    const diffValue = +(actualAmount / maxAmount).toFixed(2) * 100;

    return (
        <div data-testid="color-bar-wrapper" className={`${styles["color-bar"]} ${divClassName}`}>
            <span
                data-testid="color-span"
                className={className}
                style={{ width: `${diffValue}%` }}
            ></span>
        </div>
    );
};

export default GainColorBar;
