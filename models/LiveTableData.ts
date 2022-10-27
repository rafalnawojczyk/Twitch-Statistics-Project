export default interface LiveTableData {
    live: boolean;
    title: string;
    subtitle: string;
    type: "activeChannels" | "activeGames" | "topChannels";
    stats: {
        title: string;
        id: string;
        language?: string;
        followers?: number;
        viewers: number;
        image: string;
        streamTitle?: string;
        profileImg?: string;
        broadcasterType?: "partner" | "affiliate" | "";
        createdAt?: string;
        description?: string;
    }[];
}
