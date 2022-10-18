import styles from "./LiveStatsTitle.module.scss";

const LiveStatsTitle: React.FC<{ title: string; subtitle: string }> = props => {
    return (
        <div className={styles.title__box}>
            <span className={styles.title}>{props.title}</span>
            <span className={styles.title__subtitle}>{props.subtitle}</span>
        </div>
    );
};

export default LiveStatsTitle;
