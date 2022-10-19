import styles from "./HomepageTwoColumns.module.scss";

const HomepageTwoColumns: React.FC<{ children: React.ReactNode | React.ReactNode[] }> = props => {
    return <div className={styles.wrapper}>{props.children}</div>;
};

export default HomepageTwoColumns;
