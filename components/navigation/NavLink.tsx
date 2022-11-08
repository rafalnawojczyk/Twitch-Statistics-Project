import { useRouter } from "next/router";
import Link from "next/link";
import styles from "./NavLink.module.scss";

type NavLinkProps = {
    href: string;
    exact?: boolean;
    title: string;
};

const NavLink = ({ href, exact, title }: NavLinkProps) => {
    const { pathname } = useRouter();
    let className = "navLink";
    const isActive = exact ? pathname === href : pathname.startsWith(href);

    if (isActive) {
        className += "--active";
    }

    return (
        <Link href={href} passHref>
            <a className={styles[className]}>{title}</a>
        </Link>
    );
};

export default NavLink;
