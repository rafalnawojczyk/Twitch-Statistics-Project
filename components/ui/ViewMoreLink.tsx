import Link from "next/link";

import ViewMore from "./ViewMore";

const ViewMoreLink: React.FC<{ href: string }> = props => {
    return (
        <Link href={props.href} passHref>
            <ViewMore />
        </Link>
    );
};

export default ViewMoreLink;
