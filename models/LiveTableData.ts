export default interface LiveTableData {
    live: boolean;
    title: string;
    subtitle: string;
    type: "activeChannels" | "activeGames" | "topChannels";
    stats: {
        title: string;
        language: string;
        followers: number;
        viewers: number;
        image: string;
    }[];
}
