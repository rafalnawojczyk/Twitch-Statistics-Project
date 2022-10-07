import Link from "next/link";
import ExpandSvg from "../layout/svg/ExpandSvg";
import styles from "./ViewMoreLink.module.scss";

const ViewMoreLink: React.FC<{ href: string }> = props => {
    return (
        <Link href={props.href}>
            <div className={styles.center}>
                <a className={styles["view-more"]}>
                    <ExpandSvg className={styles["view-more__icon"]} />
                    VIEW MORE
                </a>
            </div>
        </Link>
    );
};

export default ViewMoreLink;
