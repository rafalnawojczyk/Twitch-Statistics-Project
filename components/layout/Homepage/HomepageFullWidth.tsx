import styles from "./HomepageFullWidth.module.scss";

const HomepageFullWidth: React.FC<{ children: React.ReactNode | React.ReactNode[] }> = props => {
    return <div className={styles.wrapper}>{props.children}</div>;
};

export default HomepageFullWidth;
