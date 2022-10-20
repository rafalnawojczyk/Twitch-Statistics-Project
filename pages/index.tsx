import { GetStaticProps } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import AreaChart from "../components/charts/AreaChart";
import LanguageStatsTable from "../components/LanguageStatsTable/LanguageStatsTable";
import HomepageCenter from "../components/layout/Homepage/HomepageCenter";
import HomepageFullWidth from "../components/layout/Homepage/HomepageFullWidth";
import HomepageLayout from "../components/layout/Homepage/HomepageLayout";
import HomepageSidebar from "../components/layout/Homepage/HomepageSidebar";
import HomepageTwoColumns from "../components/layout/Homepage/HomepageTwoColumns";
import LiveStatisticsBar from "../components/LiveStatisticsBar/LiveStatisticsBar";
import LiveStatsTable from "../components/LiveStatsTable/LiveStatsTable";
import StatsByMonth from "../components/StatsByMonth/StatsByMonth";
import {
    SERVER_LINK,
    DUMMY_LANGUAGE_DATA,
    DUMMY_LIVE_TABLE_DATA,
    DUMMY_MONTHLY_DATA,
    DUMMY_MAX_MONTHLY_DATA,
    DUMMY_LIVE_DATA,
    DUMMY_CHART_LIVE_DATA,
    DUMMY_CHART_LIVE_VIEWERS_DATA,
} from "../config";
import AreaChartData from "../models/AreaChartData";
import LanguageStats from "../models/LanguageStats";
import LiveBarStats from "../models/LiveBarStats";
import LiveTableData from "../models/LiveTableData";
import MonthlyData from "../models/MonthlyData";
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
    // TODO: THINGS THAT SHOULD BE PARSED IN SERVER SIDE
    const languageStatsData: LanguageStats[] = DUMMY_LANGUAGE_DATA;
    const liveStatsData: {
        [key: string]: LiveTableData;
    } = DUMMY_LIVE_TABLE_DATA;
    const monthlyData: MonthlyData = DUMMY_MONTHLY_DATA;
    const maxMonthlyData: MonthlyData = DUMMY_MAX_MONTHLY_DATA;
    const liveBarData: LiveBarStats[] = DUMMY_LIVE_DATA;
    const areaChartDataChannels: AreaChartData[] = DUMMY_CHART_LIVE_DATA;
    const areaChartDataViewers: AreaChartData[] = DUMMY_CHART_LIVE_VIEWERS_DATA;

    return (
        <>
            <Head>
                <title>Twitch statistics and charts | TWITCHSTATISTICS</title>
                <meta
                    name="description"
                    content="Browse a huge list of Twitch statistics and charts. Live charts for streamers and games."
                />
            </Head>
            <HomepageLayout>
                <HomepageFullWidth>
                    <LiveStatisticsBar data={liveBarData} />
                </HomepageFullWidth>

                <HomepageTwoColumns>
                    <AreaChart
                        data={areaChartDataViewers}
                        title="Twitch concurrent viewers"
                        color="rgb(141, 250, 148)"
                    />
                </HomepageTwoColumns>
                <HomepageTwoColumns>
                    <AreaChart
                        data={areaChartDataChannels}
                        title="Twitch concurrent channels"
                        color="rgb(255, 154, 67)"
                    />
                </HomepageTwoColumns>

                <HomepageCenter>
                    <StatsByMonth data={monthlyData} maxData={maxMonthlyData} />
                    <LanguageStatsTable data={languageStatsData} />
                </HomepageCenter>
                <HomepageSidebar>
                    <LiveStatsTable data={liveStatsData.activeChannels} />
                    <LiveStatsTable data={liveStatsData.activeGames} />
                    <LiveStatsTable data={liveStatsData.topChannels} />
                </HomepageSidebar>
            </HomepageLayout>
        </>
    );
};

export default HomePage;

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
