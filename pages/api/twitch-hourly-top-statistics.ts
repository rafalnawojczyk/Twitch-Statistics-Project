import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import Stats from "../../models/Stats";
import TopHourlyStats from "../../models/TopHourlyStats";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") return;

    const data: {
        hourlyGames?: { topHourlyGames: Stats[]; totalViewers: number };
        hourlyChannels?: { topHourlyChannels: Stats[]; totalViewers: number };
        weeklyTop?: Stats[];
    } = JSON.parse(req.body);

    const client = await MongoClient.connect(
        `mongodb+srv://${process.env.DB_CLIENT_ID}:${process.env.DB_CLIENT_PASSWORD}@cluster0.9v1xfdu.mongodb.net/twitchStatistics?retryWrites=true&w=majority`
    );
    const db = client.db();

    const twitchStatisticsCollection = db.collection("hourlyTopStats");

    const response = await twitchStatisticsCollection.find().toArray();

    const oldData: TopHourlyStats = response[0].data;

    let newData: TopHourlyStats;

    if (data.weeklyTop) {
        newData = { ...oldData, weeklyTop: { statistics: data.weeklyTop } };
    }

    if (data.hourlyGames && data.hourlyChannels) {
        newData = {
            ...oldData,
            hourlyGames: {
                statistics: data.hourlyGames.topHourlyGames,
                totalViewers: data.hourlyGames.totalViewers,
            },
            hourlyChannels: {
                statistics: data.hourlyChannels.topHourlyChannels,
                totalViewers: data.hourlyChannels.totalViewers,
            },
        };
    }

    const date = new Date().toISOString();

    const result = await twitchStatisticsCollection.replaceOne(
        {},
        {
            createdAt: date,
            data: newData!,
        }
    );

    //close connection
    client.close();

    // set status on response
    res.status(201).json({ message: "Data updated succesfully" });
};

export default handler;
