import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import LanguageStats from "../../models/LanguageStats";
import UnformattedStatsObj from "../../models/UnformattedStatsObj";
import { getFormattedDate } from "../../utils/utils";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") return;

    const data: { languageStats: UnformattedStatsObj } = JSON.parse(req.body);

    const client = await MongoClient.connect(
        `mongodb+srv://${process.env.DB_CLIENT_ID}:${process.env.DB_CLIENT_PASSWORD}@cluster0.9v1xfdu.mongodb.net/twitchStatistics?retryWrites=true&w=majority`
    );
    const db = client.db();

    const twitchStatisticsCollection = db.collection("languageStats");

    // TODO: TEMPORARY FOR FIRST RUN TO GET THINGS INTO DB
    const date = new Date();
    const formattedDate = getFormattedDate(date);
    const newData = Object.keys(data.languageStats).map(langCode => {
        const newChartObj: {
            name: string;
            value: number;
            channels: number;
        } = {
            name: formattedDate,
            value: data.languageStats[langCode].views,
            channels: data.languageStats[langCode].channels!,
        };
        const newChartData = [newChartObj];

        const newAverageViewers = data.languageStats[langCode].views;
        const newAverageChannels = data.languageStats[langCode].channels!;

        const newLangStats: LanguageStats = {
            title: data.languageStats[langCode].title,
            langCode: langCode,
            averageChannels: newAverageChannels,
            averageViewers: newAverageViewers,
            chartData: newChartData,
        };

        return newLangStats;
    });

    // const response = await twitchStatisticsCollection.find().toArray();

    // const oldData: LanguageStats[] = response[0].data;
    // const date = new Date();
    // const formattedDate = getFormattedDate(date);

    // const newData = oldData.map(lang => {
    //     const newChartData = lang.chartData.slice(1);
    //     const newChartObj: {
    //         name: string;
    //         value: number;
    //         channels: number;
    //     } = {
    //         name: formattedDate,
    //         value: data.languageStats[lang.langCode].views,
    //         channels: data.languageStats[lang.langCode].channels!,
    //     };
    //     newChartData.push(newChartObj);

    //     const newAverageViewers =
    //         newChartData.reduce((a, b) => a + b.value, 0) / newChartData.length;
    //     const newAverageChannels =
    //         newChartData.reduce((a, b) => a + b.channels, 0) / newChartData.length;

    //     const newLangStats: LanguageStats = {
    //         title: lang.title,
    //         langCode: lang.langCode,
    //         averageChannels: newAverageChannels,
    //         averageViewers: newAverageViewers,
    //         chartData: newChartData,
    //     };

    //     return newLangStats;
    // });

    const result = await twitchStatisticsCollection.replaceOne(
        {},
        {
            createdAt: date.toISOString(),
            data: newData,
        }
    );

    client.close();

    // set status on response
    res.status(201).json({ message: "Data updated succesfully" });
};

export default handler;