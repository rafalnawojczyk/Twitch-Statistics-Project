import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { LIVE_BAR_LABELS } from "../../config";
import LiveBarStats from "../../models/LiveBarStats";
import { getFormattedDate } from "../../utils/utils";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") return;

    const data: { totalChannels: number; totalGames: number; totalViewers: number } = JSON.parse(
        req.body
    );
    //
    const client = await MongoClient.connect(
        `mongodb+srv://${process.env.DB_CLIENT_ID}:${process.env.DB_CLIENT_PASSWORD}@cluster0.9v1xfdu.mongodb.net/twitchStatistics?retryWrites=true&w=majority`
    );
    const db = client.db();

    const twitchStatisticsCollection = db.collection("liveBarData");

    const response = await twitchStatisticsCollection.find().toArray();

    const oldBarData: LiveBarStats[] = response[0].data;
    const newBarData: LiveBarStats[] = [];
    const date = new Date();
    const formattedDate = getFormattedDate(date);

    // activeViewers:
    const newActiveViewers: LiveBarStats = {
        value: data.totalViewers,
        title: LIVE_BAR_LABELS[0].title,
        type: LIVE_BAR_LABELS[0].type,
        live: true,
        date: "",
    };
    newBarData.push(newActiveViewers);
    // activeChannels
    const newActiveChannels: LiveBarStats = {
        value: data.totalChannels,
        title: LIVE_BAR_LABELS[1].title,
        type: LIVE_BAR_LABELS[1].type,
        live: true,
        date: "",
    };
    newBarData.push(newActiveChannels);
    // gamesStreamed
    const newGamesStreamed: LiveBarStats = {
        value: data.totalGames,
        title: LIVE_BAR_LABELS[2].title,
        type: LIVE_BAR_LABELS[2].type,
        live: true,
        date: "",
    };
    newBarData.push(newGamesStreamed);
    // peakViewers
    const isPeakViewers = data.totalViewers > oldBarData[3].value;
    const newPeakViewers: LiveBarStats = {
        value: isPeakViewers ? data.totalViewers : oldBarData[3].value,
        title: LIVE_BAR_LABELS[3].title,
        type: LIVE_BAR_LABELS[3].type,
        live: false,
        date: isPeakViewers ? formattedDate : oldBarData[3].date,
    };
    newBarData.push(newPeakViewers);
    // peakChannels
    const isPeakChannels = data.totalChannels > oldBarData[4].value;
    const newPeakChannels: LiveBarStats = {
        value: isPeakChannels ? data.totalChannels : oldBarData[4].value,
        title: LIVE_BAR_LABELS[4].title,
        type: LIVE_BAR_LABELS[4].type,
        live: false,
        date: isPeakChannels ? formattedDate : oldBarData[4].date,
    };
    newBarData.push(newPeakChannels);
    // totalChannels
    const newTotalChannels: LiveBarStats = {
        value: oldBarData[5].value,
        title: LIVE_BAR_LABELS[5].title,
        type: LIVE_BAR_LABELS[5].type,
        live: false,
        date: oldBarData[4].date,
    };
    newBarData.push(newTotalChannels);

    const result = await twitchStatisticsCollection.replaceOne(
        {},
        {
            createdAt: date,
            data: newBarData,
        }
    );

    client.close();

    // set status on response
    res.status(201).json({
        ok: true,
        from: "LiveBarData",
        date: date.toISOString(),
        data: newBarData,
    });
};

export default handler;
