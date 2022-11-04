import { numFormatter } from "../../utils/utils";
import GainColorBar from "../StatsByMonth/GainColorBar";
import styles from "./TopGamesBox.module.scss";

const TopGamesBox: React.FC<{
    amount: number;
    maxAmount: number;
}> = props => {
    return (
        <div className={styles["stats__value-box"]}>
            <span className={styles["stats__value"]}>{numFormatter(Math.trunc(props.amount))}</span>
            <GainColorBar
                actualAmount={props.amount}
                maxAmount={props.maxAmount}
                className={styles["stats__value-bar"]}
            />
        </div>
    );
};

export default TopGamesBox;
