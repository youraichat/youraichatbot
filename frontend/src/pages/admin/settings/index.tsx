import React, {useEffect, useState} from 'react';
import {NextPage} from "next";
import {AdminLayout} from "@/layouts";
import Grid from "@mui/system/Unstable_Grid";
import {
    Button,
    Card,
    CardContent,
    FormControlLabel,
    IconButton,
    InputAdornment,
    Stack, Switch,
    TextField,
    Typography
} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {getSettingApi, updateSettingApi} from "@/api";

const SettingsPage: NextPage = () => {
    const [show, setShow] = useState(false);
    const [key, setKey] = useState<string>("");
    const [allow, setAllow] = useState(false);

    const updateSettingHandle = async () => {
        try {
            const {data} = await updateSettingApi({
                key,
                createAccount: allow
            })

            getHandle();
        } catch (e) {
            console.warn(e)
        }
    }

    const getHandle = async () => {
        try {
            const {data}: any = await getSettingApi();

            setKey(data.key);
            setAllow(data.createAccount)
        } catch (e) {
            console.warn(e)
        }
    }

    useEffect(() =>{
        getHandle()
    }, [])


    return (
        <AdminLayout>
            <Grid container>
                <Grid xs={12} lg={6}>
                    <Card
                        variant="outlined"
                        sx={{borderRadius: 3, p:1}}>
                        <CardContent>
                            <Stack spacing={2}>
                                <Typography>
                                    Site Settings
                                </Typography>
                                <Stack>
                                    <label htmlFor="token">Flowise Key</label>
                                    <TextField
                                        id="flowise_key"
                                        name="flowise_key"
                                        placeholder="Flowise Api Key @"
                                        value={key}
                                        onChange={(e)=>{setKey(e.target.value)}}
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
                                </Stack>

                                <Stack>
                                    <label>Allow Create Account</label>
                                    <FormControlLabel
                                        control={<Switch
                                            checked={allow}
                                            onChange={(_, newVal)=>{setAllow(newVal)}}
                                            color="info"/>}
                                        label={allow ? "Allow" : "Disable"}/>
                                </Stack>

                                <Button
                                    onClick={updateSettingHandle}
                                    disableElevation
                                    color="primary"
                                    variant="contained"
                                    size="large">
                                    Update Settings
                                </Button>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </AdminLayout>
    );
};

export default SettingsPage;