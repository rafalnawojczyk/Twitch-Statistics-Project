import { GetStaticProps } from "next";

const GamePage: React.FC<{ gameId: string }> = props => {
    return (
        <h1>
            Game page for <p>{props.gameId}</p>
        </h1>
    );
};

export default GamePage;

export const getStaticProps: GetStaticProps = async context => {
    const gameId = context.params!.gameId;

    return {
        props: {
            gameId,
        },
        revalidate: 3600,
    };
};

export async function getStaticPaths() {
    return {
        fallback: true,
        paths: [],
    };
}
