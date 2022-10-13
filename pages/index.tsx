import { GetStaticProps } from "next";
import Head from "next/head";
import TwoStatsColumns from "../components/layout/TwoStatsColumns";

import TopList from "../components/statistics/TopList";
import Stats from "../models/Stats";
import TopStatsObj from "../models/TopStatsObj";

const HomePage: React.FC<{
    typedLiveGames: string;
    typedLiveChannels: string;
    typedWeeklyChannels: string;
}> = props => {
    const topLiveChannels: TopStatsObj = JSON.parse(props.typedLiveChannels);
    const topLiveGames: TopStatsObj = JSON.parse(props.typedLiveGames);
    const topWeeklyChannels: TopStatsObj = JSON.parse(props.typedWeeklyChannels);

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
                    total={topLiveChannels.totalViewers}
                    statistics={topLiveChannels.statistics}
                    numberOfItems={10}
                    maxNumberOfItems={15}
                    type="channels"
                />
                <TopList
                    listTitle="TOP LIVE GAMES"
                    listSubTitle="CURRENTLY WATCHING"
                    total={topLiveGames.totalViewers}
                    statistics={topLiveGames.statistics}
                    numberOfItems={10}
                    maxNumberOfItems={15}
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
    const topLiveGames: { hourlyGamesTop: Stats[]; totalViewers: number } =
        await gamesResponse.json();

    const liveChannelsResponse = await fetch(
        `${process.env.SERVER}api/twitch-get-top-live-channels`
    );
    const topLiveChannels: { hourlyChannelsTop: Stats[]; totalViewers: number } =
        await liveChannelsResponse.json();

    const weeklyChannelsResponse = await fetch(
        `${process.env.SERVER}api/twitch-get-top-weekly-channels`
    );
    const topWeeklyChannels: Stats[] = await weeklyChannelsResponse.json();

    const typedLiveGames = JSON.stringify(
        new TopStatsObj(topLiveGames.hourlyGamesTop, topLiveGames.totalViewers)
    );
    const typedLiveChannels = JSON.stringify(
        new TopStatsObj(topLiveChannels.hourlyChannelsTop, topLiveChannels.totalViewers)
    );
    const typedWeeklyChannels = JSON.stringify(new TopStatsObj(topWeeklyChannels, 0));

    return {
        props: {
            typedLiveGames,
            typedLiveChannels,
            typedWeeklyChannels,
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
