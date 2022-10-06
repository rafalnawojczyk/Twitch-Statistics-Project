import ViewsBox from "./ViewsBox";
import styles from "./TopListItem.module.scss";

const TopListItem: React.FC<{
    title: string;
    views: number;
    image: string;
    total: number;
    className: string;
}> = props => {
    return (
        <li className={`${styles["stats"]} ${styles[props.className]}`}>
            <div className={styles["stats__description-box"]}>
                <img className={styles["stats__image"]} src={props.image} />
                <h3 className={styles["stats__title"]}>{props.title}</h3>
            </div>

            <ViewsBox views={props.views} total={props.total} />
        </li>
    );
};

export default TopListItem;
