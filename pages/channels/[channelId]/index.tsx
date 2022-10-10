import { GetStaticProps } from "next";

const ChannelPage: React.FC<{ channelId: string }> = props => {
    return (
        <h1>
            Channels page for <p>{props.channelId}</p>
        </h1>
    );
};

export default ChannelPage;

export const getStaticProps: GetStaticProps = async context => {
    const channelId = context.params!.channelId;

    return {
        props: {
            channelId,
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
