import Link from "next/link";
import React from "react";

type Props = {
    href: string;
    label: string;
};

const TagChip = (props: Props) => {
    return (
        <Link href={props.href} className="bg-[#BA1D41] text-xs font-semibold text-white px-4 py-1.5 rounded-[3px] -skew-x-[25deg]">
            <span className="block skew-x-[26deg]">{props.label}</span>
        </Link>
    );
};

export default TagChip;
