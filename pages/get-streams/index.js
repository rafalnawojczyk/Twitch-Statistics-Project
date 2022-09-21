const GetStreams = props => {
    const info = props.wholeData.length === 500 ? "parsing data done" : "parsing data failed";
    return <p>{info}</p>;
};

export async function getServerSideProps() {
    const getOAuthToken = async () => {
        console.log("getting token");
        const url = `${process.env.TWITCH_AUTH_API_URL}?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&grant_type=client_credentials`;

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });

        const data = await response.json();
        return data;
    };

    const getStream = async () => {
        const authorizationObject = await getOAuthToken();

        let { access_token, expires_in, token_type } = authorizationObject;
        token_type = token_type.slice(0, 1).toUpperCase() + token_type.slice(1);

        const authorization = `${token_type} ${access_token}`;
        const wholeData = [];
        let pagination;
        let counter = 5;

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

            wholeData.push(...data.data);
            pagination = data.pagination.cursor;
        }

        // fetch through API to send data to database

        return wholeData;
    };

    const wholeData = await getStream();

    const response = await fetch(`${process.env.SERVER}api/twitch-hourly-statistics`, {
        method: "POST",
        body: wholeData,
    });

    return {
        props: {
            wholeData,
        },
    };
}

export default GetStreams;
