import Link from "next/link";
import ExpandSvg from "../layout/svg/ExpandSvg";
import styles from "./ViewMoreLink.module.scss";

const ViewMoreLink: React.FC<{ href: string }> = props => {
    return (
        <Link href={props.href} passHref>
            <a className={styles["view-more"]}>
                <ExpandSvg className={styles["view-more__icon"]} />
                <p>VIEW MORE</p>
            </a>
        </Link>
    );
};

export default ViewMoreLink;
