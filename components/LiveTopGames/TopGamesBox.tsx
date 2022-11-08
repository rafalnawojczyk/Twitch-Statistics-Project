import { numFormatter } from "../../utils/utils";
import GainColorBar from "../StatsByMonth/GainColorBar";
import styles from "./TopGamesBox.module.scss";

type TopGamesProps = {
    amount: number;
    maxAmount: number;
    className?: string;
};

const TopGamesBox = ({ amount, maxAmount, className }: TopGamesProps) => {
    return (
        <div className={`${styles["stats__value-box"]} ${className}`}>
            <span className={styles["stats__value"]}>{numFormatter(Math.trunc(amount))}</span>
            <GainColorBar
                actualAmount={amount}
                maxAmount={maxAmount}
                className={`${styles["stats__value-bar"]}`}
            />
        </div>
    );
};

export default TopGamesBox;
