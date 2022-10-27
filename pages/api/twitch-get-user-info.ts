import { NextApiRequest, NextApiResponse } from "next";
import { GET_USER_INFO_URL } from "../../config";
import TwitchGetUsersResponse from "../../models/TwitchGetUsersResponse";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") return;

    const requestData: { authorization: string; idList: string[] } = JSON.parse(req.body);

    const url = `${GET_USER_INFO_URL!}${requestData.idList.map(id => `&id=${id}`).join("")}`;

    const response = await fetch(url, {
        method: "GET",
        headers: {
            authorization: requestData.authorization,
            "Client-Id": process.env.TWITCH_CLIENT_ID!,
        },
    });

    const data: TwitchGetUsersResponse = await response.json();

    // set status on response
    res.status(201).json({ data });
};

export default handler;
