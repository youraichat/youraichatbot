import React, {FC, useState} from 'react';
import {
    Button,
    Checkbox, Divider,
    FormControlLabel,
    IconButton,
    InputAdornment,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {registerApi} from "@/api";
import {AuthMode} from "@/components/admin/auth";

interface Props {
    setMode: (val: AuthMode) => void;
}


const AdminRegister: FC<Props> = (props) => {
    const {setMode} = props;


    const [firstname, setFirstname] = useState<string>("");
    const [lastname, setLastname] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordConfirm, setPasswordConfirm] = useState<string>("");
    const [show, setShow] = useState<boolean>(false);
    const [confirmShow, setConfirmShow] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const registerHandle = async () => {
        try {
            const payload = {
                firstname,
                lastname,
                email,
                password
            }

            const {data} = await registerApi(payload);

            if(data.success) {
                setMode("register-success")
            }
        } catch (e) {
            console.warn(e)
        }
    }


    return (
        <Stack>
            <Typography
                pl={2}
                pb={2}
                variant="h1"
                fontSize="24px"
                fontWeight="700"
                textAlign="left">
                Register to YourAIChat!
            </Typography>
            <Stack
                spacing={2}>
                <TextField
                    id="firstname"
                    name="firstname"
                    placeholder="Your First Name @ "
                    value={firstname}
                    onChange={(e)=>{setFirstname(e.target.value)}}
                    InputProps={{
                        sx: {borderRadius: "10px"},
                        type: "text",
                    }}
                    fullWidth/>
                <TextField
                    id="lastname"
                    name="lastname"
                    placeholder="Your Last Name @ "
                    value={lastname}
                    onChange={(e)=>{setLastname(e.target.value)}}
                    InputProps={{
                        sx: {borderRadius: "10px"},
                        type: "text",
                    }}
                    fullWidth/>
                <TextField
                    id="email"
                    name="email"
                    placeholder="Email @"
                    value={email}
                    onChange={(e)=>{setEmail(e.target.value)}}
                    InputProps={{
                        sx: {borderRadius: "10px"},
                        type: "text",
                    }}
                    fullWidth/>
                <TextField
                    id="password"
                    name="password"
                    placeholder="Your Password @ "
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

                <TextField
                    id="password-confirm"
                    name="password-confirm"
                    placeholder="Password Confirm @ "
                    value={passwordConfirm}
                    onChange={(e)=>{setPasswordConfirm(e.target.value)}}
                    InputProps={{
                        sx: {borderRadius: "10px"},
                        type: confirmShow ? "text" : "password",
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={()=>{setConfirmShow(!show)}}>
                                    {
                                        confirmShow ?
                                            <VisibilityOff/>:
                                            <Visibility/>
                                    }
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                    fullWidth/>

                <Button
                    onClick={registerHandle}
                    id="submit"
                    name="submit"
                    sx={{height: 56}}
                    size="large"
                    color="primary"
                    variant="contained">
                    Sign Up
                </Button>
                <Divider>Do you have an account already?</Divider>
                <Button
                    onClick={()=>{setMode("login")}}
                    id="submit"
                    name="submit"
                    type="submit"
                    sx={{height: 56}}
                    size="large"
                    color="info"
                    variant="outlined">
                    Sign In
                </Button>
            </Stack>
        </Stack>
    );
};

export default AdminRegister;