import styles from "./LoadingSpinner.module.scss";

type LoadingSpinnerProps = { className?: string };

const LoadingSpinner = ({ className }: LoadingSpinnerProps) => {
    return (
        <div className={`${styles["lds-roller"]} ${className}`}>
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
