import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import MonthlyData from "../../models/MonthlyData";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "GET") return;

    const client = await MongoClient.connect(
        `mongodb+srv://${process.env.DB_CLIENT_ID}:${process.env.DB_CLIENT_PASSWORD}@cluster0.9v1xfdu.mongodb.net/twitchStatistics?retryWrites=true&w=majority`
    );
    const db = client.db();

    const twitchStatisticsCollection = db.collection("monthlyOverview");

    const response = await twitchStatisticsCollection.find({}).toArray();

    const monthlyOverview: MonthlyData = {
        2020: response[0].data[2020],
        2021: response[0].data[2021],
        2022: response[0].data[2022],
    };

    const maxMonthlyOverview: MonthlyData = {
        2020: response[0].maxData[2020],
        2021: response[0].maxData[2021],
        2022: response[0].maxData[2022],
    };
    //close connection
    client.close();

    // set status on response
    res.status(201).json({
        ok: true,
        from: "monthlyOverview",
        data: {
            monthlyOverview,
            maxMonthlyOverview,
        },
    });
};

export default handler;
