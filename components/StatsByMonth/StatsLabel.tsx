import styles from "./StatsLabel.module.scss";

const StatsLabel: React.FC<{ title: string; upperTitle?: boolean; className?: string }> = props => {
    return (
        <span
            className={` ${props.className} ${styles.title} ${
                props.upperTitle ? styles.title__upper : ""
            }`}
        >
            {props.title}{" "}
        </span>
    );
};

export default StatsLabel;
