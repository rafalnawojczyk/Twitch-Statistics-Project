import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { GET_GAMES_API_URL, HOURLY_GAMES_AMMOUNT } from "../../config";
import DataFromStreamsApi from "../../models/DataFromStreamsApi";
import HistoricalLiveData from "../../models/HistoricalLiveData";
import LiveTableData from "../../models/LiveTableData";
import TwitchGetTopGamesResponse from "../../models/TwitchGetTopGamesResponse";
import UnformattedStatsObj from "../../models/UnformattedStatsObj";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") return;

    const data: {
        activeChannels: DataFromStreamsApi[];
        activeGames: UnformattedStatsObj;
        authorization: string;
    } = JSON.parse(req.body);

    const client = await MongoClient.connect(
        `mongodb+srv://${process.env.DB_CLIENT_ID}:${process.env.DB_CLIENT_PASSWORD}@cluster0.9v1xfdu.mongodb.net/twitchStatistics?retryWrites=true&w=majority`
    );
    const db = client.db();

    const twitchStatisticsCollection = db.collection("liveStatsData");

    const response = await twitchStatisticsCollection.find().toArray();

    const historicalData: HistoricalLiveData = response[0]?.historicalData;

    // 1st - activeChannels obj
    const newActiveChannels: LiveTableData = {
        live: true,
        title: "Channels",
        subtitle: "Current viewers",
        type: "activeChannels",
        stats: data.activeChannels.map(channel => ({
            title: channel.userName,
            id: channel.userId,
            language: channel.language,
            viewers: channel.viewerCount,
            image: channel.imageUrl,
        })),
    };

    // 2nd - activeGames obj

    const gamesResponse = await fetch(GET_GAMES_API_URL!, {
        method: "GET",
        headers: {
            authorization: data.authorization,
            "Client-Id": process.env.TWITCH_CLIENT_ID!,
        },
    });
    const gamesResponseData: TwitchGetTopGamesResponse[] = (await gamesResponse.json()).data;

    const newGamesArray = gamesResponseData
        .filter(el => data.activeGames[el.id])
        .map(game => {
            return {
                title: game.name,
                id: game.id,
                viewers: data.activeGames[game.id].views,
                image: game.box_art_url,
            };
        })
        .sort((a, b) => b.viewers - a.viewers);

    if (newGamesArray.length > HOURLY_GAMES_AMMOUNT) newGamesArray.length = HOURLY_GAMES_AMMOUNT;

    const newActiveGames: LiveTableData = {
        live: true,
        title: "Games",
        subtitle: "Current viewers",
        type: "activeGames",
        stats: newGamesArray,
    };

    // 3rd -  topChannels obj
    const newHistoricalData: HistoricalLiveData = { activeChannels: [], activeGames: [] };
    if (historicalData && historicalData.activeChannels) {
        historicalData.activeChannels.length =
            historicalData.activeChannels.length >= 168
                ? 168
                : historicalData.activeChannels.length;
        newHistoricalData.activeChannels = historicalData.activeChannels.slice(1);
    }

    newHistoricalData.activeChannels.push([...newActiveChannels.stats]);
    newHistoricalData.activeGames.push([...newActiveGames.stats]);

    const historicalChannelsData: {
        [key: string]: {
            id: string;
            title: string;
            language: string;
            viewers: number;
            image: string;
        };
    } = {};

    newHistoricalData.activeChannels.forEach(data => {
        data.forEach(channel => {
            if (!historicalChannelsData.hasOwnProperty(channel.id)) {
                historicalChannelsData[channel.id] = {
                    id: channel.id,
                    title: channel.title,
                    language: channel.language!,
                    image: channel.image,
                    viewers: channel.viewers,
                };
            }

            if (historicalChannelsData[channel.id].viewers < channel.viewers) {
                historicalChannelsData[channel.id].viewers = channel.viewers;
            }
        });
    });

    const historicalDataArray = Object.values(historicalChannelsData).sort(
        (a, b) => b.viewers - a.viewers
    );
    if (historicalDataArray.length > HOURLY_GAMES_AMMOUNT)
        historicalDataArray.length = HOURLY_GAMES_AMMOUNT;

    const newTopChannels: LiveTableData = {
        live: false,
        title: "Channels",
        subtitle: "Max viewers",
        type: "topChannels",
        stats: historicalDataArray,
    };

    const date = new Date().toISOString();

    const result = await twitchStatisticsCollection.replaceOne(
        {},
        {
            createdAt: date,
            data: {
                activeChannels: newActiveChannels,
                activeGames: newActiveGames,
                topChannels: newTopChannels,
            },
            historicalData: newHistoricalData,
        }
    );

    //close connection
    client.close();

    // set status on response
    res.status(201).json({
        ok: true,
        from: "liveStatsData",
        date: date,
        data: {
            activeChannels: newActiveChannels,
            activeGames: newActiveGames,
            topChannels: newTopChannels,
        },
    });
};

export default handler;
