import Head from "next/head";
import TwoColumns from "../components/layout/TwoColumns";

import TopList from "../components/statistics/TopList";

const statistics = [
    {
        title: "Gaules",
        views: 114612,
        image: "https://static-cdn.jtvnw.net/jtv_user_pictures/1f47965f-7961-4b64-ad6f-71808d7d7fe9-profile_image-300x300.png",
    },
    {
        title: "Gaules",
        views: 114612,
        image: "https://static-cdn.jtvnw.net/jtv_user_pictures/1f47965f-7961-4b64-ad6f-71808d7d7fe9-profile_image-300x300.png",
    },
    {
        title: "Gaules",
        views: 114612,
        image: "https://static-cdn.jtvnw.net/jtv_user_pictures/1f47965f-7961-4b64-ad6f-71808d7d7fe9-profile_image-300x300.png",
    },
    {
        title: "Gaules",
        views: 114612,
        image: "https://static-cdn.jtvnw.net/jtv_user_pictures/1f47965f-7961-4b64-ad6f-71808d7d7fe9-profile_image-300x300.png",
    },
    {
        title: "Gaules",
        views: 114612,
        image: "https://static-cdn.jtvnw.net/jtv_user_pictures/1f47965f-7961-4b64-ad6f-71808d7d7fe9-profile_image-300x300.png",
    },
    {
        title: "Gaules",
        views: 114612,
        image: "https://static-cdn.jtvnw.net/jtv_user_pictures/1f47965f-7961-4b64-ad6f-71808d7d7fe9-profile_image-300x300.png",
    },
    {
        title: "Gaules",
        views: 114612,
        image: "https://static-cdn.jtvnw.net/jtv_user_pictures/1f47965f-7961-4b64-ad6f-71808d7d7fe9-profile_image-300x300.png",
    },
    {
        title: "Gaules",
        views: 114612,
        image: "https://static-cdn.jtvnw.net/jtv_user_pictures/1f47965f-7961-4b64-ad6f-71808d7d7fe9-profile_image-300x300.png",
    },
    {
        title: "Gaules",
        views: 114612,
        image: "https://static-cdn.jtvnw.net/jtv_user_pictures/1f47965f-7961-4b64-ad6f-71808d7d7fe9-profile_image-300x300.png",
    },
];

const HomePage: React.FC = () => {
    return (
        <>
            <Head>
                <title>React Meetups</title>
                <meta name="description" content="Browse a huge list of meetups" />
            </Head>
            <TwoColumns>
                <TopList
                    listTitle="TOP LIVE CHANNELS"
                    listSubTitle="CURRENTLY WATCHING"
                    total={1233213}
                    statistics={statistics}
                />
                <TopList
                    listTitle="TOP LIVE CHANNELS"
                    listSubTitle="CURRENTLY WATCHING"
                    total={1233213}
                    statistics={statistics}
                />
            </TwoColumns>
        </>
    );
};

export default HomePage;
