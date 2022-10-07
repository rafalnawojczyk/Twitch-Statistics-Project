import TwitchLogo from "../layout/svg/TwitchLogo";
import styles from "./ViewsBox.module.scss";

const ViewsBox: React.FC<{ views: number; total: number }> = props => {
    const viewsPercentage = ((props.views / props.total) * 100).toFixed(1) + "%";

    return (
        <div className={styles.views}>
            <p className={styles["views__number"]}>{props.views}</p>
            <p className={styles["views__description"]}>
                <span className={styles["views__precentage"]}>{viewsPercentage}</span> of
                <TwitchLogo className={styles["views__image"]} color="#6441a5" /> total
            </p>
        </div>
    );
};

export default ViewsBox;
