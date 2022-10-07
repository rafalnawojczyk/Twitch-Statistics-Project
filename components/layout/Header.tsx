import React from "react";
import styles from "./Header.module.scss";
import Layout from "./Layout";

const Header: React.FC<{ children: React.ReactNode }> = props => {
    return (
        <header className={styles.header}>
            <Layout> {props.children}</Layout>
        </header>
    );
};

export default Header;
