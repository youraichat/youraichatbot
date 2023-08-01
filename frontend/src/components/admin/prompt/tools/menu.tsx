import React, {FC} from 'react';
import {styled} from "@mui/material/styles";
import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import {AddOutlined, AutoFixHigh, DeleteOutline} from "@mui/icons-material";

const actions = [
    {icon: <AddOutlined/>, name: 'Add'},
    {icon: <DeleteOutline/>, name: 'Delete'},
    {icon: <FileCopyIcon/>, name: 'Copy'},
    {icon: <SaveIcon/>, name: 'Save'},
    {icon: <PrintIcon/>, name: 'Print'},
];


const PromptMenu: FC = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return (
        <div>
            <Backdrop open={open}/>
            <SpeedDial
                direction="down"
                ariaLabel="SpeedDial tooltip example"
                sx={{position: 'absolute', top: 16, right: 16}}
                icon={<AutoFixHigh/>}
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}>
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        tooltipOpen
                        onClick={handleClose}
                    />
                ))}
            </SpeedDial>
        </div>
    );
};

const PromptMenuWrap = styled('div')(({theme}) => ({
    position: "absolute",
    background: theme.palette.background.paper,
    padding: 2,
    borderRadius: 8,
    display: "flex",
    flexDirection: "column",
    zIndex: 10,
    top: 20,
    right: 20,
    border: "1px solid #e0e0e0"
}))

export default PromptMenu;