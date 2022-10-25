import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { HOURLY_GAMES_AMMOUNT } from "../../config";
import Stats from "../../models/Stats";
import UnformattedStatsObj from "../../models/UnformattedStatsObj";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") return;

    const data: { gamesStats: UnformattedStatsObj; totalGames: number; authorization: string } =
        JSON.parse(req.body);

    // const client = await MongoClient.connect(
    //     `mongodb+srv://${process.env.DB_CLIENT_ID}:${process.env.DB_CLIENT_PASSWORD}@cluster0.9v1xfdu.mongodb.net/twitchStatistics?retryWrites=true&w=majority`
    // );
    // const db = client.db();

    // const twitchStatisticsCollection = db.collection("hourlyTopStats");

    // const response = await twitchStatisticsCollection.find().toArray();

    // const oldData: TopHourlyStats = response[0].data;

    // const date = new Date().toISOString();

    // const result = await twitchStatisticsCollection.replaceOne(
    //     {},
    //     {
    //         createdAt: date,
    //         data: newData!,
    //     }
    // );

    // //close connection
    // client.close();

    // set status on response
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
