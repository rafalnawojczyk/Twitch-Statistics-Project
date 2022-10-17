import styles from "./Button.module.scss";

const Button: React.FC<{
    children: React.ReactNode[] | React.ReactNode;
    type?: "button" | "submit" | "reset";
    onClick: () => void;
    className: string;
}> = props => {
    return (
        <button
            className={`${props.className} ${styles.button}`}
            type={`${props.type ? props.type : "button"}`}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
};

export default Button;
