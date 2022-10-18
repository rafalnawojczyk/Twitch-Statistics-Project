const LiveIndicator: React.FC<{ className?: string }> = props => {
    return (
        <svg
            className={props.className}
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle cx="8" cy="8" r="5" fill="#FF574C" stroke="#16161B" stroke-width="2"></circle>
            <circle cx="8" cy="8" r="8" fill="#FF574C" fill-opacity="0.25"></circle>
        </svg>
    );
};

export default LiveIndicator;
