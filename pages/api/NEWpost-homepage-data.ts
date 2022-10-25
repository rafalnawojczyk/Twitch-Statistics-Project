import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import HomepageData from "../../models/HomepageData";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") return;

    const data: HomepageData = JSON.parse(req.body);

    const client = await MongoClient.connect(
        `mongodb+srv://${process.env.DB_CLIENT_ID}:${process.env.DB_CLIENT_PASSWORD}@cluster0.9v1xfdu.mongodb.net/twitchStatistics?retryWrites=true&w=majority`
    );
    const db = client.db();

    const twitchStatisticsCollection = db.collection("homepageData");

    const date = new Date().toISOString();

    const result = await twitchStatisticsCollection.replaceOne(
        {},
        {
            createdAt: date,
            data,
        }
    );

    //close connection
    client.close();

    // set status on response
    res.status(201).json({
        ok: true,
        from: "homepageData",
        date: date,
    });
};

export default handler;
