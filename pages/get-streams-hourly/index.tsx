import { HOURLY_TOP_AMOUNT } from "../../config";
import DataFromStreamsApi from "../../models/DataFromStreamsApi";
import UnformattedStatsObj from "../../models/UnformattedStatsObj";

const GetStreams: React.FC<{ streamsData: DataFromStreamsApi }> = props => {
    return <p>{JSON.stringify(props.streamsData)}</p>;
};

export async function getServerSideProps() {
    const getStream = async () => {
        // 1. GET AUTH
        const authorizationObject = await fetch(`${process.env.SERVER}api/twitch-oauth-token`);
        const authorizationData: { data: { accessToken: string; tokenType: string }; ok: boolean } =
            await authorizationObject.json();
        if (!authorizationData.ok) throw new Error("Getting token failed.");
        let { accessToken, tokenType } = authorizationData.data;
        tokenType = tokenType.slice(0, 1).toUpperCase() + tokenType.slice(1);
        const authorization = `${tokenType} ${accessToken}`;

        // 2. GET STREAMS
        const getStreamsResponse = await fetch(
            `${process.env.SERVER}api/NEWtwitch-get-top-streams`,
            {
                method: "POST",
                body: JSON.stringify({
                    authorization,
                }),
            }
        );
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

            gamesStats[stats.gameName] = gamesStats[stats.gameName] || {
                title: stats.gameName,
                views: 0,
            };
            gamesStats[stats.gameName].views += stats.viewerCount;
            totalViewers += stats.viewerCount;
        });

        totalGames = Object.keys(gamesStats).length;

        // 3. Language stats:
        const languageResponse = await fetch(`${process.env.SERVER}api/NEWpost-language-stats`, {
            method: "POST",
            body: JSON.stringify({
                languageStats,
            }),
        });

        // 4. Games stats:
        // const gamesResponse = await fetch(`${process.env.SERVER}api/NEWpost-games-stats`, {
        //     method: "POST",
        //     body: JSON.stringify({
        //         authorization,
        //         gamesStats,
        //         totalGames,
        //     }),
        // });

        // 5. Live data for tables
        // const liveStatsResponse = await fetch(`${process.env.SERVER}api/NEWpost-live-stats-data`, {
        //     method: "POST",
        //     body: JSON.stringify({
        //         authorization,
        //         activeChannels: streamsData.slice(0, HOURLY_TOP_AMOUNT),
        //         activeGames: gamesStats,
        //     }),
        // });

        // 6. Data for area charts
        const chartsResponse = await fetch(`${process.env.SERVER}api/NEWpost-area-chart-data`, {
            method: "POST",
            body: JSON.stringify({
                totalGames,
                totalChannels,
                totalViewers,
            }),
        });

        // 7. Data for live bar
        const liveBarResponse = await fetch(`${process.env.SERVER}api/NEWpost-live-bar-data`, {
            method: "POST",
            body: JSON.stringify({
                totalGames,
                totalChannels,
                totalViewers,
            }),
        });

        return {
            streamsData,
        };
    };

    try {
        const { streamsData } = await getStream();

        return {
            props: {
                streamsData,
            },
        };
    } catch (err) {
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
