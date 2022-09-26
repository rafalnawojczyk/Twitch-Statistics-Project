import { MongoClient } from "mongodb";

const handler = async (req, res) => {
    if (req.method !== "POST") return;

    const data = JSON.parse(req.body).map(channel => ({
        game: channel.game_name,
        viewerCount: channel.viewer_count,
    }));

    const client = await MongoClient.connect(
        `mongodb+srv://${process.env.DB_CLIENT_ID}:${process.env.DB_CLIENT_PASSWORD}@cluster0.9v1xfdu.mongodb.net/twitchStatistics?retryWrites=true&w=majority`
    );
    const db = client.db();

    const twitchStatisticsCollection = db.collection("hourlyGamesTop");

    const summary = {};

    data.forEach(entry => {
        summary[entry.game] = summary[entry.game] || { gameName: entry.game };

        summary[entry.game].sumViews =
            summary[entry.game].sumViews + entry.viewerCount || entry.viewerCount;

        summary[entry.game].sumChannels = summary[entry.game].sumChannels + 1 || 1;
    });

    const sortedByViews = Object.values(summary).sort((a, b) => b.sumViews - a.sumViews);

    if (sortedByViews.length > 10) sortedByViews.length = 10;

    const date = new Date().toISOString();
    const finalData = { date, data: sortedByViews };

    const deleteResult = await twitchStatisticsCollection.deleteOne({});

    const result = await twitchStatisticsCollection.insertOne(finalData);

    //close connection
    client.close();

    // set status on response
    res.status(201).json({ message: "Data updated succesfully" });
};

export default handler;
