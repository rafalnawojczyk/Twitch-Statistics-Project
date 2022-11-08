import styles from "./StatsLabel.module.scss";

type StatsLabelProps = { title: string; upperTitle?: boolean; className?: string };

const StatsLabel = ({ title, upperTitle, className }: StatsLabelProps) => {
    return (
        <span className={` ${className} ${styles.title} ${upperTitle ? styles.title__upper : ""}`}>
            {title}
        </span>
    );
};

export default StatsLabel;
