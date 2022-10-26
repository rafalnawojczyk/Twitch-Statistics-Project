import { MAX_TOP_LIVE_CHANNELS } from "../../config";
import LiveTableData from "../../models/LiveTableData";

const LiveTopChannels: React.FC<{ data: LiveTableData }> = ({ data }) => {
    const channelsList = data.stats;
    channelsList.length =
        channelsList.length > MAX_TOP_LIVE_CHANNELS ? channelsList.length : MAX_TOP_LIVE_CHANNELS;

    return <></>;
};

export default LiveTopChannels;
