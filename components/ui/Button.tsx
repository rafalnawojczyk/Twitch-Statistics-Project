import styles from "./Button.module.scss";

type ButtonProps = {
    children: React.ReactNode[] | React.ReactNode;
    type?: "button" | "submit" | "reset";
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    className?: string;
    value?: number | string;
};

const Button = ({ children, type, onClick, className, value }: ButtonProps) => {
    return (
        <button
            className={`${className} ${styles.button}`}
            type={`${type ? type : "button"}`}
            onClick={onClick}
            data-value={value}
        >
            {children}
        </button>
    );
};

export default Button;
