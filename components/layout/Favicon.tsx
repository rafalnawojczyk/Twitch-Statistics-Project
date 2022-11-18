import AppleTouchIcon from "../../public/favicon/apple-touch-icon.png";
import Favicon16 from "../../public/favicon/favicon-16x16.png";
import Favicon32 from "../../public/favicon/favicon-32x32.png";

const Favicon = () => {
    return (
        <>
            <link rel="apple-touch-icon" sizes="76x76" href={AppleTouchIcon.src} />
            <link rel="icon" type="image/png" sizes="32x32" href={Favicon32.src} />
            <link rel="icon" type="image/png" sizes="16x16" href={Favicon16.src} />
            <link rel="mask-icon" href="/public/favicon/safari-pinned-tab.svg" color="#5bbad5" />
            <meta name="msapplication-TileColor" content="#da532c" />
            <meta name="theme-color" content="#ffffff" />
        </>
    );
};

export default Favicon;
