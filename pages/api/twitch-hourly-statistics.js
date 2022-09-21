import { MongoClient } from "mongodb";
const handler = async (req, res) => {
    if (req.method !== "PATCH") return;

    const client = await MongoClient.connect(
        "mongodb+srv://***REMOVED***:***REMOVED***@cluster0.9v1xfdu.mongodb.net/twitchStatistics?retryWrites=true&w=majority"
    );
    const db = client.db();

    const twitchStatisticsCollection = db.collection("meetups");

    // data should be an object storing statistics of 500 users, as well as date

    const data = {
        date: new Date().toISOString(),
        statistics: {
            // username: {
            // subsCount: ,
            // followersCount,
            // hoursWatched: ,
            // actualViewers,
            // }
        },
    };

    // insert "data" to meetups collection and await result
    const result = await twitchStatisticsCollection.insertOne(data);

    // add error handling

    //close connection
    client.close();

    // set status on response
    res.status(201).json({ message: "Data updated succesfully" });
};

export default handler;
