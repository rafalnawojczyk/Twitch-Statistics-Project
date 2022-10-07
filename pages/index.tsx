import { GetStaticProps } from "next";
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
    return new Stats(el.title, el.views, el.image, el.title);
});

const typedGamesStatistics = gamesStatistics.map(el => {
    return new Stats(el.title, el.views, el.image, el.title);
});

const HomePage: React.FC<{
    topLiveGames: Stats[];
    topLiveChannels: Stats[];
    topWeeklyChannels: Stats[];
}> = props => {
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
                    statistics={props.topLiveChannels}
                    numberOfItems={10}
                    type="channels"
                />
                <TopList
                    listTitle="TOP LIVE GAMES"
                    listSubTitle="CURRENTLY WATCHING"
                    total={1233213}
                    statistics={props.topLiveGames}
                    numberOfItems={10}
                    type="games"
                />
            </TwoStatsColumns>
        </>
    );
};

export default HomePage;

// get top live games
// get top live channels
// get top channels from last 7 days

export const getStaticProps: GetStaticProps = async context => {
    const gamesResponse = await fetch(`${process.env.SERVER}api/twitch-get-top-live-games`);
    const topLiveGames: Stats[] = await gamesResponse.json();

    const liveChannelsResponse = await fetch(
        `${process.env.SERVER}api/twitch-get-top-live-channels`
    );
    const topLiveChannels: Stats[] = await liveChannelsResponse.json();

    const weeklyChannelsResponse = await fetch(
        `${process.env.SERVER}api/twitch-get-top-weekly-channels`
    );
    const topWeeklyChannels: Stats[] = await weeklyChannelsResponse.json();

    return {
        props: {
            topLiveGames,
            topLiveChannels,
            topWeeklyChannels,
        },
        revalidate: 3600,
    };
};

export async function getStaticPaths() {
    return {
        fallback: true,
        paths: [],
    };
}
