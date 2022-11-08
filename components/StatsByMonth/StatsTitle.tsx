import styles from "./StatsTitle.module.scss";

type StatsTitleProps = { title: string; icon?: React.ReactNode };

const StatsTitle = ({ title, icon }: StatsTitleProps) => {
    return (
        <h3 className={styles.title}>
            {icon}
            {title}
        </h3>
    );
};

export default StatsTitle;
