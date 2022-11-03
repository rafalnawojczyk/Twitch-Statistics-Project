import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { CHART_DATA_AMOUNT, HOURLY_GAMES_AMMOUNT, SERVER } from "../../config";
import DataFromStreamsApi from "../../models/DataFromStreamsApi";
import HistoricalLiveData from "../../models/HistoricalLiveData";
import LiveTableData from "../../models/LiveTableData";
import TwitchGetUsersResponse from "../../models/TwitchGetUsersResponse";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") return;

    const data: {
        activeChannels: DataFromStreamsApi[];
        activeGames: LiveTableData;
        savedGames: {
            title: string;
            id: string;
            viewers: number;
            image: string;
            followers: number | undefined;
        }[];
        authorization: string;
    } = JSON.parse(req.body);

    const client = await MongoClient.connect(
        `mongodb+srv://${process.env.DB_CLIENT_ID}:${process.env.DB_CLIENT_PASSWORD}@cluster0.9v1xfdu.mongodb.net/twitchStatistics?retryWrites=true&w=majority`
    );
    const db = client.db();

    const twitchStatisticsCollection = db.collection("liveStatsData");

    const response = await twitchStatisticsCollection.find().toArray();

    const historicalData: HistoricalLiveData = response[0]?.historicalData;

    // GET FOLLOWERS
    const updatedActiveResponse = await fetch(`${SERVER}api/twitch-get-followers`, {
        method: "POST",
        body: JSON.stringify({
            authorization: data.authorization,
            topChannels: data.activeChannels,
        }),
    });

    const updatedActiveChannels: DataFromStreamsApi[] = (await updatedActiveResponse.json()).data;

    // GET USER INFO
    const idList = data.activeChannels.map(el => el.userId);
    const userInfoResponse = await fetch(`${SERVER}api/twitch-get-user-info`, {
        method: "POST",
        body: JSON.stringify({
            authorization: data.authorization,
            idList: idList,
        }),
    });

    const userInfo: TwitchGetUsersResponse = (await userInfoResponse.json()).data;

    userInfo.data.forEach((user, index) => {
        updatedActiveChannels[index].profileImg = user.profile_image_url;
        updatedActiveChannels[index].broadcasterType = user.broadcaster_type;
        updatedActiveChannels[index].createdAt = user.created_at;
        updatedActiveChannels[index].description = user.description;
    });

    // 1st - activeChannels obj
    const newActiveChannels: LiveTableData = {
        live: true,
        title: "Channels",
        subtitle: "Current viewers",
        type: "activeChannels",
        stats: updatedActiveChannels.map(channel => {
            const gameObj = data.savedGames.find(el => el.id === channel.gameId);
            const gameImg = gameObj?.image;

            return {
                title: channel.userName,
                id: channel.userId,
                language: channel.language,
                viewers: channel.viewerCount,
                image: channel.imageUrl,
                followers: channel.followers,
                streamTitle: channel.title,
                gameImg,
                gameId: channel.gameId,
                description: channel.description,
                createdAt: channel.createdAt,
                broadcasterType: channel.broadcasterType,
                profileImg: channel.profileImg,
            };
        }),
    };

    // 3rd -  topChannels obj
    const newHistoricalData: HistoricalLiveData = { activeChannels: [], activeGames: [] };
    if (historicalData && historicalData.activeChannels) {
        historicalData.activeChannels.length =
            historicalData.activeChannels.length >= CHART_DATA_AMOUNT
                ? CHART_DATA_AMOUNT
                : historicalData.activeChannels.length;
        newHistoricalData.activeChannels = historicalData.activeChannels.slice(1);
    }

    newHistoricalData.activeChannels.push([...newActiveChannels.stats]);
    newHistoricalData.activeGames.push([...data.activeGames.stats]);

    const historicalChannelsData: {
        [key: string]: {
            title: string;
            id: string;
            language?: string;
            followers?: number;
            viewers: number;
            image: string;
            streamTitle?: string;
            profileImg?: string;
            broadcasterType?: "partner" | "affiliate" | "";
            createdAt?: string;
            description?: string;
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
                    followers: channel.followers,
                    streamTitle: channel.title,
                    description: channel.description,
                    createdAt: channel.createdAt,
                    broadcasterType: channel.broadcasterType,
                    profileImg: channel.profileImg,
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
                activeGames: data.activeGames,
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
            activeGames: data.activeGames,
            topChannels: newTopChannels,
        },
    });
};

export default handler;
