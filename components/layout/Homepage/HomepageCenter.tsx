import styles from "./HomepageCenter.module.scss";

type HomepageCenterProps = { children: React.ReactNode | React.ReactNode[] };

const HomepageCenter = ({ children }: HomepageCenterProps) => {
    return <div className={styles.wrapper}>{children}</div>;
};

export default HomepageCenter;
