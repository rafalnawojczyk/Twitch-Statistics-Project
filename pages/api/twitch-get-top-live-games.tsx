import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

import Stats from "../../models/Stats";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "GET") return;

    const client = await MongoClient.connect(
        `mongodb+srv://${process.env.DB_CLIENT_ID}:${process.env.DB_CLIENT_PASSWORD}@cluster0.9v1xfdu.mongodb.net/twitchStatistics?retryWrites=true&w=majority`
    );
    const db = client.db();

    const twitchStatisticsCollection = db.collection("hourlyGamesTop");

    const response = await twitchStatisticsCollection.find({}).toArray();

    const hourlyGamesTop: Stats[] = response[0].data;
    const totalViewers: number = response[0].totalViewers;

    //close connection
    client.close();

    // set status on response
    res.status(201).json({ hourlyGamesTop, totalViewers });
};

export default handler;
