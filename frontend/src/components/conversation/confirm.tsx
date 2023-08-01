import React, {FC} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {DeleteOutlined} from "@mui/icons-material";

interface Props {
    open: boolean;
    callback: (value: boolean) => void;
    title: string;
    description: string;
}

const DeleteConformation: FC<Props> = (props) => {
    const { open, callback, title, description } = props;

    const handleConfirm = () => {
        callback(true);
    }

    const handleCancel = () => {
        callback(false)
    }

    return (
        <Dialog
            BackdropProps={{
                style: {
                    background: "rgba(59,59,73,0.63)",
                    backdropFilter: "blur(4px)"
                }
            }}
            PaperProps={{
                style: {
                    width: 500,
                    borderRadius: 12,
                },
                sx: {
                    bg: "background.paper",
                    backgroundImage: "none"
                }
            }}
            open={open}>
            <DialogTitle>{title  || "Delete all chat history"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    {description || "Are you sure to delete all conversation history?"}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    disableElevation
                    sx={{my: 1, minWidth: 100}}
                    startIcon={<DeleteOutlined/>}
                    onClick={handleConfirm}
                    variant="contained"
                    color="error"
                    autoFocus>
                    Yes, Delete
                </Button>
                <Button
                    variant="outlined"
                    sx={{my: 1, ml: 1, mr: 2, minWidth: 100}}
                    color="info"
                    onClick={handleCancel}>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteConformation;