import { GetStaticProps } from "next";

type GamePageProps = { gameId: string };

const GamePage = ({ gameId }: GamePageProps) => {
    return (
        <h1>
            Game page for <p>{gameId}</p>
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
