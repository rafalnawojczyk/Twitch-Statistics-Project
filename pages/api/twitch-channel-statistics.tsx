import { MongoClient, Collection, FindOptions } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import Stats from "../../models/Stats";

// TODO:
// GET a username: username from the req.body
// use this username to get information about user from twitch API
// use this username to get user views history from DB (hourlyStats)
// compile all these informations and pass them through res

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "GET") return;

    const username = JSON.parse(req.body);

    const client = await MongoClient.connect(
        `mongodb+srv://${process.env.DB_CLIENT_ID}:${process.env.DB_CLIENT_PASSWORD}@cluster0.9v1xfdu.mongodb.net/twitchStatistics?retryWrites=true&w=majority`
    );
    const db = client.db();

    const twitchHourlyCollection: Collection<{ _id: string; createdAt: string; data: {} }> =
        db.collection("hourlyStats");

    const date = new Date();
    let requestedTime = new Date(new Date().setDate(date.getDate() - 1)).toISOString();

    const lastDayHourlyData = await twitchHourlyCollection
        .find(
            {
                createdAt: { $gt: requestedTime },
            },
            {
                projection: { data: 1 },
            }
        )
        .toArray();

    // [{statistics:{userId: viewsCount, userId: viewsCount, }}, {}]
    // const data = {};
    // lastDayHourlyData.forEach(hourData => {
    //     const keys = Object.keys(hourData.data.statistics);
    //     keys.forEach(key => {
    //         data[key] = data[key] || { userId: key };

    //         data[key].maxViews =
    //             data[key].maxViews > hourData.data.statistics[key]
    //                 ? data[key].maxViews
    //                 : hourData.data.statistics[key];
    //     });
    // });

    // get all information about channel
    // const authorizationObject = await fetch(`${process.env.SERVER}api/twitch-oauth-token`);
    // const authorizationData = await authorizationObject.json();
    // let { accessToken, tokenType } = authorizationData.data;
    // tokenType = tokenType.slice(0, 1).toUpperCase() + tokenType.slice(1);
    // const authorization = `${tokenType} ${accessToken}`;

    // let url = `${process.env.GET_USER_API_URL}?${keys.map(key => "id=" + key + "&").join("")}`;

    // const userInformationResponse = await fetch(url, {
    //     method: "GET",
    //     headers: {
    //         authorization: authorization,
    //         "Client-Id": process.env.TWITCH_CLIENT_ID,
    //     },
    // });

    // const userInformation = await userInformationResponse.json();

    // userInformation.data.forEach(el => {
    //     data[el.id].username = el.display_name;
    //     data[el.id].image = el.profile_image_url;
    //     data[el.id].login = el.login;
    // });

    // const createdAt = new Date().toISOString();

    // const finalData = { createdAt, data: sortedByViews };

    // const result = await twitchDailyCollection.insertOne(finalData);

    //close connection
    client.close();

    // set status on response
    res.status(201).json({ message: "Data updated succesfully" });
};

export default handler;
