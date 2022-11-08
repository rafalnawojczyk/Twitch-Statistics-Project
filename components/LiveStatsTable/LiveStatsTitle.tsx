import styles from "./LiveStatsTitle.module.scss";

type LiveStatsTitleProps = { title: string; subtitle: string };

const LiveStatsTitle = ({ title, subtitle }: LiveStatsTitleProps) => {
    return (
        <div className={styles.title__box}>
            <span className={styles.title}>{title}</span>
            <span className={styles.title__subtitle}>{subtitle}</span>
        </div>
    );
};

export default LiveStatsTitle;
