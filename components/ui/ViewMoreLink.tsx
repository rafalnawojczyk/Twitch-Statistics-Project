import Link from "next/link";

import ViewMore from "./ViewMore";

type ViewMoreLinkProps = { href: string };

const ViewMoreLink = ({ href }: ViewMoreLinkProps) => {
    return (
        <Link href={href} passHref>
            <ViewMore />
        </Link>
    );
};

export default ViewMoreLink;
