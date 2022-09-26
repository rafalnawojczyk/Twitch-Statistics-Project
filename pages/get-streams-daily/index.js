const GetDailyStreams = props => {
    return <p>{props.message}</p>;
};

export async function getServerSideProps() {
    try {
        const response = await fetch(`${process.env.SERVER}api/twitch-daily-statistics`, {
            method: "POST",
        });

        return {
            props: {
                message: "Daily stats parsed",
            },
        };
    } catch (err) {
        console.log(err);
        return {
            props: {
                message: "Daily stats parsing failed",
            },
        };
    }
}

export default GetDailyStreams;
