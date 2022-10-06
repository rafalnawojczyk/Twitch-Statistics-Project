import styles from "./Logo.module.scss";
import logoImage from "../../public/logo.png";
import React from "react";
import { useRouter } from "next/router";

const Logo: React.FC = () => {
    const router = useRouter();
    const logoClickHandler = () => {
        router.push("/");
    };

    return (
        <img
            className={styles.logo}
            onClick={logoClickHandler}
            src={logoImage}
            alt="Logo of TwitchStatistics website"
        ></img>
    );
};

export default Logo;
