import ExpandSvg from "../layout/svg/ExpandSvg";
import styles from "./ViewMore.module.scss";

type ViewMoreProps = { href?: string };

const ViewMore = ({ href }: ViewMoreProps) => {
    return (
        <a href={href} className={styles["view-more"]}>
            <ExpandSvg className={styles["view-more__icon"]} />
            <p>VIEW MORE</p>
        </a>
    );
};

export default ViewMore;
