import React from "react";
import styles from "./Header.module.scss";

type HeaderProps = { children: React.ReactNode };

const Header = ({ children }: HeaderProps) => {
    return <header className={styles.header}>{children}</header>;
};

export default Header;
