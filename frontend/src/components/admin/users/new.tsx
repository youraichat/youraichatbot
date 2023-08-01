import React, {FC, useState} from 'react';
import {Box, Button, Fade, IconButton, InputAdornment, Modal, Stack, TextField, Typography} from "@mui/material";
import {CloseOutlined, Visibility, VisibilityOff} from "@mui/icons-material";
import {createUserApi} from "@/api";

interface Props {
    open: boolean;
    setOpen: (value: boolean) => void;
    refresh: () => void;
}

const NewUser: FC<Props> = (props) => {
    const {open, setOpen, refresh} = props;

    const [email, setEmail] = useState<string>("");
    const [firstname, setFirstname] = useState<string>("");
    const [lastname, setLastname] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [show, setShow] = useState<boolean>(false);
    const [err, setErr] = useState("");


    const createHandle = async () => {
        try {
            const payload = {
                firstname,
                lastname,
                email,
                password
            }

            const newUser = await createUserApi(payload);

            setOpen(false);
            refresh()
        } catch (e) {
            console.warn(e);
            setErr("This email address is used already!")
        }
    }

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
                            <TextField
                                id="password"
                                name="password"
                                placeholder="Password @ "
                                value={password}
                                onChange={(e)=>{setPassword(e.target.value)}}
                                InputProps={{
                                    sx: {borderRadius: "10px"},
                                    type: show ? "text" : "password",
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={()=>{setShow(!show)}}>
                                                {
                                                    show ?
                                                        <VisibilityOff/>:
                                                        <Visibility/>
                                                }
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                                fullWidth/>

                            {
                                err && <Typography
                                    px={2}
                                    fontWeight={600}
                                    color="error">
                                    {err}
                                </Typography>
                            }

                            <Button
                                onClick={createHandle}
                                variant="contained"
                                size="large">
                                Create User
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

export default NewUser;