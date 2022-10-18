import styles from "./HomepageLayout.module.scss";

const HomepageLayout: React.FC<{ children: React.ReactNode | React.ReactNode[] }> = props => {
    return <div className={styles.homepage}>{props.children}</div>;
};

export default HomepageLayout;
