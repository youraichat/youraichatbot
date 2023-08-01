import React, {FC, Fragment} from 'react';
import PromptControls from "./controls";
import PromptMenu from "./menu";

const PromptTools: FC = () => {
    return (
        <Fragment>
            <PromptControls/>
            <PromptMenu/>
        </Fragment>
    );
};

export default PromptTools;