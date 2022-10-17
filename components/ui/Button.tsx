import styles from "./Button.module.scss";

const Button: React.FC<{
    children: React.ReactNode[] | React.ReactNode;
    type?: "button" | "submit" | "reset";
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    className?: string;
    value?: number | string;
}> = props => {
    return (
        <button
            className={`${props.className} ${styles.button}`}
            type={`${props.type ? props.type : "button"}`}
            onClick={props.onClick}
            data-value={props.value}
        >
            {props.children}
        </button>
    );
};

export default Button;
