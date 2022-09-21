import Head from "next/head";

const HomePage = props => {
    console.log(props.wholeData);
    return (
        <>
            <Head>
                <title>React Meetups</title>
                <meta name="description" content="Browse a huge list of meetups" />
            </Head>

            <h1> Page working</h1>
        </>
    );
};

export default HomePage;
