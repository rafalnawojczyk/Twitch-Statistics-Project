import { NextApiRequest, NextApiResponse } from "next";
import { FIREBASE_LOGIN_URL, FIREBASE_SINGUP_URL } from "../../config";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "GET") return;
    const { isLogin, email, password } = JSON.parse(req.body);

    const firebaseLogin = async () => {
        let url: string;

        if (isLogin) {
            url = `${FIREBASE_LOGIN_URL}${process.env.FIREBASE_KEY}`;
        } else {
            url = `${FIREBASE_SINGUP_URL}${process.env.FIREBASE_KEY}`;
        }

        const firebaseResponse = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!firebaseResponse.ok) {
            throw new Error("Authentication failed.");
        }

        const authData = await firebaseResponse.json();
    };

    // set status on response
    res.status(201).json({
        ok: true,
        from: "homepageData",
        data: {},
    });
};

export default handler;
