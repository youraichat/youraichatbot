import React, {FC} from 'react';
import {styled} from "@mui/material/styles";
import {IconButton} from "@mui/material";
import {AddOutlined, Fullscreen, Lock, LockOpen, RemoveOutlined} from "@mui/icons-material";

const PromptControls: FC = () => {
    return (
        <PromptControlsWrap>
            <IconButton>
                <AddOutlined/>
            </IconButton>
            <IconButton>
                <RemoveOutlined/>
            </IconButton>
            <IconButton>
                <Fullscreen/>
            </IconButton>
            <IconButton>
                <LockOpen/>
                {/*<Lock/>*/}
            </IconButton>
        </PromptControlsWrap>
    );
};


const PromptControlsWrap = styled('div')(({theme}) => ({
    position: "absolute",
    background: theme.palette.background.paper,
    padding: 2,
    borderRadius: 8,
    display: "flex",
    flexDirection: "column",
    zIndex: 10,
    bottom: 20,
    left: 20,
    border:"1px solid #e0e0e0"
}))

export default PromptControls;