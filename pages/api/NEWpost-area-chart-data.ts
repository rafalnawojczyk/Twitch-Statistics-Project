import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import AreaChartData from "../../models/AreaChartData";
import { getFormattedDate } from "../../utils/utils";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") return;

    const data: { totalChannels: number; totalGames: number; totalViewers: number } = JSON.parse(
        req.body
    );

    const client = await MongoClient.connect(
        `mongodb+srv://${process.env.DB_CLIENT_ID}:${process.env.DB_CLIENT_PASSWORD}@cluster0.9v1xfdu.mongodb.net/twitchStatistics?retryWrites=true&w=majority`
    );
    const db = client.db();

    const twitchStatisticsCollection = db.collection("areaChartData");

    const response = await twitchStatisticsCollection.find().toArray();

    const oldData: { games: AreaChartData[]; channels: AreaChartData[]; viewers: AreaChartData[] } =
        response[0].data;

    const date = new Date();
    const formattedDate = getFormattedDate(date);

    const newGames: AreaChartData = {
        name: formattedDate,
        actualValue: data.totalGames,
        type: "Games",
        previousValue: oldData.games[1].actualValue,
    };
    const newGamesArray: AreaChartData[] = oldData.games.slice(1);
    newGamesArray.push(newGames);

    const newChannels: AreaChartData = {
        name: formattedDate,
        actualValue: data.totalChannels,
        type: "Channels",
        previousValue: oldData.channels[1].actualValue,
    };
    const newChannelsArray: AreaChartData[] = oldData.channels.slice(1);
    newChannelsArray.push(newChannels);

    const newViewers: AreaChartData = {
        name: formattedDate,
        actualValue: data.totalViewers,
        type: "Viewers",
        previousValue: oldData.viewers[1].actualValue,
    };
    const newViewersArray: AreaChartData[] = oldData.viewers.slice(1);
    newViewersArray.push(newViewers);

    const finalObject = {
        createdAt: date.toISOString(),
        data: {
            viewers: newViewersArray,
            channels: newChannelsArray,
            games: newGamesArray,
        },
    };

    const result = await twitchStatisticsCollection.replaceOne({}, finalObject);
    client.close();

    res.status(201).json({
        ok: true,
        from: "areaChartData",
        date: date.toISOString(),
        data: {
            viewers: newViewersArray,
            channels: newChannelsArray,
            games: newGamesArray,
        },
    });
};

export default handler;
