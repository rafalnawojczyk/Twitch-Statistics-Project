import styles from "./Navigation.module.scss";
import Logo from "./Logo";
import NavLink from "./NavLink";

const Navigation: React.FC = () => {
    return (
        <>
            <nav className={styles.nav}>
                <div className={styles["nav--left"]}>
                    <Logo />
                    <NavLink href="/channels" title="Channels" exact={true} />
                    <NavLink href="/games" title="Games" exact={true} />
                    <NavLink href="/subscribers" title="Subscribers" exact={true} />
                </div>
                <div className={styles["nav--right"]}>
                    <NavLink href="/signIn" title="Sign In" exact={true} />
                    <NavLink href="/logIn" title="Log In" exact={true} />
                </div>
            </nav>
        </>
    );
};

export default Navigation;
