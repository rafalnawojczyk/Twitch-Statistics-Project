import { MongoClient } from "mongodb";
import { GetStaticProps } from "next";
import Head from "next/head";

import LiveTopChannels from "../../components/LiveTopChannels/LiveTopChannels";
import LiveTableData from "../../models/LiveTableData";

const Channels: React.FC<{ data: LiveTableData }> = props => {
    return (
        <>
            <Head>
                <title>Twitch top LIVE channels statistics | TWITCHSTATISTICS</title>
                <meta
                    name="description"
                    content="Browse a huge list of Twitch statistics and charts. Live charts for streamers and games."
                />
            </Head>

            <LiveTopChannels data={props.data} />
        </>
    );
};

export default Channels;

export const getStaticProps: GetStaticProps = async context => {
    const getChannelsData = async () => {
        const client = await MongoClient.connect(
            `mongodb+srv://${process.env.DB_CLIENT_ID}:${process.env.DB_CLIENT_PASSWORD}@cluster0.9v1xfdu.mongodb.net/twitchStatistics?retryWrites=true&w=majority`
        );
        const db = client.db();

        const twitchStatisticsCollection = db.collection("liveStatsData");

        const response = await twitchStatisticsCollection.find({}).toArray();

        const topActiveChannels: LiveTableData = response[0].data.activeChannels;

        //close connection
        client.close();

        return { ...topActiveChannels };
    };

    try {
        const topActiveChannels = await getChannelsData();

        return {
            props: {
                data: topActiveChannels,
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
