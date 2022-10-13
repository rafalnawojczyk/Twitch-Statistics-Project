import styles from "./LoadingSpinner.module.scss";

const LoadingSpinner: React.FC<{ className: string }> = props => {
    return (
        <div className={`${styles["lds-roller"]} ${props.className}`}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};

export default LoadingSpinner;
