const ExpandSvg: React.FC<{ className: string }> = props => {
    return (
        <svg
            className={props.className}
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            width="24"
        >
            <path d="m12 15.375-6-6 1.4-1.4 4.6 4.6 4.6-4.6 1.4 1.4Z" />
        </svg>
    );
};

export default ExpandSvg;