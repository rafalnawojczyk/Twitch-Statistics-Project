import Button from "./Button";
import styles from "./DropdownSelector.module.scss";

type DropdownSelectorProps = {
    className: string;
    values: string[];
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const DropdownSelector = ({ className, values, onClick }: DropdownSelectorProps) => {
    return (
        <div className={`${styles.dropdown} ${className}`}>
            {values.map(value => {
                return (
                    <Button
                        key={value}
                        type="button"
                        value={value}
                        onClick={onClick}
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
