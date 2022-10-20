import PieChart from "../charts/PieChart";
import { DUMMY_LANGUAGE_DATA } from "../../config";
import BarChart from "../charts/BarChart";
import Card from "../layout/Card";
import StatsLabel from "../StatsByMonth/StatsLabel";
import StatsTitle from "../StatsByMonth/StatsTitle";
import styles from "./LanguageStatsTable.module.scss";

const LanguageStatsTable = () => {
    const data = DUMMY_LANGUAGE_DATA;

    return (
        <div>
            <StatsTitle title="Twitch stats by month" />
            <Card className={styles.stats}>
                <div className={styles.stats__grid}>
                    <StatsLabel title="Language" upperTitle={true} className={styles.left} />
                    <StatsLabel
                        className={styles.center}
                        title="Average concurrent \n viewers chart"
                        upperTitle={true}
                    />
                    <StatsLabel title="Average concurrent Viewers" upperTitle={true} />
                    <StatsLabel title="Average concurrent Channels" upperTitle={true} />
                </div>

                {data.map(lang => {
                    return (
                        <div className={styles.stats__grid} key={lang.title}>
                            <StatsLabel title={lang.title} className={styles.left} />
                            <BarChart />
                            <p className={styles.stats__value}>
                                {lang.averageViewers.toLocaleString()}
                            </p>
                            <p className={styles.stats__value}>
                                {lang.averageChannels.toLocaleString()}
                            </p>
                        </div>
                    );
                })}
                <div className={styles.stats__charts}>
                    <PieChart />
                    <PieChart />
                </div>
            </Card>
        </div>
    );
};

export default LanguageStatsTable;
