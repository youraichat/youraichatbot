import React, {FC, useState} from 'react';
import {registerApi, resetPasswordApi} from "@/api";
import {Button, Divider, IconButton, InputAdornment, Stack, TextField, Typography} from "@mui/material";
import {ArrowBack, Visibility, VisibilityOff} from "@mui/icons-material";
import {AuthMode} from "@/components/admin/auth";
import {useRouter} from "next/router";

interface Props {
    setMode: (val: AuthMode) => void;
}


const AdminReset: FC<Props> = (props) => {
    const {setMode} = props;

    const router = useRouter();
    const {mode, token} = router.query;

    const [password, setPassword] = useState<string>("");
    const [passwordConfirm, setPasswordConfirm] = useState<string>("");
    const [show, setShow] = useState<boolean>(false);
    const [confirmShow, setConfirmShow] = useState<boolean>(false);
    const [error, setError] = useState<string>("");


    const resetHandle = async () => {
        try {
            const payload = {
                password
            }

            const {data} = await resetPasswordApi(token?.toString() || "", password);

            if(data.success) {
                setMode("login")
            }
        } catch (e) {
            console.warn(e)
        }
    }


    return (
        <Stack>
            <Typography
                pb={2}
                variant="h1"
                fontSize="24px"
                fontWeight="700"
                textAlign="left">
                <IconButton
                    onClick={()=>{setMode("login")}}
                    sx={{mr: 2}}>
                    <ArrowBack/>
                </IconButton>
                Reset your password?
            </Typography>
            <Stack spacing={2}>
                <TextField
                    id="password"
                    name="password"
                    placeholder="New Password @ "
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
                    onClick={resetHandle}
                    id="submit"
                    name="submit"
                    sx={{height: 56}}
                    size="large"
                    color="primary"
                    variant="contained">
                    Sign Up
                </Button>
            </Stack>
        </Stack>
    );
};

export default AdminReset;