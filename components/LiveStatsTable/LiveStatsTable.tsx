import Card from "../layout/Card";
import LiveStatsTitle from "./LiveStatsTitle";
import styles from "./LiveStatsTable.module.scss";
import StatsListItem from "./StatsListItem";
import StatsTitle from "../StatsByMonth/StatsTitle";

import Button from "../ui/Button";
import { useRouter } from "next/router";
import LiveIndicator from "../layout/svg/LiveIndicator";
import LiveTableData from "../../models/LiveTableData";

const LiveStatsTable: React.FC<{ data: LiveTableData }> = props => {
    const { data } = props;

    const maxValue = Math.max(...data.stats.map(stats => stats.viewers));

    const router = useRouter();
    const url = data.type === "activeGames" ? "/games" : "/channels";

    const clickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        router.push(`${url}`);
    };

    return (
        <div className={styles.wrapper}>
            <StatsTitle
                title={`Top ${data.live ? "LIVE " : ""}${data.title}`}
                icon={
                    <Card className={styles.stats__icon}>
                        <LiveIndicator />
                    </Card>
                }
            />

            <Card className={styles.stats}>
                <LiveStatsTitle title={data.title} subtitle={data.subtitle} />
                <ul className={styles.stats__list}>
                    {data.stats.slice(0, 5).map(stats => {
                        return (
                            <StatsListItem
                                key={Math.random()}
                                maxValue={maxValue}
                                type={data.type}
                                data={stats}
                                url={`${url}/`}
                            />
                        );
                    })}
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
