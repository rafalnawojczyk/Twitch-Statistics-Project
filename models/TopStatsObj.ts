import Stats from "./Stats";

class TopStatsObj {
    statistics: Stats[];
    totalViewers: number;

    constructor(statistics: Stats[], totalViewers: number) {
        this.statistics = statistics;
        this.totalViewers = totalViewers;
    }
}

export default TopStatsObj;
