import styles from "./HomepageFullWidth.module.scss";

type HomepageFullWidthProps = { children: React.ReactNode | React.ReactNode[] };

const HomepageFullWidth = ({ children }: HomepageFullWidthProps) => {
    return <div className={styles.wrapper}>{children}</div>;
};

export default HomepageFullWidth;
