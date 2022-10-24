export default interface AreaChartData {
    name: string;
    actualValue: number;
    type: "Channels" | "Viewers" | "Games";
    previousValue: number;
}
