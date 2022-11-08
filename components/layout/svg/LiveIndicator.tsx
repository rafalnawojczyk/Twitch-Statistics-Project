import styles from "./LiveIndicator.module.scss";

type LiveIndicatorProps = { className?: string };

const LiveIndicator = ({ className }: LiveIndicatorProps) => {
    return (
        <svg
            className={`${styles.indicator} ${className}`}
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle cx="8" cy="8" r="5" fill="#FF574C" stroke="#16161B" strokeWidth="2"></circle>
            <circle cx="8" cy="8" r="8" fill="#FF574C" fillOpacity="0.25"></circle>
        </svg>
    );
};

export default LiveIndicator;
