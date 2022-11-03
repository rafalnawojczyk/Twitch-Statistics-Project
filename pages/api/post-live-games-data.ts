import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { CHART_DATA_AMOUNT, GET_GAMES_API_URL } from "../../config";
import LiveTableData, { StatsArr } from "../../models/LiveTableData";
import TwitchGetTopGamesResponse from "../../models/TwitchGetTopGamesResponse";

import UnformattedStatsObj from "../../models/UnformattedStatsObj";
import { getFormattedDate } from "../../utils/utils";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") return;

    const data: {
        activeGames: UnformattedStatsObj;
        authorization: string;
    } = JSON.parse(req.body);

    const client = await MongoClient.connect(
        `mongodb+srv://${process.env.DB_CLIENT_ID}:${process.env.DB_CLIENT_PASSWORD}@cluster0.9v1xfdu.mongodb.net/twitchStatistics?retryWrites=true&w=majority`
    );
    const db = client.db();

    const twitchStatisticsCollection = db.collection("liveStatsData");

    const response = await twitchStatisticsCollection.find().toArray();

    const oldGamesData: LiveTableData = response[0]?.data.activeGames;

    const date = new Date();
    const formattedDate = getFormattedDate(date);

    const gamesResponse = await fetch(GET_GAMES_API_URL!, {
        method: "GET",
        headers: {
            authorization: data.authorization,
            "Client-Id": process.env.TWITCH_CLIENT_ID!,
        },
    });
    const gamesResponseData: TwitchGetTopGamesResponse[] = (await gamesResponse.json()).data;

    const newStats: StatsArr[] = oldGamesData.stats.map(game => {
        if (!data.activeGames[game.id]) {
            return { ...game };
        }
        let newChartData: {
            name: string;
            value: number;
            channels: number;
        }[] = [];

        if (game?.chartData) {
            newChartData =
                game.chartData.length > CHART_DATA_AMOUNT
                    ? [...game.chartData.slice(1)]
                    : [...game.chartData];
        }

        let peakChannels: number;
        let peakViewers: number;

        if (game?.peakChannels && game?.peakViewers) {
            peakViewers =
                game?.peakViewers! < data.activeGames[game.id].views
                    ? data.activeGames[game.id].views
                    : game.peakViewers;
            peakChannels =
                game?.peakChannels! < data.activeGames[game.id].channels!
                    ? data.activeGames[game.id].channels!
                    : game.peakChannels;
        } else {
            peakChannels = data.activeGames[game.id].channels!;
            peakViewers = data.activeGames[game.id].views;
        }

        newChartData.push({
            name: formattedDate,
            value: data.activeGames[game.id].views,
            channels: data.activeGames[game.id].channels!,
        });

        const averageChannels = Math.trunc(
            newChartData.reduce((a, b) => a + b.channels, 0) / newChartData.length
        );
        const averageViewers = Math.trunc(
            newChartData.reduce((a, b) => a + b.value, 0) / newChartData.length
        );

        const viewersPerChannel = Math.trunc(
            data.activeGames[game.id].views / data.activeGames[game.id].channels!
        );

        return {
            title: game.title,
            id: game.id,
            viewers: data.activeGames[game.id].views,
            image: game.image,
            followers: data.activeGames[game.id].channels,
            peakViewers,
            peakChannels,
            averageChannels,
            averageViewers,
            viewersPerChannel,
            chartData: newChartData,
        };
    });

    const newActiveGames: LiveTableData = {
        live: true,
        title: "Games",
        subtitle: "Current viewers",
        type: "activeGames",
        stats: newStats,
    };

    //close connection
    client.close();

    // set status on response

    res.status(201).json({
        ok: true,
        from: "liveGamesData",
        date: date.toISOString(),
        data: {
            activeGames: newActiveGames,
            savedGames: newStats,
        },
    });
};

export default handler;
