import styles from "./TwoColumns.module.scss";

const TwoColumns: React.FC<{ children: React.ReactNode }> = props => {
    return <div className={styles["two-columns"]}>{props.children}</div>;
};

export default TwoColumns;
