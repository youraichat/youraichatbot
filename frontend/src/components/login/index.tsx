import React, {FC, useEffect, useState} from 'react';
import {
    Alert,
    Button,
    Card,
    CardContent, Checkbox,
    Container, FormControlLabel,
    IconButton,
    InputAdornment,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import Grid from "@mui/system/Unstable_Grid";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {loginEvent} from "@/model/auth/event";
import {initApi} from "@/api";
import {loginFx} from "@/model/auth/effect";

const LoginPopup: FC = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [show, setShow] = useState<boolean>(false);
    const [remember, setRemember] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    const loginHandle = async () => {
        try {
            await loginFx({email: username, password})
        } catch (e) {
            console.warn(e)
        }
    }


    return (
        <Container
            maxWidth="sm">
            <Grid
                sx={{
                    height: "calc(100vh - 56px)",
                }}
                justifyContent="center"
                alignItems="center"
                container>
                <Grid xs={12}>
                    {
                        Boolean(error) && (
                            <Alert
                                sx={{borderRadius: "10px", mb: 2}}
                                onClose={() => {setError("")}}
                                severity="error">
                                {error}
                            </Alert>
                        )
                    }
                    <Card
                        elevation={1}
                        sx={{borderRadius: 3, p: 1, boxShadow: "rgba(0, 0, 0, 0.25) 0px 25px 50px -12px"}}>
                        <CardContent>

                            <Typography
                                pl={2}
                                pb={2}
                                variant="h1"
                                fontSize="24px"
                                fontWeight="700"
                                textAlign="left">
                                Login to Demo!
                            </Typography>
                            <Stack spacing={2}>
                                <TextField
                                    id="username"
                                    name="username"
                                    placeholder="Username @ "
                                    value={username}
                                    onChange={(e)=>{setUsername(e.target.value)}}
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
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            onChange={(e)=>{setRemember(e.target.checked)}}
                                            checked={remember}
                                            color="info"/>
                                    }
                                    label="Remember Me"/>
                                <Button
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
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default LoginPopup;