import MeetupList from "../components/meetups/MeetupList";
import Head from "next/head";

const HomePage = props => {
    return (
        <>
            <Head>
                <title>React Meetups</title>
                <meta name="description" content="Browse a huge list of meetups" />
            </Head>
            <MeetupList meetups={props.meetups} />
        </>
    );
};

export async function getStaticProps() {
    const response = await fetch("api/twitch-api");

    return {
        props: {},
        revalidate: 10,
    };
}

export default HomePage;
