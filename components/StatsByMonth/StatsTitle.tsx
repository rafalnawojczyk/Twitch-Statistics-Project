import styles from "./StatsTitle.module.scss";

const StatsTitle: React.FC<{ title: string; icon?: React.ReactNode }> = props => {
    return (
        <h3 className={styles.title}>
            {props.icon}
            {props.title}
        </h3>
    );
};

export default StatsTitle;