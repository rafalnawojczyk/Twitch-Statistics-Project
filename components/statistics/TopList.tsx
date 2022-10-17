import Card from "../layout/Card";
import TopListItem from "./TopListItem";
import styles from "./TopList.module.scss";
import Stats from "../../models/Stats";
import ViewMoreLink from "../ui/ViewMoreLink";
import {
    CHANNEL_THUMBNAIL_HEIGHT,
    CHANNEL_THUMBNAIL_WIDTH,
    GAME_THUMBNAIL_HEIGHT,
    GAME_THUMBNAIL_WIDTH,
} from "../../config";
import { useEffect, useState } from "react";
import ViewMoreButton from "../ui/ViewMoreButton";
import LoadingSpinner from "../ui/LoadingSpinner";

const TopList: React.FC<{
    statistics: Stats[];
    listTitle: string;
    listSubTitle: string;
    total: number;
    numberOfItems: number;
    maxNumberOfItems: number;
    type: "games" | "channels";
    blur: boolean;
}> = props => {
    const [numberOfItems, setNumberOfItems] = useState(props.numberOfItems);

    useEffect(() => {
        if (props.maxNumberOfItems <= numberOfItems) {
            setViewMoreMarkup(<ViewMoreLink href={`/${props.type}`} />);
        }
    }, [numberOfItems, props.maxNumberOfItems]);

    const viewMoreHandler = () => {
        if (props.maxNumberOfItems >= numberOfItems) {
            setNumberOfItems(prevState => prevState + 5);
            return;
        }
    };

    const [viewMoreMarkup, setViewMoreMarkup] = useState(
        <ViewMoreButton onClick={viewMoreHandler} />
    );
    return (
        <Card className={styles["top-card__box"]}>
            {props.blur && <LoadingSpinner className={styles.center} />}
            <div className={styles["top-card__header"]}>
                <h3 className={styles["top-card__title"]}>{props.listTitle}</h3>

                <div className={styles["top-card__description"]}>
                    <p className={styles["top-card__description--title"]}>VIEWERS</p>
                    <span className={styles["top-card__description--subtitle"]}>
                        {props.listSubTitle}
                    </span>
                </div>
            </div>
            <ul className={`${styles.list}  ${props.blur ? styles.blur : styles.noblur}`}>
                {props.statistics?.map((stats, index) => {
                    if (index >= numberOfItems) return;

                    const imgWidth =
                        props.type === "games" ? GAME_THUMBNAIL_WIDTH : CHANNEL_THUMBNAIL_WIDTH;
                    const imgHeight =
                        props.type === "games" ? GAME_THUMBNAIL_HEIGHT : CHANNEL_THUMBNAIL_HEIGHT;

                    const imageUrl = stats.image
                        .replace("{width}", `${imgWidth}`)
                        .replace("{height}", `${imgHeight}`);
                    const className = props.maxNumberOfItems - 1 === index ? "" : "underline";

                    return (
                        <TopListItem
                            type={props.type}
                            key={stats.id}
                            title={stats.title}
                            views={stats.views}
                            total={props.total}
                            image={imageUrl}
                            additionalInfo={stats.gameStreaming}
                            className={className}
                        />
                    );
                })}
            </ul>
            {viewMoreMarkup}
        </Card>
    );
};

export default TopList;
