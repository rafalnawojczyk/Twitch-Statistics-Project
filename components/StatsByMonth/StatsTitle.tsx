import styles from "./StatsTitle.module.scss";

const StatsTitle: React.FC<{ title: string }> = props => {
    return <h3 className={styles.title}>{props.title}</h3>;
};

export default StatsTitle;
