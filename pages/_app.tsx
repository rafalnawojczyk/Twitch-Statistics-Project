import { AppProps } from "next/app";
import Layout from "../components/layout/Layout";
import Navigation from "../components/navigation/Navigation";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Layout>
            <Navigation />
            <Component {...pageProps} />
        </Layout>
    );
}

export default MyApp;
