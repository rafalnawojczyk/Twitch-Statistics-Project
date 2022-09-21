import { MongoClient } from "mongodb";

const handler = async (req, res) => {
    if (req.method !== "POST") return;

    const data = JSON.parse(req.body);

    const client = await MongoClient.connect(
        "mongodb+srv://***REMOVED***:***REMOVED***@cluster0.9v1xfdu.mongodb.net/twitchStatistics?retryWrites=true&w=majority"
    );
    const db = client.db();

    const twitchStatisticsCollection = db.collection("hourlyStats");

    // insert "data" to meetups collection and await result
    const result = await twitchStatisticsCollection.insertOne(data);

    // add error handling

    //close connection
    client.close();

    // set status on response
    res.status(201).json({ message: "Data updated succesfully" });
};

export default handler;
