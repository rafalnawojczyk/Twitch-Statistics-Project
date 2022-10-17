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
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M 11.201 22.148 L 8.417 22.148 C 6.288 22.148 5.222 19.589 6.726 18.091 L 16.534 8.334 C 17.878 6.997 20.057 6.997 21.403 8.334 L 31.209 18.091 C 32.716 19.589 31.649 22.148 29.52 22.148 L 26.941 22.148 L 26.941 30.268 L 26.941 36.79 C 26.941 37.512 26.352 38.096 25.627 38.096 L 12.512 38.096 C 11.789 38.096 11.201 37.512 11.201 36.79 L 11.201 30.268 L 11.201 22.148 Z"
                fill="currentColor"
            ></path>
        </svg>
    );
};

export default Arrow;
