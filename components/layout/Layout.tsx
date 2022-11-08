import styles from "./Layout.module.scss";

type LayoutProps = { children: React.ReactNode };

const Layout = ({ children }: LayoutProps) => {
    return <main className={styles.layout}>{children}</main>;
};

export default Layout;
