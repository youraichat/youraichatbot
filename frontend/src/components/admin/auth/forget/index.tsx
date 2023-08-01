import React, {FC, useState} from 'react';
import {
    Button,
    IconButton,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {ArrowBack} from "@mui/icons-material";
import {forgetPasswordApi} from "@/api";

interface Props {
    setMode: (val: 'register' | "login" | "reset" | "forget") => void;
}


const AdminForget: FC<Props> = (props) => {
    const {setMode} = props;
    const [email, setEmail] = useState("");

    const forgetHandle = async () => {
        const {data} = await forgetPasswordApi(email);

        setMode("login")
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
                Forgot your password?
            </Typography>
            <Stack
                spacing={3}>
                <TextField
                    id="email"
                    name="email"
                    placeholder="Your Email @ "
                    value={email}
                    onChange={(e)=>{setEmail(e.target.value)}}
                    InputProps={{
                        sx: {borderRadius: "10px"},
                        type: "text",
                    }}
                    fullWidth/>
                <Button
                    disabled={!email}
                    id="submit"
                    name="submit"
                    type="submit"
                    onClick={forgetHandle}
                    sx={{height: 56}}
                    size="large"
                    color="primary"
                    variant="contained">
                    Send Reset Link
                </Button>
            </Stack>
        </Stack>
    );
};

export default AdminForget;