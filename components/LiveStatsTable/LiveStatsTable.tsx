import Card from "../layout/Card";
import LiveStatsTitle from "./LiveStatsTitle";
import styles from "./LiveStatsTable.module.scss";
import { DUMMY_LIVE_TABLE_DATA } from "../../config";
import StatsListItem from "./StatsListItem";
import StatsTitle from "../StatsByMonth/StatsTitle";

import Button from "../ui/Button";
import { useRouter } from "next/router";
import LiveIndicator from "../layout/svg/LiveIndicator";

const LiveStatsTable = () => {
    const data = DUMMY_LIVE_TABLE_DATA.activeChannels;
    const maxValue = Math.max(...data.stats.map(stats => stats.viewers));
    const router = useRouter();

    const clickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const url = data.type === "activeGames" ? "/games" : "/channels";

        router.push(`${url}`);
    };

    return (
        <div className={styles.wrapper}>
            <StatsTitle
                title="Top LIVE Channels"
                icon={
                    <Card className={styles.stats__icon}>
                        <LiveIndicator />
                    </Card>
                }
            />

            <Card className={styles.stats}>
                <LiveStatsTitle title={data.title} subtitle={data.subtitle} />
                <ul className={styles.stats__list}>
                    {data.stats.map(stats => (
                        <StatsListItem
                            key={Math.random()}
                            maxValue={maxValue}
                            type={data.type}
                            data={stats}
                        />
                    ))}
                </ul>
                <Button type="button" onClick={clickHandler} className={styles.stats__button}>
                    Go to full table
                </Button>
            </Card>
        </div>
    );
};

export default LiveStatsTable;

// title:string,
