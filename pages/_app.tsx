import { AuthContextProvider } from "context/auth-context";
import { AppProps } from "next/app";
import Footer from "../components/layout/footer/Footer";
import Layout from "../components/layout/Layout";
import Navigation from "../components/navigation/Navigation";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <AuthContextProvider>
                <Navigation />
                <Layout>
                    <Component {...pageProps} />
                </Layout>
                <Footer />
            </AuthContextProvider>
        </>
    );
}

export default MyApp;
