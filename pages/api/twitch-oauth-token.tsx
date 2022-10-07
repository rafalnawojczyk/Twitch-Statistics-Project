type AuthObjectType = { accessToken: string; tokenType: string };
type ResponseType = { data: AuthObjectType; ok: boolean; message: string };

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

        const authenticationObject: AuthObjectType = {
            accessToken: data.access_token,
            tokenType: data.token_type,
        };

        return authenticationObject;
    };

    try {
        const response: AuthObjectType = await sendTokenRequest();

        const responseObject: ResponseType = {
            data: response,
            ok: true,
            message: "Data updated succesfully",
        };

        res.status(201).json(responseObject);
    } catch (err) {
        res.status(400).json({ ok: false });
    }
};

export default getOAuthToken;
