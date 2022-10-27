const GameIcon: React.FC<{ className: string }> = props => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20"
            width="20"
            className={props.className}
            fill="currentColor"
        >
            <path d="M3.917 15q-.917 0-1.49-.698t-.406-1.594l1.187-6.187q.167-.875.854-1.448Q4.75 4.5 5.667 4.5h8.666q.917 0 1.605.573.687.573.854 1.469l1.187 6.187q.167.896-.417 1.583-.583.688-1.5.688-.333 0-.645-.094-.313-.094-.542-.323L12.896 13H7.104l-1.979 1.583q-.229.229-.552.323Q4.25 15 3.917 15Zm.271-1.583L6.562 11.5h6.876l2.374 1.917q.021.021.25.104.209 0 .344-.156.136-.157.094-.365l-1.188-6.188q-.062-.354-.343-.583Q14.688 6 14.333 6H5.667q-.355 0-.636.229t-.343.583L3.5 13q-.042.208.083.365.125.156.313.156.062 0 .292-.104ZM13.75 10.5q.312 0 .531-.219.219-.219.219-.531 0-.312-.219-.531Q14.062 9 13.75 9q-.312 0-.531.219Q13 9.438 13 9.75q0 .312.219.531.219.219.531.219Zm-1.5-2q.312 0 .531-.219Q13 8.062 13 7.75q0-.312-.219-.531Q12.562 7 12.25 7q-.312 0-.531.219-.219.219-.219.531 0 .312.219.531.219.219.531.219ZM7 10.5h1V9.25h1.25v-1H8V7H7v1.25H5.75v1H7Zm3.021-.5Z" />
        </svg>
    );
};

export default GameIcon;