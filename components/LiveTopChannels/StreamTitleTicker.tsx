import Ticker from "react-ticker";

const StreamTitleTicker: React.FC<{ title: string; className: string }> = props => {
    return (
        <Ticker>
            {({ index }) => (
                <div className={props.className}>
                    <span>{props.title}</span>
                </div>
            )}
        </Ticker>
    );
};

export default StreamTitleTicker;
