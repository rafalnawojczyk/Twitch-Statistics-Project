import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { HOURLY_CHANNELS_AMMOUNT } from "../../config";
import Stats from "../../models/Stats";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") return;

    const data: { topHourlyChannels: Stats[]; totalViewers: number } = JSON.parse(req.body);

    const client = await MongoClient.connect(
        `mongodb+srv://${process.env.DB_CLIENT_ID}:${process.env.DB_CLIENT_PASSWORD}@cluster0.9v1xfdu.mongodb.net/twitchStatistics?retryWrites=true&w=majority`
    );
    const db = client.db();

    const twitchStatisticsCollection = db.collection("hourlyTop");
    const date = new Date().toISOString();

    const finalData = {
        createdAt: date,
        data: data.topHourlyChannels,
        totalViewers: data.totalViewers,
    };

    if (data.topHourlyChannels.length > HOURLY_CHANNELS_AMMOUNT)
        data.topHourlyChannels.length = HOURLY_CHANNELS_AMMOUNT;

    const deleteResult = await twitchStatisticsCollection.deleteOne({});

    const result = await twitchStatisticsCollection.insertOne(finalData);
    console.log(result);

    //close connection
    client.close();

    // set status on response
    res.status(201).json({ message: "Data updated succesfully" });
};

export default handler;
