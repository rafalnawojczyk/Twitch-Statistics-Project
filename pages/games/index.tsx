import { MongoClient } from "mongodb";
import { GetStaticProps } from "next";
import Head from "next/head";

import LiveTopGames from "../../components/LiveTopGames/LiveTopGames";
import LiveTableData from "../../models/LiveTableData";

const Games: React.FC<{ data: LiveTableData }> = props => {
    return (
        <>
            <Head>
                <title>Twitch top LIVE games statistics | TWITCHSTATISTICS</title>
                <meta
                    name="description"
                    content="Browse a huge list of Twitch statistics and charts. Live charts for streamers and games."
                />
            </Head>

            <LiveTopGames data={props.data} />
        </>
    );
};

export default Games;

export const getStaticProps: GetStaticProps = async context => {
    const getGamesData = async () => {
        const client = await MongoClient.connect(
            `mongodb+srv://${process.env.DB_CLIENT_ID}:${process.env.DB_CLIENT_PASSWORD}@cluster0.9v1xfdu.mongodb.net/twitchStatistics?retryWrites=true&w=majority`
        );
        const db = client.db();

        const twitchStatisticsCollection = db.collection("liveStatsData");

        const response = await twitchStatisticsCollection.find({}).toArray();

        const topActiveGames: LiveTableData = response[0].data.activeGames;

        //close connection
        client.close();

        return { ...topActiveGames };
    };

    try {
        const topActiveGames = await getGamesData();

        return {
            props: {
                data: topActiveGames,
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
