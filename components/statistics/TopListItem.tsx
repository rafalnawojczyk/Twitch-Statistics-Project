import ViewsBox from "./ViewsBox";
import styles from "./TopListItem.module.scss";
import { useRouter } from "next/router";
import { useState } from "react";

const TopListItem: React.FC<{
    type: "games" | "channels";
    title: string;
    views: number;
    image: string;
    total: number;
    className: string;
}> = props => {
    const [showMoreContent, setshowMoreContent] = useState(false);
    const router = useRouter();

    // router.push(`/${props.type}/${props.title}`);

    const clickItemHandler = () => {
        setshowMoreContent(prevState => !prevState);
    };

    const imageStyle = props.type === "games" ? "stats__image--game" : "stats__image--channel";

    return (
        <>
            <li className={styles[props.className]} onClick={clickItemHandler}>
                <div className={`${styles["stats"]}`}>
                    <div className={styles["stats__description-box"]}>
                        <img className={styles[imageStyle]} src={props.image} />
                        <h3 className={styles["stats__title"]}>{props.title}</h3>
                    </div>
                    <ViewsBox views={props.views} total={props.total} />
                </div>

                {showMoreContent && <div>TUTAJ BĘDĄ STATYSTYKI</div>}
            </li>
        </>
    );
};

export default TopListItem;
