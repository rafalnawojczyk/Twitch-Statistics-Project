import { MongoClient } from "mongodb";

const handler = async (req, res) => {
    if (req.method !== "POST") return;

    const data = JSON.parse(req.body);

    const client = await MongoClient.connect(
        `mongodb+srv://${process.env.DB_CLIENT_ID}:${process.env.DB_CLIENT_PASSWORD}@cluster0.9v1xfdu.mongodb.net/twitchStatistics?retryWrites=true&w=majority`
    );
    const db = client.db();

    const twitchStatisticsCollection = db.collection("hourlyGamesTop");

    const date = new Date().toISOString();
    const finalData = { createdAt: date, data: data };

    const deleteResult = await twitchStatisticsCollection.deleteOne({});

    const result = await twitchStatisticsCollection.insertOne(finalData);

    //close connection
    client.close();

    // set status on response
    res.status(201).json({ message: "Data updated succesfully" });
};

export default handler;