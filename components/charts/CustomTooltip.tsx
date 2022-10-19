import styles from "./CustomTooltip.module.scss";

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className={styles.tooltip}>
                <p className={styles.tooltip__date}>{payload[0].payload.name}</p>
                <div className={styles.tooltip__box}>
                    <span className={`${styles[payload[0].payload.type]} ${styles.tooltip__label}`}>
                        {payload[0].payload.type}
                    </span>
                    <p className={styles.tooltip__value}>
                        {payload[0].payload.thisWeekViewers.toLocaleString()}
                    </p>
                </div>
                <div className={styles.tooltip__box}>
                    <span className={` ${styles.tooltip__label}`}>
                        {payload[0].payload.type}, 7 days ago
                    </span>
                    <p className={styles.tooltip__value}>
                        {payload[0].payload.previousWeekViewers.toLocaleString()}
                    </p>
                </div>
            </div>
        );
    }

    return null;
};

export default CustomTooltip;

// payload[0].payload.name - date
// payload[0].payload.previousWeekViewers
// payload[0].payload.thisWeekViewers
