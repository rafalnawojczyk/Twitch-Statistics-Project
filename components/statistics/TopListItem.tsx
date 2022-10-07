import ViewsBox from "./ViewsBox";
import styles from "./TopListItem.module.scss";
import { useRouter } from "next/router";

const TopListItem: React.FC<{
    type: "games" | "channels";
    title: string;
    views: number;
    image: string;
    total: number;
    className: string;
}> = props => {
    const router = useRouter();

    const clickItemHandler = () => {
        router.push(`/${props.type}/${props.title}`);
    };

    const imageStyle = props.type === "games" ? "stats__image--game" : "stats__image--channel";

    return (
        <li onClick={clickItemHandler} className={`${styles["stats"]} ${styles[props.className]}`}>
            <div className={styles["stats__description-box"]}>
                <img className={styles[imageStyle]} src={props.image} />
                <h3 className={styles["stats__title"]}>{props.title}</h3>
            </div>

            <ViewsBox views={props.views} total={props.total} />
        </li>
    );
};

export default TopListItem;
