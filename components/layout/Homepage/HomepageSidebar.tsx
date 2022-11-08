import styles from "./HomepageSidebar.module.scss";

type HomepageSidebarProps = { children: React.ReactNode | React.ReactNode[] };

const HomepageSidebar = ({ children }: HomepageSidebarProps) => {
    return <div className={styles.sidebar}> {children}</div>;
};

export default HomepageSidebar;
