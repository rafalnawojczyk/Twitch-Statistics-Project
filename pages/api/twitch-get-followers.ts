import { NextApiRequest, NextApiResponse } from "next";
import { GET_USER_FOLLOWERS_API_URL } from "../../config";
import DataFromStreamsApi from "../../models/DataFromStreamsApi";
import TwitchGetFollowersResponse from "../../models/TwitchGetFollowersResponse";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") return;

    const requestData: { authorization: string; topChannels: DataFromStreamsApi[] } = JSON.parse(
        req.body
    );

    const newChannels = [...requestData.topChannels];

    newChannels.map(async el => {
        const url = `${GET_USER_FOLLOWERS_API_URL!}to_id=${el.userId}`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                authorization: requestData.authorization,
                "Client-Id": process.env.TWITCH_CLIENT_ID!,
            },
        });

        const data: TwitchGetFollowersResponse = await response.json();

        return { ...el, followers: data.total };
    });

    // set status on response
    res.status(201).json({ data: newChannels });
};

export default handler;
