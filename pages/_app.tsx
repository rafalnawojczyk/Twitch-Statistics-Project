import { AppProps } from "next/app";
import Head from "next/head";
import Footer from "../components/layout/footer/Footer";
import Layout from "../components/layout/Layout";
import Navigation from "../components/navigation/Navigation";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
                    rel="stylesheet"
                />
            </Head>

            <Navigation />
            <Layout>
                <Component {...pageProps} />
            </Layout>
            <Footer />
        </>
    );
}

export default MyApp;
