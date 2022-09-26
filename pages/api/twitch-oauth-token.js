import {} from "../../config";

const getOAuthToken = async (req, res) => {
    if (req.method !== "GET") return;

    const sendTokenRequest = async () => {
        const url = `${process.env.TWITCH_AUTH_API_URL}?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&grant_type=client_credentials`;

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });

        const data = await response.json();
        const finalData = {
            accessToken: data.access_token,
            tokenType: data.token_type,
        };
        return finalData;
    };

    try {
        const response = await sendTokenRequest();

        res.status(201).json({ data: response, ok: true, message: "Data updated succesfully" });
    } catch (err) {
        res.status(400).json({ ok: false });
    }
};

export default getOAuthToken;
