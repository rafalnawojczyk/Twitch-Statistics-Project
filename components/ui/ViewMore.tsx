import ExpandSvg from "../layout/svg/ExpandSvg";
import styles from "./ViewMore.module.scss";

const ViewMore: React.FC<{ href?: string }> = props => {
    return (
        <a href={props.href} className={styles["view-more"]}>
            <ExpandSvg className={styles["view-more__icon"]} />
            <p>VIEW MORE</p>
        </a>
    );
};

export default ViewMore;
