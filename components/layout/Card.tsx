import styles from "./Card.module.scss";

type CardProps = {
    children: React.ReactNode | React.ReactNode[];
    className?: string;
};

const Card = ({ children, className }: CardProps) => {
    return <div className={`${styles.card} ${className}`}>{children}</div>;
};

export default Card;
