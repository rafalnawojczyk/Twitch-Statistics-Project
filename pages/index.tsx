import Head from "next/head";
import TwoStatsColumns from "../components/layout/TwoStatsColumns";

import TopList from "../components/statistics/TopList";
import Stats from "../models/Stats";

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

const gamesStatistics = [
    {
        title: "League of Legends",
        views: 14124,
        image: "https://static-cdn.jtvnw.net/ttv-boxart/21779_IGDB-45x60.jpg",
    },
    {
        title: "League of Legends",
        views: 14124,
        image: "https://static-cdn.jtvnw.net/ttv-boxart/21779_IGDB-45x60.jpg",
    },
    {
        title: "League of Legends",
        views: 14124,
        image: "https://static-cdn.jtvnw.net/ttv-boxart/21779_IGDB-45x60.jpg",
    },
    {
        title: "League of Legends",
        views: 14124,
        image: "https://static-cdn.jtvnw.net/ttv-boxart/21779_IGDB-45x60.jpg",
    },
    {
        title: "League of Legends",
        views: 14124,
        image: "https://static-cdn.jtvnw.net/ttv-boxart/21779_IGDB-45x60.jpg",
    },
    {
        title: "League of Legends",
        views: 14124,
        image: "https://static-cdn.jtvnw.net/ttv-boxart/21779_IGDB-45x60.jpg",
    },
    {
        title: "League of Legends",
        views: 14124,
        image: "https://static-cdn.jtvnw.net/ttv-boxart/21779_IGDB-45x60.jpg",
    },
    {
        title: "League of Legends",
        views: 14124,
        image: "https://static-cdn.jtvnw.net/ttv-boxart/21779_IGDB-45x60.jpg",
    },
    {
        title: "League of Legends",
        views: 14124,
        image: "https://static-cdn.jtvnw.net/ttv-boxart/21779_IGDB-45x60.jpg",
    },
    {
        title: "League of Legends",
        views: 14124,
        image: "https://static-cdn.jtvnw.net/ttv-boxart/21779_IGDB-45x60.jpg",
    },
    {
        title: "League of Legends",
        views: 14124,
        image: "https://static-cdn.jtvnw.net/ttv-boxart/21779_IGDB-45x60.jpg",
    },
    {
        title: "League of Legends",
        views: 14124,
        image: "https://static-cdn.jtvnw.net/ttv-boxart/21779_IGDB-45x60.jpg",
    },
    {
        title: "League of Legends",
        views: 14124,
        image: "https://static-cdn.jtvnw.net/ttv-boxart/21779_IGDB-45x60.jpg",
    },
];

const typedStatistics = statistics.map(el => {
    return new Stats(el.title, el.views, el.image);
});

const typedGamesStatistics = gamesStatistics.map(el => {
    return new Stats(el.title, el.views, el.image);
});

const HomePage: React.FC = () => {
    return (
        <>
            <Head>
                <title>React Meetups</title>
                <meta name="description" content="Browse a huge list of meetups" />
            </Head>
            <TwoStatsColumns>
                <TopList
                    listTitle="TOP LIVE CHANNELS"
                    listSubTitle="CURRENTLY WATCHING"
                    total={1233213}
                    statistics={typedStatistics}
                    numberOfItems={10}
                    type="channels"
                />
                <TopList
                    listTitle="TOP LIVE GAMES"
                    listSubTitle="CURRENTLY WATCHING"
                    total={1233213}
                    statistics={typedGamesStatistics}
                    numberOfItems={10}
                    type="games"
                />
            </TwoStatsColumns>
        </>
    );
};

export default HomePage;
