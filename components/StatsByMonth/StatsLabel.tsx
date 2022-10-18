import styles from "./StatsLabel.module.scss";

const StatsLabel: React.FC<{ title: string; upperTitle?: boolean }> = props => {
    return (
        <span className={`${styles.title} ${props.upperTitle ? styles.title__upper : ""}`}>
            {props.title}{" "}
        </span>
    );
};

export default StatsLabel;
