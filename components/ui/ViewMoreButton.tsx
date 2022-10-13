import ViewMore from "./ViewMore";
import styles from "./ViewMoreButton.module.scss";

const ViewMoreButton: React.FC<{ onClick: () => void }> = props => {
    return (
        <button className={styles.button} onClick={props.onClick}>
            <ViewMore />
        </button>
    );
};

export default ViewMoreButton;
