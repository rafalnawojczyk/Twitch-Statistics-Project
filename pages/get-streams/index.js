import { HOURLY_CHANNELS_AMOUNT } from "../../config";

const GetStreams = props => {
    const info =
        Object.keys(props.wholeData.statistics).length === HOURLY_CHANNELS_AMOUNT
            ? "parsing data done"
            : "parsing data failed";
    return <p>{info}</p>;
};

export async function getServerSideProps() {
    const getStream = async () => {
        const authorizationObject = await fetch(`${process.env.SERVER}api/twitch-oauth-token`);
        const authorizationData = await authorizationObject.json();

        if (!authorizationData.ok) throw new Error("Getting token failed.");

        let { accessToken, tokenType } = authorizationData.data;
        tokenType = tokenType.slice(0, 1).toUpperCase() + tokenType.slice(1);

        const authorization = `${tokenType} ${accessToken}`;
        const wholeData = [];
        const topHourly = [];
        let pagination;
        let counter = HOURLY_CHANNELS_AMOUNT / 100;

        for (let i = 0; i < counter; i++) {
            let url = process.env.GET_STREAMS_API_URL;
            if (i > 0) url = `${process.env.GET_STREAMS_API_URL}&after=${pagination}`;

            const response = await fetch(url, {
                method: "GET",
                headers: {
                    authorization: authorization,
                    "Client-Id": process.env.TWITCH_CLIENT_ID,
                },
            });
            const data = await response.json();

            if (i === 0) topHourly.push(...data.data);

            wholeData.push(...data.data);
            pagination = data.pagination.cursor;
        }

        return { wholeData, topHourly };
    };

    try {
        const responseData = await getStream();

        const { wholeData: initialData, topHourly } = responseData;

        const statistics = {};
        initialData.forEach(channel => (statistics[channel.user_id] = channel.viewer_count));

        const date = new Date().toISOString();
        const wholeData = { date, statistics };

        const hourlyResponse = await fetch(
            `${process.env.SERVER}api/twitch-hourly-views-statistics`,
            {
                method: "POST",
                body: JSON.stringify(wholeData),
            }
        );

        const topHourlyResponse = await fetch(
            `${process.env.SERVER}api/twitch-top-channels-hourly`,
            {
                method: "POST",
                body: JSON.stringify(topHourly),
            }
        );

        const topGamesResponse = await fetch(`${process.env.SERVER}api/twitch-top-games-hourly`, {
            method: "POST",
            body: JSON.stringify(initialData),
        });

        return {
            props: {
                wholeData,
            },
        };
    } catch (err) {
        // ******* TEMPORARY *******
        console.log(err);
    }
}

export default GetStreams;
