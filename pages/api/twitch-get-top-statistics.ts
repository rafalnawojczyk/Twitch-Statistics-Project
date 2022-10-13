import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

import TopHourlyStats from "../../models/TopHourlyStats";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "GET") return;

    const client = await MongoClient.connect(
        `mongodb+srv://${process.env.DB_CLIENT_ID}:${process.env.DB_CLIENT_PASSWORD}@cluster0.9v1xfdu.mongodb.net/twitchStatistics?retryWrites=true&w=majority`
    );
    const db = client.db();

    const twitchStatisticsCollection = db.collection("hourlyTopStats");

    const response = await twitchStatisticsCollection.find().toArray();

    const data: TopHourlyStats = response[0].data;

    //close connection
    client.close();

    // set status on response
    res.status(201).json(data);
};

export default handler;