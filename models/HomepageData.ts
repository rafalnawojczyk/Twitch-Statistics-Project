import AreaChartData from "./AreaChartData";
import LanguageStats from "./LanguageStats";
import LiveBarStats from "./LiveBarStats";
import LiveTableData from "./LiveTableData";
import MonthlyData from "./MonthlyData";

export default interface HomepageData {
    languageStats: LanguageStats[];
    liveStats: {
        activeChannels: LiveTableData;
        activeGames: LiveTableData;
        topChannels: LiveTableData;
    };
    areaCharts: {
        viewers: AreaChartData[];
        channels: AreaChartData[];
        games: AreaChartData[];
    };
    liveBar: LiveBarStats[];
    monthlyOverview: MonthlyData;
    maxMonthlyOverview: MonthlyData;
}
