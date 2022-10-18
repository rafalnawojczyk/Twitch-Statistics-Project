import { DUMMY_LIVE_DATA } from "../../config";
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

const LiveStatisticsBar = () => {
    // TODO: Fetch from DB

    const data = DUMMY_LIVE_DATA;

    return (
        <Card className={styles["live-box"]}>
            {data.map(stats => {
                return (
                    <LiveStatsBox
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
