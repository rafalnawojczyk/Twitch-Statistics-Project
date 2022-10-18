import styles from "./HomepageSidebar.module.scss";

const HomepageSidebar: React.FC<{ children: React.ReactNode | React.ReactNode[] }> = props => {
    return <div className={styles.sidebar}> {props.children}</div>;
};

export default HomepageSidebar;
