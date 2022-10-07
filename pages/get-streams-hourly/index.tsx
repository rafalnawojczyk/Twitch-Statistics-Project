import { title } from "process";
import { HOURLY_CHANNELS_AMOUNT, GAME_THUMBNAIL_WIDTH, GAME_THUMBNAIL_HEIGHT } from "../../config";
import Stats from "../../models/Stats";

const GetStreams: React.FC<{ wholeData: { statistics: {} } }> = props => {
    return <p>{JSON.stringify(props.wholeData)}</p>;
};

export async function getServerSideProps() {
    const getStream = async () => {
        const authorizationObject = await fetch(`${process.env.SERVER}api/twitch-oauth-token`);
        const authorizationData: { data: { accessToken: string; tokenType: string }; ok: boolean } =
            await authorizationObject.json();

        if (!authorizationData.ok) throw new Error("Getting token failed.");

        let { accessToken, tokenType } = authorizationData.data;
        tokenType = tokenType.slice(0, 1).toUpperCase() + tokenType.slice(1);

        const authorization = `${tokenType} ${accessToken}`;
        const wholeData: Stats[] = [];
        const topHourlyChannels: Stats[] = [];
        let pagination;
        let counter = HOURLY_CHANNELS_AMOUNT / 100;

        for (let i = 0; i < counter; i++) {
            let url = process.env.GET_STREAMS_API_URL!;
            if (i > 0) url = `${process.env.GET_STREAMS_API_URL}&after=${pagination}`;

            const response = await fetch(url, {
                method: "GET",
                headers: {
                    authorization: authorization,
                    "Client-Id": process.env.TWITCH_CLIENT_ID,
                },
            });
            const data = await response.json();
            const typedData: Stats[] = data.data.map(
                el =>
                    new Stats(
                        el.user_name,
                        el.viewer_count,
                        el.thumbnail_url,
                        el.user_id,
                        el.game_name
                    )
            );

            if (i === 0) topHourlyChannels.push(...typedData);
            wholeData.push(...typedData);
            pagination = data.pagination.cursor;
        }

        const topHourlyGamesResponse = await fetch(process.env.GET_GAMES_API_URL!, {
            method: "GET",
            headers: {
                authorization: authorization,
                "Client-Id": process.env.TWITCH_CLIENT_ID,
            },
        });

        const topHourlyGamesData = await topHourlyGamesResponse.json();
        const topHourlyGames = topHourlyGamesData.data.map(
            el => new Stats(el.name, +el.id, el.box_art_url, el.id)
        );

        return { wholeData, topHourlyGames, topHourlyChannels };
    };

    try {
        const responseData = await getStream();

        const { wholeData: initialData, topHourlyChannels, topHourlyGames } = responseData;

        const statistics: any = {};
        initialData.forEach(channel => (statistics[channel.id] = channel.views));

        const wholeData = { statistics };

        const hourlyResponse = await fetch(
            `${process.env.SERVER}api/twitch-views-statistics-hourly`,
            {
                method: "POST",
                body: JSON.stringify(wholeData),
            }
        );

        const topHourlyResponse = await fetch(
            `${process.env.SERVER}api/twitch-top-channels-hourly`,
            {
                method: "POST",
                body: JSON.stringify(topHourlyChannels),
            }
        );

        const topGamesResponse = await fetch(`${process.env.SERVER}api/twitch-top-games-hourly`, {
            method: "POST",
            body: JSON.stringify(topHourlyGames),
        });

        return {
            props: {
                wholeData,
            },
        };
    } catch (err) {
        // ******* TEMPORARY *******
        console.log(err);
        return {
            props: {
                err: err.message,
            },
        };
    }
}

export default GetStreams;
