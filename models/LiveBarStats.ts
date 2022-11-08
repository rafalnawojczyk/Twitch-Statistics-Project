export default interface LiveBarStats {
    value: number;
    title:
        | "Viewers now"
        | "Channels now"
        | "Games now"
        | "Total streamers"
        | "Peak viewers"
        | "Peak channels";
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
