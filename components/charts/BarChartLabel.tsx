import styles from "./BarChartLabel.module.scss";

const BarChartLabel = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className={styles.chart__details}>
                <p>{payload[0].payload.name}</p>
                <p className={styles["align-right"]}>{payload[0].payload.value.toLocaleString()}</p>
            </div>
        );
    }
    return null;
};

export default BarChartLabel;
