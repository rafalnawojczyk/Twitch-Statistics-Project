import Button from "./Button";
import styles from "./DropdownSelector.module.scss";

const DropdownSelector: React.FC<{
    className: string;
    values: string[];
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}> = props => {
    return (
        <div className={`${styles.dropdown} ${props.className}`}>
            {props.values.map(value => {
                return (
                    <Button
                        key={value}
                        type="button"
                        value={value}
                        onClick={props.onClick}
                        className={styles.dropdown__button}
                    >
                        {value}
                    </Button>
                );
            })}
        </div>
    );
};

export default DropdownSelector;
