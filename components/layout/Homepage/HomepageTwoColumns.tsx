import styles from "./HomepageTwoColumns.module.scss";

type HomepageTwoColumnsProps = { children: React.ReactNode | React.ReactNode[] };

const HomepageTwoColumns = ({ children }: HomepageTwoColumnsProps) => {
    return <div className={styles.wrapper}>{children}</div>;
};

export default HomepageTwoColumns;
