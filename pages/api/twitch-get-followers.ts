import { NextApiRequest, NextApiResponse } from "next";
import { GET_USER_FOLLOWERS_API_URL } from "../../config";
import DataFromStreamsApi from "../../models/DataFromStreamsApi";
import TwitchGetFollowersResponse from "../../models/TwitchGetFollowersResponse";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") return;

    const requestData: { authorization: string; topChannels: DataFromStreamsApi[] } =
        await JSON.parse(req.body);

    const newChannels = [...requestData.topChannels];
    const updatedChannels = [];

    for (let i = 0; i < newChannels.length; i++) {
        const url = `${GET_USER_FOLLOWERS_API_URL!}to_id=${newChannels[i].userId}`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                authorization: requestData.authorization,
                "Client-Id": process.env.TWITCH_CLIENT_ID!,
            },
        });

        const data: TwitchGetFollowersResponse = await response.json();

        const finalData = { ...newChannels[i], followers: data.total };

        updatedChannels.push(finalData);
    }

    // set status on response
    res.status(201).json({ data: updatedChannels });
};

export default handler;
