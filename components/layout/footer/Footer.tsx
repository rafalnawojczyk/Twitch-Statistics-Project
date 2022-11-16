import { EMAIL } from "config";
import styles from "./Footer.module.scss";

const Footer = () => {
    const actualYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <p>Get in touch, report a bug or incorrect information, suggest a feature.</p>
            <p>
                © {actualYear} TwitchStatistics
                <a href={`mailto:${EMAIL}`} className={styles.footer__email}>
                    {EMAIL}
                </a>
            </p>
            <p>
                TwitchStatistics is not affiliated with Twitch or Amazon. All Trademarks referred to
                are the property of their respective owners. This project is made entirely for
                learning purposes.
            </p>
        </footer>
    );
};

export default Footer;
