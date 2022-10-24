export default interface LanguageStats {
    title: string;
    langCode: string;
    averageViewers: number;
    averageChannels: number;
    chartData: {
        name: string;
        value: number;
        channels: number;
    }[];
}
