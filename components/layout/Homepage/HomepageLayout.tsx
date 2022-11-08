import styles from "./HomepageLayout.module.scss";

type HomepageLayoutProps = { children: React.ReactNode | React.ReactNode[] };

const HomepageLayout = ({ children }: HomepageLayoutProps) => {
    return <div className={styles.homepage}>{children}</div>;
};

export default HomepageLayout;
