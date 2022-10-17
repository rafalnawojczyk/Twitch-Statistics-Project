import styles from "./NewCard.module.scss";

const NewCard: React.FC<{
    children: React.ReactNode | React.ReactNode[];
    className: string;
}> = props => {
    return <div className={`${styles.card} ${props.className}`}>{props.children}</div>;
};

export default NewCard;
