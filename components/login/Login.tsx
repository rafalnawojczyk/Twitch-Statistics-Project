import Link from "next/link";
import { useState } from "react";
import styles from "./Login.module.scss";
import LoginForm from "./LoginForm";

const Login: React.FC<{ signup: boolean }> = props => {
    let titleText = "Login to your account and stay tuned!";
    if (props.signup) titleText = "Signup now to gain lots of new possibilites!";

    return (
        <div className={styles.login}>
            <div className={styles.login__description}>
                <h1>{titleText}</h1>
            </div>
            <div className={styles.login__box}>
                <h1>{props.signup ? "30 days free trial" : "Welcome back"}</h1>
                <p>
                    {props.signup
                        ? "Register now to get 30 days free trial!"
                        : "Welcome back! Please enter your details."}
                </p>
                <LoginForm signup={props.signup} />
                {!props.signup && <Link href="/login/signup">Doesnt have an account? Sign up</Link>}
            </div>
        </div>
    );
};

export default Login;
