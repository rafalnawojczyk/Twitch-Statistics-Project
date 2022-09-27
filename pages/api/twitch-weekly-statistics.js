import { MongoClient } from "mongodb";
import { WEEKLY_TOP_AMMOUNT } from "../../config";

const handler = async (req, res) => {
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
                _id: 0,
                date: 0,
                data: 1,
            }
        )
        .toArray();

    // [data: {userId:, maxViews:, username: , image:}]
    const weeklyData = {};
    lastWeekData.forEach(dailyData => {
        dailyData.data.forEach(user => {
            weeklyData[user.userId] = weeklyData[user.userId] || {
                userId: user.userId,
                username: user.username,
                image: user.image,
                login: user.login,
            };

            weeklyData[user.userId].maxViews =
                weeklyData[user.userId].maxViews > dailyData.data[user.userId]
                    ? weeklyData[user.userId].maxViews
                    : dailyData.data[user.userId];
        });
    });

    // request to GET_WEEKLY_SUMMARY_API_URL with login to get statistics and put into a weeklyData accordingly
    const userWeeklySummary = [];
    const getWeeklySummary = async function (login) {
        const response = await fetch(`${process.env.GET_WEEKLY_SUMMARY_API_URL}${login}`);
        const data = await response.json();

        userWeeklySummary.push(response);
    };

    const loginLis = Object.keys(weeklyData).map(key => weeklyData[key].login);
    const loginList = loginLis.filter(el => el);
    // loginList.length = 10; // ******* TEMPORARY

    while (loginList.length > 0) {
        const login = loginList[loginList.length - 1];
        loginList.length -= 1;

        await getWeeklySummary(login);
    }

    console.log(userWeeklySummary);
    console.log("JEDNO");
    console.log(userWeeklySummary[0]);

    // - number of subscribers
    // - number of views in last 30 days
    // - number of followers
    // - number of hours watched in last 30 days

    // const sortedByViews = Object.values(data).sort((a, b) => b.maxViews - a.maxViews);
    // if (sortedByViews.length > WEEKLY_TOP_AMMOUNT) sortedByViews.length = WEEKLY_TOP_AMMOUNT;

    const createdAt = new Date().toISOString();

    // const finalData = { createdAt, data: sortedByViews };

    // const result = await twitchDailyCollection.insertOne(finalData);

    //close connection
    client.close();

    // set status on response
    res.status(201).json({ message: "Data updated succesfully" });
};

export default handler;
