const Arrow: React.FC<{ className: string }> = props => {
    return (
        <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="currentColor"
            className={props.className}
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs></defs>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M 12.492 19.215 L 6.373 19.215 C 3.767 19.215 2.461 16.081 4.303 14.247 L 16.312 2.301 C 17.957 0.664 20.625 0.664 22.273 2.301 L 34.279 14.247 C 36.124 16.081 34.818 19.215 32.211 19.215 L 25.957 19.215 L 25.957 29.157 L 25.957 37.142 C 25.957 38.026 25.236 38.741 24.348 38.741 L 14.097 38.741 C 13.212 38.741 12.492 38.026 12.492 37.142 L 12.492 29.157 L 12.492 19.215 Z"
                fill="currentColor"
            ></path>
        </svg>
    );
};

export default Arrow;
