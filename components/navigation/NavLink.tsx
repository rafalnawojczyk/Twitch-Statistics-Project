import { useRouter } from "next/router";
import Link from "next/link";
import styles from "./NavLink.module.scss";

const NavLink: React.FC<{
    href: string;
    exact?: boolean;
    title: string;
}> = props => {
    const { pathname } = useRouter();
    let className = "navLink";
    const isActive = props.exact ? pathname === props.href : pathname.startsWith(props.href);

    if (isActive) {
        className += "--active";
    }

    return (
        <Link href={props.href} passHref>
            <a className={styles[className]}>{props.title}</a>
        </Link>
    );
};

export default NavLink;
