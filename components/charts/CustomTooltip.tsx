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
                        {payload[0].payload.actualValue.toLocaleString()}
                    </p>
                </div>
                <div className={styles.tooltip__box}>
                    <span className={` ${styles.tooltip__label}`}>
                        {payload[0].payload.type}, 7 days ago
                    </span>
                    <p className={styles.tooltip__value}>
                        {payload[0].payload.previousValue.toLocaleString()}
                    </p>
                </div>
            </div>
        );
    }

    return null;
};

export default CustomTooltip;
