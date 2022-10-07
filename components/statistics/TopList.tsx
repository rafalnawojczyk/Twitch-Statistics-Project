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

const TopList: React.FC<{
    statistics: Stats[];
    listTitle: string;
    listSubTitle: string;
    total: number;
    numberOfItems: number;
    type: "games" | "channels";
}> = props => {
    return (
        <Card className={styles["top-card__box"]}>
            <div className={styles["top-card__header"]}>
                <h3 className={styles["top-card__title"]}>{props.listTitle}</h3>

                <div className={styles["top-card__description"]}>
                    <p className={styles["top-card__description--title"]}>VIEWERS</p>
                    <span className={styles["top-card__description--subtitle"]}>
                        {props.listSubTitle}
                    </span>
                </div>
            </div>
            <ul className={styles.list}>
                {props.statistics?.map((stats, index) => {
                    if (index >= props.numberOfItems) return;

                    const imgWidth =
                        props.type === "games" ? GAME_THUMBNAIL_WIDTH : CHANNEL_THUMBNAIL_WIDTH;
                    const imgHeight =
                        props.type === "games" ? GAME_THUMBNAIL_HEIGHT : CHANNEL_THUMBNAIL_HEIGHT;

                    const imageUrl = stats.image
                        .replace("{width}", `${imgWidth}`)
                        .replace("{height}", `${imgHeight}`);
                    const className = props.statistics.length - 1 === index ? "" : "underline";

                    return (
                        <TopListItem
                            type={props.type}
                            key={stats.title}
                            title={stats.title}
                            views={stats.views}
                            total={props.total}
                            image={imageUrl}
                            className={className}
                        />
                    );
                })}
            </ul>
            <ViewMoreLink href="/" />
        </Card>
    );
};

export default TopList;
