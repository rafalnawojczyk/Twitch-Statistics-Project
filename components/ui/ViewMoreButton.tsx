import ViewMore from "./ViewMore";
import styles from "./ViewMoreButton.module.scss";

type ViewMoreButtonProps = { onClick: () => void };

const ViewMoreButton = ({ onClick }: ViewMoreButtonProps) => {
    return (
        <button className={styles.button} onClick={onClick}>
            <ViewMore />
        </button>
    );
};

export default ViewMoreButton;
