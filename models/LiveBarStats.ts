export default interface LiveBarStats {
    value: number;
    title: string;
    type:
        | "activeViewers"
        | "activeChannels"
        | "gamesStreamed"
        | "peakViewers"
        | "peakChannels"
        | "totalChannels";
    live: boolean;
    date: string;
}
