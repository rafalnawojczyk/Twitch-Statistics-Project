import { GetStaticProps } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import HomepageCenter from "../components/layout/Homepage/HomepageCenter";
import HomepageFullWidth from "../components/layout/Homepage/HomepageFullWidth";
import HomepageLayout from "../components/layout/Homepage/HomepageLayout";
import HomepageSidebar from "../components/layout/Homepage/HomepageSidebar";
import LiveStatisticsBar from "../components/LiveStatisticsBar/LiveStatisticsBar";
import LiveStatsTable from "../components/LiveStatsTable/LiveStatsTable";
import StatsByMonth from "../components/StatsByMonth/StatsByMonth";

import { SERVER_LINK } from "../config";
import Stats from "../models/Stats";
import TopHourlyStats from "../models/TopHourlyStats";

const HomePage: React.FC<{
    typedLiveGames: {
        statistics: Stats[];
        totalViewers: number;
    };
    typedLiveChannels: {
        statistics: Stats[];
        totalViewers: number;
    };
    typedWeeklyChannels: {
        statistics: Stats[];
    };
}> = props => {
    const [topLiveChannels, setTopLiveChannels] = useState<{
        statistics: Stats[];
        totalViewers: number;
    }>(props.typedLiveChannels);
    const [topLiveGames, setTopLiveGames] = useState<{
        statistics: Stats[];
        totalViewers: number;
    }>(props.typedLiveGames);
    const [topWeeklyChannels, setTopWeeklyChannels] = useState<{ statistics: Stats[] }>(
        props.typedWeeklyChannels
    );

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTopData = async () => {
            const response = await fetch(`${SERVER_LINK}api/twitch-get-top-statistics`);
            const data: TopHourlyStats = await response.json();

            if (!data.hourlyGames || !data.hourlyChannels || !data.weeklyTop) {
                throw new Error();
            }

            setTopLiveChannels(data.hourlyChannels);
            setTopLiveGames(data.hourlyGames);
            setTopWeeklyChannels(data.weeklyTop);

            setIsLoading(false);
        };

        try {
            fetchTopData();
        } catch (err) {
            // change state of error and add informations about API error on frontend
        }
        // prepare dummy data so it will be shown on screen while loading blurred with loading spinner above it
        // prepare API route to get all needed informations to parse homepage.
    }, []);

    // const topLiveChannels: TopStatsObj = JSON.parse(props.typedLiveChannels);
    // const topLiveGames: TopStatsObj = JSON.parse(props.typedLiveGames);
    // const topWeeklyChannels: TopStatsObj = JSON.parse(props.typedWeeklyChannels);

    return (
        <>
            <Head>
                <title>React Meetups</title>
                <meta name="description" content="Browse a huge list of meetups" />
            </Head>
            <HomepageLayout>
                <HomepageFullWidth>
                    <LiveStatisticsBar />
                </HomepageFullWidth>
                <HomepageCenter>
                    <StatsByMonth />
                </HomepageCenter>
                <HomepageSidebar>
                    <LiveStatsTable />
                    <LiveStatsTable />
                    <LiveStatsTable />
                </HomepageSidebar>
            </HomepageLayout>
        </>
    );
};

export default HomePage;

// get top live games
// get top live channels
// get top channels from last 7 days

export const getStaticProps: GetStaticProps = async context => {
    const typedLiveGames: {
        statistics: Stats[];
        totalViewers: number;
    } = {
        statistics: [],
        totalViewers: 12425568,
    };

    const typedLiveChannels: {
        statistics: Stats[];
        totalViewers: number;
    } = {
        statistics: [],
        totalViewers: 12425568,
    };

    const typedWeeklyChannels: {
        statistics: Stats[];
    } = {
        statistics: [],
    };

    for (let i = 0; i < 10; i++) {
        typedLiveGames.statistics.push(
            new Stats(
                "World of Tanks",
                214124,
                "https://static-cdn.jtvnw.net/ttv-boxart/27546-285x380.jpg",
                `${Math.random()}WorldOfTanks`,
                "null"
            )
        );

        typedLiveChannels.statistics.push(
            new Stats(
                "Skill4ltu",
                124125,
                "https://static-cdn.jtvnw.net/jtv_user_pictures/3240ed60-0ad4-4bb4-afd9-b608b60e850c-profile_image-70x70.png",
                `${Math.random()}skill4ltu`,
                "World of Tanks"
            )
        );
        typedWeeklyChannels.statistics.push(
            new Stats(
                "Skill4ltu",
                124125,
                "https://static-cdn.jtvnw.net/jtv_user_pictures/3240ed60-0ad4-4bb4-afd9-b608b60e850c-profile_image-70x70.png",
                `${Math.random()}skill4ltu`,
                "World of Tanks"
            )
        );
    }

    return {
        props: {
            typedLiveGames: {
                statistics: JSON.parse(JSON.stringify(typedLiveGames.statistics)),
                totalViewers: typedLiveGames.totalViewers,
            },
            typedLiveChannels: {
                statistics: JSON.parse(JSON.stringify(typedLiveChannels.statistics)),
                totalViewers: typedLiveChannels.totalViewers,
            },
            typedWeeklyChannels: JSON.parse(JSON.stringify(typedLiveChannels)),
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
