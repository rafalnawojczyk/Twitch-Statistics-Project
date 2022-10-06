import styles from "./Card.module.scss";

const Card: React.FC<{ children: React.ReactNode; className?: string }> = props => {
    return <div className={`${styles.card} ${props.className} `}>{props.children}</div>;
};

export default Card;
