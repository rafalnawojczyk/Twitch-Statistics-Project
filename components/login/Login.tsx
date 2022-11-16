import { SERVER } from "config";
import AuthContext from "context/auth-context";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import styles from "./Login.module.scss";
import LoginForm from "./LoginForm";

type LoginProps = { signup: boolean };

const Login = ({ signup }: LoginProps) => {
    const authCtx = useContext(AuthContext);
    const router = useRouter();

    let titleText = "Login to your account and stay tuned!";
    if (signup) titleText = "Signup now to gain lots of new possibilites!";

    const authHandler = async (email: string, password: string) => {
        const authResponse = await fetch(`${SERVER}api/firebase-login`, {
            method: "POST",
            body: JSON.stringify({
                isLogin: !signup,
                email: email,
                password: password,
            }),
        });

        const authData = await authResponse.json();

        if (!authData.ok || (authData.data.error && authData.data.error.message)) {
            return authData.data.error.message;
        }

        const expirationTime = new Date(new Date().getTime() + +authData.data.expiresIn * 1000);
        authCtx.login(authData.data.idToken, expirationTime.toISOString());
        router.push("/");
    };

    return (
        <div className={styles.login}>
            <div className={styles.login__description}>
                <h1>{titleText}</h1>
            </div>
            <div className={styles.login__box}>
                <h1>{signup ? "30 days free trial" : "Welcome back"}</h1>
                <p>
                    {signup
                        ? "Register now to get 30 days free trial!"
                        : "Welcome back! Please enter your details."}
                </p>
                <LoginForm signup={signup} />
                {!signup && <Link href="/login/signup">Don't have an account? Sign up</Link>}
            </div>
        </div>
    );
};

export default Login;
