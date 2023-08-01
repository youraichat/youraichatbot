import React from 'react';
import {NextPage} from "next";
import {AppLayout} from "@/layouts";
import DocList from "@/components/shared/docs/list";
import {SeoProps} from "@/utils/types/layout.type";

const pageSeo: SeoProps = {
    title: "Documents Management"
}

const DocsPage: NextPage = () => {
    return (
        <AppLayout seo={pageSeo}>
            {/*<DocList/>*/}
        </AppLayout>
    );
};

export default DocsPage;