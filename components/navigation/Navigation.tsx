import styles from "./Navigation.module.scss";
import Logo from "./Logo";
import NavLink from "./NavLink";
import Header from "../layout/Header";

const Navigation: React.FC = () => {
    return (
        <Header>
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
        </Header>
    );
};

export default Navigation;
