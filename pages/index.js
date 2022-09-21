import Head from "next/head";
import { useState } from "react";

const HomePage = props => {
    const [data, setData] = useState([]);

    // function that gets oauth acces_token
    const getOAuthToken = async () => {
        const url = `https://id.twitch.tv/oauth2/token?client_id=***REMOVED***&client_secret=***REMOVED***&grant_type=client_credentials`;

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });

        const data = await response.json();
        return data;
    };

    const getStreams = async () => {
        const authorizationObject = await getOAuthToken();

        let { access_token, expires_in, token_type } = authorizationObject;
        token_type = token_type.slice(0, 1).toUpperCase() + token_type.slice(1);

        const authorization = `${token_type} ${access_token}`;
        const wholeData = [];
        let pagination;
        let counter = 5;

        for (let i = 0; i < counter; i++) {
            let url = process.env.GET_STREAMS_API_URL;
            if (i > 0) url = `https://api.twitch.tv/helix/streams?first=100&after=${pagination}`;

            const response = await fetch(url, {
                method: "GET",
                headers: {
                    authorization: authorization,
                    "Client-Id": "***REMOVED***",
                },
            });
            const data = await response.json();

            wholeData.push(...data.data);
            pagination = data.pagination.cursor;
        }

        // fetch through API to send data to database

        console.log(wholeData);
    };

    return (
        <>
            <Head>
                <title>React Meetups</title>
                <meta name="description" content="Browse a huge list of meetups" />
            </Head>

            <h1> Page working</h1>
            <button onClick={getStreams}>Click</button>
        </>
    );
};

export default HomePage;
