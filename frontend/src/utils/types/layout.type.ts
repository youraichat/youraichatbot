import React from "react";

export type SeoProps = {
    title?: string;
    ogTitle?: string;
    description?: string;
    image?: {
        url?: string;
        width?: string;
        height?: string;
    };
    keywords?: string[];
    url?: string;
}

export type LayoutType = {
    children?: React.ReactElement | React.ReactElement[] | string | undefined | any;
    seo?: SeoProps
}
