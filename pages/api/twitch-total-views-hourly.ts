import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import TotalViews from "../../models/TotalViews";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") return;

    const data: TotalViews = JSON.parse(req.body);

    const client = await MongoClient.connect(
        `mongodb+srv://${process.env.DB_CLIENT_ID}:${process.env.DB_CLIENT_PASSWORD}@cluster0.9v1xfdu.mongodb.net/twitchStatistics?retryWrites=true&w=majority`
    );
    const db = client.db();

    const twitchStatisticsCollection = db.collection("hourlyTotalViews");

    const response = await twitchStatisticsCollection.find().toArray();

    const oldData: TotalViews[] = response[0].statistics;

    const newData = [...oldData, data];

    const result = await twitchStatisticsCollection.replaceOne({}, { statistics: newData });

    //close connection
    client.close();

    // set status on response
    res.status(201).json({ message: "Data updated succesfully" });
};

export default handler;
