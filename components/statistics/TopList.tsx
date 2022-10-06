import Card from "../layout/Card";
import TopListItem from "./TopListItem";
import styles from "./TopList.module.scss";

const TopList: React.FC<{
    statistics: { title: string; views: number; image: string }[];
    listTitle: string;
    listSubTitle: string;
    total: number;
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
                    const className = props.statistics.length - 1 === index ? "" : "underline";

                    return (
                        <TopListItem
                            key={stats.title}
                            title={stats.title}
                            views={stats.views}
                            total={props.total}
                            image={stats.image}
                            className={className}
                        />
                    );
                })}
            </ul>
        </Card>
    );
};

export default TopList;
