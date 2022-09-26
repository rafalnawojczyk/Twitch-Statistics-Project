import { MongoClient } from "mongodb";
import { HOURLY_CHANNELS_AMMOUNT } from "../../config";

const handler = async (req, res) => {
    if (req.method !== "POST") return;

    const data = JSON.parse(req.body).map(channel => ({
        id: channel.user_id,
        username: channel.user_name,
        game: channel.game_name,
        viewerCount: channel.viewer_count,
        language: channel.language,
        thumbnail: channel.thumbnail_url,
    }));

    const client = await MongoClient.connect(
        `mongodb+srv://${process.env.DB_CLIENT_ID}:${process.env.DB_CLIENT_PASSWORD}@cluster0.9v1xfdu.mongodb.net/twitchStatistics?retryWrites=true&w=majority`
    );
    const db = client.db();

    const twitchStatisticsCollection = db.collection("hourlyTop");
    const date = new Date().toISOString();

    const finalData = { createdAt: date, data };

    if (data.length > HOURLY_CHANNELS_AMMOUNT) data.length = HOURLY_CHANNELS_AMMOUNT;

    const deleteResult = await twitchStatisticsCollection.deleteOne({});

    const result = await twitchStatisticsCollection.insertOne(finalData);
    console.log(result);

    //close connection
    client.close();

    // set status on response
    res.status(201).json({ message: "Data updated succesfully" });
};

export default handler;
