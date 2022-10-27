// to_id=23161357'-

import { NextApiRequest, NextApiResponse } from "next";
import { GET_STREAMS_API_URL, GET_USER_FOLLOWERS_API_URL } from "../../config";
import DataFromStreamsApi from "../../models/DataFromStreamsApi";
import TwitchGetStreamsResponse from "../../models/TwitchGetStreamsResponse";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") return;

    const requestData: { authorization: string; topChannels: DataFromStreamsApi[] } = JSON.parse(
        req.body
    );

    let url = GET_USER_FOLLOWERS_API_URL!;

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
        gameId: el.game_id,
        title: el.title,
        viewerCount: el.viewer_count,
        language: el.language,
        imageUrl: el.thumbnail_url,
    }));

    // set status on response
    res.status(201).json({ streamsData });
};

export default handler;
