import Card from "../layout/Card";
import LiveStatsTitle from "./LiveStatsTitle";
import styles from "./LiveStatsTable.module.scss";
import { DUMMY_LIVE_TABLE_DATA } from "../../config";
import StatsListItem from "./StatsListItem";

const LiveStatsTable = () => {
    const data = DUMMY_LIVE_TABLE_DATA.activeChannels;
    const maxValue = Math.max(...data.stats.map(stats => stats.viewers));

    return (
        <Card className={styles.stats}>
            <LiveStatsTitle title={data.title} subtitle={data.subtitle} />
            <ul className={styles.stats__list}>
                {data.stats.map(stats => (
                    <StatsListItem maxValue={maxValue} type={data.type} data={stats} />
                ))}
            </ul>
        </Card>
    );
};

export default LiveStatsTable;

// title:string,
