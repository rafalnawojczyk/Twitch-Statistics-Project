export default interface LiveBarStats {
    value: number;
    title:
        | "Viewers now"
        | "Channels now"
        | "Games being streamed"
        | "Total streamers"
        | "Peak online viewers"
        | "Peak online channels";
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
