import { AppProps } from "next/app";
import Footer from "../components/layout/footer/Footer";
import Layout from "../components/layout/Layout";
import Navigation from "../components/navigation/Navigation";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Navigation />
            <Layout>
                <Component {...pageProps} />
            </Layout>
            <Footer />
        </>
    );
}

export default MyApp;
