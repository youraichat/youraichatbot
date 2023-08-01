import React, {FC, useEffect, useState} from 'react';
import {Box, Button, Fade, IconButton, InputAdornment, Modal, Stack, TextField, Typography} from "@mui/material";
import {CloseOutlined, Visibility, VisibilityOff} from "@mui/icons-material";
import {updateUserApi} from "@/api";

interface Props {
    open: boolean;
    user: any;
    setOpen: (val: boolean) => void;
    refresh: () => void;
}

const EditUser: FC<Props> = (props) => {
    const {open, setOpen, user, refresh} = props;

    const [email, setEmail] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [id, setId] = useState("");
    const [show, setShow] = useState<boolean>(false);

    const submitHandle = async () => {
        const payload = {
            email,
            firstname,
            lastname,
            id
        }

        const user = await updateUserApi(payload);

        refresh();
        setOpen(false);
    }

    useEffect(()=>{
        setId(user?.id);
        setEmail(user?.email)
        setFirstname(user?.firstname);
        setLastname(user?.lastname);
    },[user])

    return (
        <Modal open={open}>
            <Fade in={open}>
                <Box sx={style}>
                    <IconButton
                        onClick={()=>{setOpen(false)}}
                        sx={{position: "absolute", top: 20, right: 24}}>
                        <CloseOutlined/>
                    </IconButton>
                    <Stack spacing={0}>
                        <Typography
                            pl={2}
                            pb={2}
                            variant="h1"
                            fontSize="24px"
                            fontWeight="700"
                            textAlign="left">
                            Create New User
                        </Typography>
                        <Stack spacing={2}>
                            <TextField
                                id="email"
                                name="email"
                                placeholder="Email @ "
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                }}
                                InputProps={{
                                    sx: {borderRadius: "10px"},
                                    type: "text",
                                }}
                                fullWidth/>
                            <TextField
                                id="firstname"
                                name="firstname"
                                placeholder="First Name @ "
                                value={firstname}
                                onChange={(e) => {
                                    setFirstname(e.target.value)
                                }}
                                InputProps={{
                                    sx: {borderRadius: "10px"},
                                    type: "text",
                                }}
                                fullWidth/>
                            <TextField
                                id="lastname"
                                name="lastname"
                                placeholder="Last Name @ "
                                value={lastname}
                                onChange={(e) => {
                                    setLastname(e.target.value)
                                }}
                                InputProps={{
                                    sx: {borderRadius: "10px"},
                                    type: "text",
                                }}
                                fullWidth/>

                            <Button
                                disabled={!(
                                    user?.firstname !== firstname ||
                                    user?.lastname !== lastname ||
                                    user?.email !== email
                                )}
                                onClick={submitHandle}
                                variant="contained"
                                size="large">
                                Update User
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Fade>
        </Modal>
    );
};



const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    maxWidth: 650,
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 24,
    borderRadius: "12px",
    p: 4,
};

export default EditUser;