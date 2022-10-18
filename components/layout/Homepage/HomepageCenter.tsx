import styles from "./HomepageCenter.module.scss";

const HomepageCenter: React.FC<{ children: React.ReactNode | React.ReactNode[] }> = props => {
    return <div className={styles.wrapper}>{props.children}</div>;
};

export default HomepageCenter;
