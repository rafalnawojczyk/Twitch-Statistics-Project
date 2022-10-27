import { useRouter } from "next/router";
import { numFormatter, prepareImage } from "../../utils/utils";
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
        profileImg?: string;
    };
}> = props => {
    const router = useRouter();

    const data = props.data;

    const clickHandler = () => {
        const url = props.url + data.title;

        router.push(url);
    };

    let descriptionMarkup = (
        <span className={styles["stats-list__subtitle"]}>
            {data.language?.toUpperCase()} • {numFormatter(data.followers!)} Followers
        </span>
    );

    if (props.type === "activeGames") {
        descriptionMarkup = (
            <span className={styles["stats-list__subtitle"]}>
                {numFormatter(data.followers!)} Channels
            </span>
        );
    }

    if (props.type === "topChannels") {
        descriptionMarkup = <></>;
    }

    return (
        <li className={styles["stats-list__item"]} onClick={clickHandler}>
            <img
                className={styles["stats-list__image"]}
                src={
                    props.type === "activeGames"
                        ? prepareImage(data.image, props.type)
                        : data.profileImg
                }
            ></img>
            <div className={styles["stats-list__title-box"]}>
                <h4 className={styles["stats-list__title"]}>{data.title}</h4>
                {descriptionMarkup}
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
