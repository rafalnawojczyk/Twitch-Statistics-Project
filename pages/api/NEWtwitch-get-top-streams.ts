import { NextApiRequest, NextApiResponse } from "next";
import { MIN_VIEWIERS_AMOUNT } from "../../config";
import DataFromStreamsApi from "../../models/DataFromStreamsApi";
import TwitchGetStreamsResponse from "../../models/TwitchGetStreamsResponse";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") return;

    const requestData: { authorization: string } = JSON.parse(req.body);

    const streamsData: DataFromStreamsApi[] = [];
    let pagination = "";
    let shouldFetch = true;

    while (shouldFetch) {
        let url = process.env.GET_STREAMS_API_URL!;
        if (pagination.length !== 0) url = `${process.env.GET_STREAMS_API_URL}&after=${pagination}`;

        const response = await fetch(url, {
            method: "GET",
            headers: {
                authorization: requestData.authorization,
                "Client-Id": process.env.TWITCH_CLIENT_ID!,
            },
        });
        const data: { data: TwitchGetStreamsResponse[]; pagination: { cursor: string } } =
            await response.json();

        const typedData: DataFromStreamsApi[] = data.data.map(el => ({
            userId: el.user_id,
            userLogin: el.user_login,
            userName: el.user_name,
            gameName: el.game_name,
            title: el.title,
            viewerCount: el.viewer_count,
            language: el.language,
            imageUrl: el.thumbnail_url,
        }));

        streamsData.push(...typedData);
        pagination = data.pagination.cursor;

        if (data.data[0].viewer_count <= MIN_VIEWIERS_AMOUNT) shouldFetch = false;
    }

    // set status on response
    res.status(201).json({ streamsData });
};

export default handler;
