import { NextApiRequest, NextApiResponse } from "next";
import { FIREBASE_LOGIN_URL, FIREBASE_SINGUP_URL } from "../../config";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") return;
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

        if (firebaseResponse.ok) {
            const authData = await firebaseResponse.json();

            return authData;
        }

        throw new Error("Authentication failed.");
    };

    let loginData;

    try {
        loginData = await firebaseLogin();
        res.status(201).json({
            ok: true,
            data: loginData,
        });
        // set status on response
    } catch (err: any) {
        console.log(err);
        res.status(201).json({
            ok: false,
            data: err.message,
        });
    }
};

export default handler;
