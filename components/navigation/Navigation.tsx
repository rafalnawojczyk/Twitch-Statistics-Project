import styles from "./Navigation.module.scss";
import Logo from "./Logo";
import NavLink from "./NavLink";
import Header from "../layout/Header";
import AuthContext from "context/auth-context";
import { useContext, useEffect, useState } from "react";

const Navigation: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { isLoggedIn: isLogged } = useContext(AuthContext);

    useEffect(() => {
        setIsLoggedIn(isLogged);
    }, [isLogged]);

    return (
        <Header>
            <nav className={styles.nav}>
                <div className={styles["nav--left"]}>
                    <Logo />
                    <NavLink href="/channels" title="Channels" exact={true} />
                    <NavLink href="/games" title="Games" exact={true} />
                </div>
                <div className={styles["nav--right"]}>
                    {!isLoggedIn && (
                        <>
                            <NavLink href="/login/signup" title="Sign In" exact={false} />
                            <NavLink href="/login" title="Log In" exact={true} />
                        </>
                    )}
                    {isLoggedIn && <NavLink href="/profile" title="Profile" exact={false} />}
                </div>
            </nav>
        </Header>
    );
};

export default Navigation;
