import { GetStaticProps } from "next";
import Login from "../../../components/login/Login";

type LoginPageProps = { operationType: "login" | "signup" };

const LoginPage = ({ operationType }: LoginPageProps) => {
    const signup = operationType === "signup";

    return <Login signup={signup} />;
};

export default LoginPage;

export const getStaticProps: GetStaticProps = async context => {
    let operationType = "login";

    if (context.params!.type === "signup") {
        operationType = "signup";
    }

    return {
        props: {
            operationType,
        },
        revalidate: 3600,
    };
};

export async function getStaticPaths() {
    return {
        fallback: true,
        paths: [
            {
                params: {
                    type: "signup",
                },
            },
            {
                params: {
                    type: "login",
                },
            },
        ],
    };
}
