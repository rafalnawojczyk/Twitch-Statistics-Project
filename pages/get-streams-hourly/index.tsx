import { HOURLY_TOP_AMOUNT, SERVER } from "../../config";
import AreaChartData from "../../models/AreaChartData";
import DataFromStreamsApi from "../../models/DataFromStreamsApi";
import HomepageData from "../../models/HomepageData";
import LanguageStats from "../../models/LanguageStats";
import LiveBarStats from "../../models/LiveBarStats";
import LiveTableData from "../../models/LiveTableData";
import MonthlyData from "../../models/MonthlyData";
import UnformattedStatsObj from "../../models/UnformattedStatsObj";

type GetStreamsProps = { homepageData: HomepageData };

const GetStreams = ({ homepageData }: GetStreamsProps) => {
    return <p>{JSON.stringify(homepageData)}</p>;
};

export async function getServerSideProps() {
    const getStream = async () => {
        // 1. GET AUTH
        const authorizationObject = await fetch(`${SERVER}api/twitch-oauth-token`);
        const authorizationData: { data: { accessToken: string; tokenType: string }; ok: boolean } =
            await authorizationObject.json();
        if (!authorizationData.ok) throw new Error("Getting token failed.");
        let { accessToken, tokenType } = authorizationData.data;
        tokenType = tokenType.slice(0, 1).toUpperCase() + tokenType.slice(1);
        const authorization = `${tokenType} ${accessToken}`;

        // 2. GET STREAMS
        const getStreamsResponse = await fetch(`${SERVER}api/twitch-get-top-streams`, {
            method: "POST",
            body: JSON.stringify({
                authorization,
            }),
        });
        const { streamsData }: { streamsData: DataFromStreamsApi[] } =
            await getStreamsResponse.json();

        const topHourlyChannels: DataFromStreamsApi[] = [];
        let totalChannels = streamsData.length;
        let totalViewers = 0;
        let totalGames = 0;
        const languageStats: UnformattedStatsObj = {};
        const gamesStats: UnformattedStatsObj = {};

        streamsData.forEach(stats => {
            languageStats[stats.language] = languageStats[stats.language] || {
                title: stats.language,
                views: 0,
                channels: 0,
            };
            languageStats[stats.language].views += stats.viewerCount;
            languageStats[stats.language].channels!++;

            gamesStats[stats.gameId] = gamesStats[stats.gameId] || {
                title: stats.gameName,
                id: stats.gameId,
                views: 0,
                channels: 0,
            };
            gamesStats[stats.gameId].views += stats.viewerCount;
            totalViewers += stats.viewerCount;
            gamesStats[stats.gameId].channels!++;
        });

        totalGames = Object.keys(gamesStats).length;

        // 3. Language stats:
        const languageResponse = await fetch(`${SERVER}api/post-language-stats`, {
            method: "POST",
            body: JSON.stringify({
                languageStats,
            }),
        });
        const languageObj: LanguageStats[] = (await languageResponse.json()).data;

        // 5. Live data for tables - GAMES
        const liveGamesResponse = await fetch(`${SERVER}api/post-live-games-data`, {
            method: "POST",
            body: JSON.stringify({
                authorization,
                activeGames: gamesStats,
            }),
        });

        const liveGamesData: {
            savedGames: {
                title: string;
                id: string;
                viewers: number;
                image: string;
                followers: number | undefined;
            }[];
            activeGames: LiveTableData;
        } = (await liveGamesResponse.json()).data;

        // 6. Live data for tables - CHANNELS

        const liveStatsResponse = await fetch(`${SERVER}api/post-live-stats-data`, {
            method: "POST",
            body: JSON.stringify({
                authorization,
                activeGames: liveGamesData.activeGames,
                activeChannels: streamsData.slice(0, HOURLY_TOP_AMOUNT),
                savedGames: liveGamesData.savedGames,
            }),
        });

        const liveStatsObj: {
            activeChannels: LiveTableData;
            activeGames: LiveTableData;
            topChannels: LiveTableData;
        } = (await liveStatsResponse.json()).data;

        // 6. Data for area charts
        const chartsResponse = await fetch(`${SERVER}api/post-area-chart-data`, {
            method: "POST",
            body: JSON.stringify({
                totalGames,
                totalChannels,
                totalViewers,
            }),
        });
        const areaChartsObj: {
            viewers: AreaChartData[];
            channels: AreaChartData[];
            games: AreaChartData[];
        } = (await chartsResponse.json()).data;

        // 7. Data for live bar
        const liveBarResponse = await fetch(`${SERVER}api/post-live-bar-data`, {
            method: "POST",
            body: JSON.stringify({
                totalGames,
                totalChannels,
                totalViewers,
            }),
        });

        const liveBarObj: LiveBarStats[] = (await liveBarResponse.json()).data;

        // 8. Get Monthly data for homepage
        const monthlyDataResponse = await fetch(`${SERVER}api/get-monthly-data`);
        const monthlyDataObj = await monthlyDataResponse.json();
        const monthlyData: MonthlyData = monthlyDataObj.data.monthlyOverview;
        const maxMonthlyData: MonthlyData = monthlyDataObj.data.maxMonthlyOverview;

        // 8. Data for homepage
        const homepageData: HomepageData = {
            languageStats: languageObj,
            liveStats: liveStatsObj,
            areaCharts: areaChartsObj,
            liveBar: liveBarObj,
            monthlyOverview: monthlyData,
            maxMonthlyOverview: maxMonthlyData,
        };

        const homepageResponse = await fetch(`${SERVER}api/post-homepage-data`, {
            method: "POST",
            body: JSON.stringify({
                ...homepageData,
            }),
        });

        return {
            ...homepageData,
        };
    };

    try {
        const homepageData = await getStream();

        return {
            props: {
                homepageData,
            },
        };
    } catch (err: any) {
        // ******* TEMPORARY *******
        console.log(err);
        return {
            props: {
                err: err.message,
            },
        };
    }
}

export default GetStreams;
