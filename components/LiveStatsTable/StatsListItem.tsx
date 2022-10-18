import GainColorBar from "../StatsByMonth/GainColorBar";
import styles from "./StatsListItem.module.scss";

const StatsListItem: React.FC<{
    type: "activeChannels";
    maxValue: number;
    data: {
        title: string;
        language: string;
        followers: number;
        viewers: number;
        image: string;
    };
}> = props => {
    function numFormatter(num: number) {
        if (num > 999 && num < 1000000) {
            return (num / 1000).toFixed(1) + "K"; // convert to K for number from > 1000 < 1 million
        } else if (num > 1000000) {
            return (num / 1000000).toFixed(1) + "M"; // convert to M for number from > 1 million
        }
        return num + ""; // if value < 1000, nothing to do
    }

    const data = props.data;
    return (
        <li className={styles["stats-list__item"]}>
            <img className={styles["stats-list__image"]} src={data.image}></img>
            <div className={styles["stats-list__title-box"]}>
                <h4 className={styles["stats-list__title"]}>{data.title}</h4>
                <span className={styles["stats-list__subtitle"]}>
                    {data.language} • {numFormatter(data.followers)} Followers
                </span>
            </div>
            <div className={styles["stats__value-box"]}>
                <span className={styles["stats__value"]}>{numFormatter(data.viewers)}</span>
                <GainColorBar
                    actualAmount={data.viewers}
                    maxAmount={props.maxValue}
                    className={styles[props.type]}
                />
            </div>
        </li>
    );
};

export default StatsListItem;
