import LiveBarStats from "../../models/LiveBarStats";
import Card from "../layout/Card";
import styles from "./LiveStatisticsBar.module.scss";
import LiveStatsBox from "./LiveStatsBox";

type statsType =
    | "activeViewers"
    | "activeChannels"
    | "gamesStreamed"
    | "totalChannels"
    | "peakViewers"
    | "peakChannels";

const LiveStatisticsBar: React.FC<{ data: LiveBarStats[] }> = props => {
    const { data } = props;
    return (
        <Card className={styles["live-box"]}>
            {data.map(stats => {
                return (
                    <LiveStatsBox
                        key={stats.title}
                        title={stats.title}
                        live={stats.live}
                        value={stats.value}
                        type={stats.type as statsType}
                        date={stats.date}
                    />
                );
            })}
        </Card>
    );
};

export default LiveStatisticsBar;
