import styles from "./Layout.module.scss";

const Layout: React.FC<{ children: React.ReactNode }> = props => {
    return <main className={styles.layout}>{props.children}</main>;
};

export default Layout;
