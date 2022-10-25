import { useRouter } from "next/router";
import { prepareImage } from "../../utils/utils";
import GainColorBar from "../StatsByMonth/GainColorBar";
import styles from "./StatsListItem.module.scss";

const StatsListItem: React.FC<{
    url: string;
    type: "activeChannels" | "activeGames" | "topChannels";
    maxValue: number;
    data: {
        title: string;
        id: string;
        language?: string;
        followers?: number;
        viewers: number;
        image: string;
    };
}> = props => {
    const router = useRouter();
    function numFormatter(num: number) {
        if (num > 999 && num < 1000000) {
            return (num / 1000).toFixed(1) + "K";
        } else if (num > 1000000) {
            return (num / 1000000).toFixed(1) + "M";
        }
        return num + "";
    }
    const data = props.data;

    const clickHandler = () => {
        const url = props.url + data.title;

        router.push(url);
    };

    return (
        <li className={styles["stats-list__item"]} onClick={clickHandler}>
            <img
                className={styles["stats-list__image"]}
                src={prepareImage(data.image, props.type)}
            ></img>
            <div className={styles["stats-list__title-box"]}>
                <h4 className={styles["stats-list__title"]}>{data.title}</h4>
                <span className={styles["stats-list__subtitle"]}>
                    {data.language?.toUpperCase()} • {numFormatter(20000)} Followers
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
