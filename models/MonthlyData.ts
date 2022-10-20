export default interface MonthlyData {
    [key: number]: {
        activeChannels: number;
        peakViewers: number;
        peakChannels: number;
        avgViewers: number;
        avgChannels: number;
        hoursWatched: number;
        gamesStreamed: number;
    }[];
}
