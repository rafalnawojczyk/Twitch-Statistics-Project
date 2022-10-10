import { GetStaticProps } from "next";
import Head from "next/head";
import TwoStatsColumns from "../components/layout/TwoStatsColumns";

import TopList from "../components/statistics/TopList";
import Stats from "../models/Stats";

const HomePage: React.FC<{
    topLiveGames: Stats[];
    topLiveChannels: Stats[];
    topWeeklyChannels: Stats[];
    totalViewers: number;
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
                    total={props.totalViewers}
                    statistics={props.topLiveChannels}
                    numberOfItems={10}
                    type="channels"
                />
                <TopList
                    listTitle="TOP LIVE GAMES"
                    listSubTitle="CURRENTLY WATCHING"
                    total={props.totalViewers}
                    statistics={props.topLiveGames}
                    numberOfItems={10}
                    type="games"
                />
                <p>{JSON.stringify(props.topLiveGames)}</p>
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

    const totalViewers = topLiveChannels.reduce((a, b) => a + b.views, 0);

    return {
        props: {
            topLiveGames,
            topLiveChannels,
            topWeeklyChannels,
            totalViewers,
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
