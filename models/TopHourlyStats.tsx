import Stats from "./Stats";

class TopHourlyStats {
    hourlyGames: { statistics: Stats[]; totalViewers: number };
    hourlyChannels: { statistics: Stats[]; totalViewers: number };
    weeklyTop: { statistics: Stats[] };

    constructor(
        hourlyGames: { statistics: Stats[]; totalViewers: number },
        hourlyChannels: { statistics: Stats[]; totalViewers: number },
        weeklyTop: { statistics: Stats[] }
    ) {
        this.hourlyGames = hourlyGames;
        this.weeklyTop = weeklyTop;
        this.hourlyChannels = hourlyChannels;
    }
}

export default TopHourlyStats;
