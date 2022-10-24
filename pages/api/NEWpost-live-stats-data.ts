import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import DataFromStreamsApi from "../../models/DataFromStreamsApi";
import UnformattedStatsObj from "../../models/UnformattedStatsObj";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") return;
    // activeChannels.length === 50 - TOP 50channels
    // activeGames
    const data: {
        activeChannels: DataFromStreamsApi[];
        activeGames: UnformattedStatsObj;
        authorization: string;
    } = JSON.parse(req.body);

    // TODO:
    interface liveStatsData {
        // array of objects in certain type(usually just 3 objects here)
        live: boolean; // true/false if its live data or historical data from last 7 days
        title: string; // Title of the data, usuallly Games or Channels
        subtitle: string; // describes whats the number - "Max viewers" or "Current viewers"
        type: "activeChannels" | "activeGames" | "topChannels";
        stats: {
            // array of 50 top statistics
            title: string; // Channel/game name/nickanme
            language: string; // language of streaming for channels, for games just ""
            followers: number; // number of followers certain channel has
            viewers: number; // just the value which these stats are about
            image: string; // img path to image for this certain game/user
        }[];
    }
    // TODO:

    // const client = await MongoClient.connect(
    //     `mongodb+srv://${process.env.DB_CLIENT_ID}:${process.env.DB_CLIENT_PASSWORD}@cluster0.9v1xfdu.mongodb.net/twitchStatistics?retryWrites=true&w=majority`
    // );
    // const db = client.db();

    // const twitchStatisticsCollection = db.collection("hourlyTopStats");

    // const response = await twitchStatisticsCollection.find().toArray();

    // const oldData: TopHourlyStats = response[0].data;

    // const date = new Date().toISOString();

    // const result = await twitchStatisticsCollection.replaceOne(
    //     {},
    //     {
    //         createdAt: date,
    //         data: newData!,
    //     }
    // );

    // //close connection
    // client.close();

    // set status on response
    res.status(201).json({ message: "Data updated succesfully" });
};

export default handler;
