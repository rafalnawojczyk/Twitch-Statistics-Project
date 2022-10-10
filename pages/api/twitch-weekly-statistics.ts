import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { WEEKLY_TOP_AMMOUNT } from "../../config";
import Stats from "../../models/Stats";

type StatsObj = { id: string; title: string; image: string; views: number };

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") return;

    const client = await MongoClient.connect(
        `mongodb+srv://${process.env.DB_CLIENT_ID}:${process.env.DB_CLIENT_PASSWORD}@cluster0.9v1xfdu.mongodb.net/twitchStatistics?retryWrites=true&w=majority`
    );
    const db = client.db();

    const twitchDailyCollection = db.collection("dailyStats");
    const twitchWeeklyCollection = db.collection("weeklyStats");

    const date = new Date();
    let requestedTime = new Date(new Date().setDate(date.getDate() - 7)).toISOString();

    const lastWeekData = await twitchDailyCollection
        .find(
            {
                createdAt: { $gt: requestedTime },
            },
            {
                projection: {
                    _id: 0,
                    date: 0,
                    data: 1,
                },
            }
        )
        .toArray();

    const weeklyData: {
        [key: string]: StatsObj;
    } = {};
    lastWeekData.forEach(dailyData => {
        dailyData.data.forEach((user: StatsObj) => {
            weeklyData[user.id] = weeklyData[user.id] || {
                id: user.id,
                title: user.title,
                image: user.image,
            };

            weeklyData[user.id].views =
                weeklyData[user.id].views > user.views ? weeklyData[user.id].views : user.views;
        });
    });

    // GET https://api.twitch.tv/helix/subscriptions
    // GET https://api.twitch.tv/helix/users/follows?to_id=<user ID>

    // - number of subscribers
    // - number of views in last 30 days
    // - number of followers
    // - number of hours watched in last 30 days

    const sortedByViews = Object.values(weeklyData).sort((a, b) => b.views - a.views);

    if (sortedByViews.length > WEEKLY_TOP_AMMOUNT) sortedByViews.length = WEEKLY_TOP_AMMOUNT;

    const createdAt = new Date().toISOString();

    const typedData: Stats[] = sortedByViews.map(
        el => new Stats(el.title, el.views, el.image, el.id)
    );

    const finalData = {
        createdAt,
        data: typedData,
    };

    const result = await twitchWeeklyCollection.insertOne(finalData);

    //close connection
    client.close();

    // set status on response
    res.status(201).json({ message: "Data updated succesfully" });
};

export default handler;
