import { useRouter } from "next/router";
import { numFormatter, prepareImage } from "../../utils/utils";
import GainColorBar from "../StatsByMonth/GainColorBar";
import styles from "./StatsListItem.module.scss";

type StatsListItemProps = {
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
        profileImg?: string;
    };
};

const StatsListItem = ({ url, type, maxValue, data }: StatsListItemProps) => {
    const router = useRouter();

    const clickHandler = () => {
        const directUrl = url + data.title;

        router.push(directUrl);
    };

    let descriptionMarkup = (
        <span className={styles["stats-list__subtitle"]}>
            {data.language?.toUpperCase()} • {numFormatter(data.followers!)} Followers
        </span>
    );

    if (type === "activeGames") {
        descriptionMarkup = (
            <span className={styles["stats-list__subtitle"]}>
                {numFormatter(data.followers!)} Channels
            </span>
        );
    }

    return (
        <li className={styles["stats-list__item"]} onClick={clickHandler}>
            <img
                className={styles["stats-list__image"]}
                src={type === "activeGames" ? prepareImage(data.image, type) : data.profileImg}
            ></img>
            <div className={styles["stats-list__title-box"]}>
                <h4 className={styles["stats-list__title"]}>{data.title}</h4>
                {descriptionMarkup}
            </div>
            <div className={styles["stats__value-box"]}>
                <span className={styles["stats__value"]}>{numFormatter(data.viewers)}</span>
                <GainColorBar
                    actualAmount={data.viewers}
                    maxAmount={maxValue}
                    className={styles[type]}
                />
            </div>
        </li>
    );
};

export default StatsListItem;
