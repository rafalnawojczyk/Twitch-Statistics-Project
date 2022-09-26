import { MongoClient } from "mongodb";

const handler = async (req, res) => {
    if (req.method !== "GET") return;

    const client = await MongoClient.connect(
        `mongodb+srv://${process.env.DB_CLIENT_ID}:${process.env.DB_CLIENT_PASSWORD}@cluster0.9v1xfdu.mongodb.net/twitchStatistics?retryWrites=true&w=majority`
    );
    const db = client.db();

    const twitchHourlyCollection = db.collection("hourlyStats");
    const twitchDailyCollection = db.collection("dailyStats");

    const date = new Date();
    let requestedTime = new Date(new Date().setDate(date.getDate() - 1)).toISOString();

    const lastDayHourlyData = await twitchHourlyCollection
        .find(
            {
                // ******* TEMPORARY - date exchange for createdAt
                date: { $gt: requestedTime },
            },
            {
                _id: 0,
                date: 0,
                statistics: 1,
            }
        )
        .toArray();

    // [{statistics:{userId: viewsCount, userId: viewsCount, }}, {}]
    const data = {};
    lastDayHourlyData.forEach(hourData => {
        const keys = Object.keys(hourData.statistics);
        keys.forEach(key => {
            data[key] = data[key] || { userId: key };

            data[key].maxViews =
                data[key].maxViews > hourData.statistics[key]
                    ? data[key].maxViews
                    : hourData.statistics[key];
        });
    });

    // get all information about channel
    const authorizationObject = await fetch(`${process.env.SERVER}api/twitch-oauth-token`);
    const authorizationData = await authorizationObject.json();
    let { accessToken, tokenType } = authorizationData.data;
    tokenType = tokenType.slice(0, 1).toUpperCase() + tokenType.slice(1);
    const authorization = `${tokenType} ${accessToken}`;

    const sortedByViews = Object.values(data).sort((a, b) => b.maxViews - a.maxViews);
    if (sortedByViews.length > 50) sortedByViews.length = 50;

    const keys = sortedByViews.map(el => el.userId);

    let url = `${process.env.GET_USER_API_URL}?${keys.map(key => "id=" + key + "&").join("")}`;

    const userInformationResponse = await fetch(url, {
        method: "GET",
        headers: {
            authorization: authorization,
            "Client-Id": process.env.TWITCH_CLIENT_ID,
        },
    });

    const userInformation = await userInformationResponse.json();

    userInformation.data.forEach(el => {
        data[el.id].username = el.display_name;
        data[el.id].image = el.profile_image_url;
    });

    const createdAt = new Date().toISOString();

    const finalData = { createdAt, data: sortedByViews };

    const deleteResult = await twitchDailyCollection.deleteOne({});

    const result = await twitchDailyCollection.insertOne(finalData);

    //close connection
    client.close();

    // set status on response
    res.status(201).json({ message: "Data updated succesfully" });
};

export default handler;
