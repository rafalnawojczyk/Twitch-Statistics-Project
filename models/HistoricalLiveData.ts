export default interface HistoricalLiveData {
    activeGames: {
        title: string;
        id: string;
        language?: string;
        followers?: number;
        viewers: number;
        image: string;
    }[][];
    activeChannels: {
        title: string;
        id: string;
        language?: string;
        followers?: number;
        viewers: number;
        image: string;
    }[][];
}
