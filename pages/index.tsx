import { GetStaticProps } from "next";
import { MongoClient } from "mongodb";
import Head from "next/head";
import AreaChart from "../components/charts/AreaChart";
import LanguageStatsTable from "../components/LanguageStatsTable/LanguageStatsTable";
import HomepageCenter from "../components/layout/Homepage/HomepageCenter";
import HomepageFullWidth from "../components/layout/Homepage/HomepageFullWidth";
import HomepageLayout from "../components/layout/Homepage/HomepageLayout";
import HomepageSidebar from "../components/layout/Homepage/HomepageSidebar";
import HomepageTwoColumns from "../components/layout/Homepage/HomepageTwoColumns";
import LiveStatisticsBar from "../components/LiveStatisticsBar/LiveStatisticsBar";
import LiveStatsTable from "../components/LiveStatsTable/LiveStatsTable";
import StatsByMonth from "../components/StatsByMonth/StatsByMonth";
import AreaChartData from "../models/AreaChartData";
import HomepageData from "../models/HomepageData";
import LanguageStats from "../models/LanguageStats";
import LiveBarStats from "../models/LiveBarStats";
import LiveTableData from "../models/LiveTableData";
import MonthlyData from "../models/MonthlyData";

const HomePage: React.FC<{ homepageData: HomepageData }> = ({ homepageData }) => {
    const languageStatsData: LanguageStats[] = Object.values(homepageData.languageStats).slice(
        0,
        10
    );

    const liveStatsData: {
        [key: string]: LiveTableData;
    } = homepageData.liveStats;
    const monthlyData: MonthlyData = homepageData.monthlyOverview;
    const maxMonthlyData: MonthlyData = homepageData.maxMonthlyOverview;
    const liveBarData: LiveBarStats[] = homepageData.liveBar;
    const areaChartDataChannels: AreaChartData[] = homepageData.areaCharts.channels;
    const areaChartDataViewers: AreaChartData[] = homepageData.areaCharts.viewers;

    return (
        <>
            <Head>
                <title>Twitch statistics and charts | TWITCHSTATISTICS</title>
                <meta
                    name="description"
                    content="Browse a huge list of Twitch statistics and charts. Live charts for streamers and games."
                />
            </Head>
            <HomepageLayout>
                <HomepageFullWidth>
                    <LiveStatisticsBar data={liveBarData} />
                </HomepageFullWidth>

                <HomepageTwoColumns>
                    <AreaChart
                        data={areaChartDataViewers}
                        title="Twitch concurrent viewers"
                        color="rgb(141, 250, 148)"
                    />
                </HomepageTwoColumns>
                <HomepageTwoColumns>
                    <AreaChart
                        data={areaChartDataChannels}
                        title="Twitch concurrent channels"
                        color="rgb(255, 154, 67)"
                    />
                </HomepageTwoColumns>

                <HomepageCenter>
                    <StatsByMonth data={monthlyData} maxData={maxMonthlyData} />
                    <LanguageStatsTable data={languageStatsData} />
                </HomepageCenter>
                <HomepageSidebar>
                    <LiveStatsTable data={liveStatsData.activeChannels} />
                    <LiveStatsTable data={liveStatsData.activeGames} />
                    <LiveStatsTable data={liveStatsData.topChannels} />
                </HomepageSidebar>
            </HomepageLayout>
        </>
    );
};

export default HomePage;

export const getStaticProps: GetStaticProps = async context => {
    const getHomepageData = async () => {
        const client = await MongoClient.connect(
            `mongodb+srv://${process.env.DB_CLIENT_ID}:${process.env.DB_CLIENT_PASSWORD}@cluster0.9v1xfdu.mongodb.net/twitchStatistics?retryWrites=true&w=majority`
        );
        const db = client.db();

        const twitchStatisticsCollection = db.collection("homepageData");

        const response = await twitchStatisticsCollection.find({}).toArray();

        const homepageData: HomepageData = response[0].data;

        //close connection
        client.close();

        return { ...homepageData };
    };

    try {
        const homepageData = await getHomepageData();
        return {
            props: {
                homepageData,
            },
            revalidate: 900,
        };
    } catch (err: any) {
        console.log(err);
        return {
            props: {
                err,
            },
            revalidate: 900,
        };
    }
};
