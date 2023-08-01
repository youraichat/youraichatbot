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
import {validateEmail, validatePassword} from "@/utils/libs/validate";
import {loginFx} from "@/model/auth/effect";

interface Props {
    setMode: (val: 'register' | "login" | "reset" | "forget") => void;
}

const AdminLogin: FC<Props> = (props) => {

    const {setMode} = props;

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [show, setShow] = useState<boolean>(false);
    const [remember, setRemember] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    const loginHandle = async () => {
        try {
            const res = await loginFx({email, password})
        } catch (e) {
        }
    }


    const verified = validateEmail(email) && validatePassword(password)


    return (
        <Stack>
            <Typography
                pl={2}
                pb={2}
                variant="h1"
                fontSize="24px"
                fontWeight="700"
                textAlign="left">
                Login to YourAIChat!
            </Typography>
            <Stack
                spacing={2}>
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
                <Stack
                    justifyContent="space-between"
                    alignItems="center"
                    direction="row">
                    <FormControlLabel
                        control={
                            <Checkbox
                                onChange={(e)=>{setRemember(e.target.checked)}}
                                checked={remember}
                                color="info"/>
                        }
                        label="Remember Me"/>
                    <Button
                        onClick={()=>{setMode("forget")}}
                        color="info">
                        Forget Password?
                    </Button>
                </Stack>
                <Button
                    disabled={!verified}
                    id="submit"
                    name="submit"
                    type="submit"
                    onClick={loginHandle}
                    sx={{height: 56}}
                    size="large"
                    color="primary"
                    variant="contained">
                    Sign In
                </Button>
                <Divider>Don&apos;t have an account yet?</Divider>
                <Button
                    id="submit"
                    name="submit"
                    type="submit"
                    onClick={()=>{setMode("register")}}
                    sx={{height: 56}}
                    size="large"
                    color="info"
                    variant="outlined">
                    Register
                </Button>
            </Stack>
        </Stack>
    );
};

export default AdminLogin;