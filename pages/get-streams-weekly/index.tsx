import { SERVER } from "../../config";

const GetWeeklyStreams: React.FC<{ message: string }> = props => {
    return <p>{props.message}</p>;
};

export async function getServerSideProps() {
    try {
        const response = await fetch(`${SERVER}api/twitch-weekly-statistics`, {
            method: "POST",
        });

        return {
            props: {
                message: "Weekly stats parsed",
            },
        };
    } catch (err) {
        console.log(err);
        return {
            props: {
                message: "Weekly stats parsing failed",
            },
        };
    }
}

export default GetWeeklyStreams;
