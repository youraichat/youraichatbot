import React, {useEffect, useState} from 'react';
import {NextPage} from "next";
import {AdminLayout} from "@/layouts";
import {
    Avatar,
    Button,
    Card,
    CardContent,
    IconButton,
    InputAdornment,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {CloseOutlined, UploadOutlined, Visibility, VisibilityOff} from "@mui/icons-material";
import Grid from "@mui/system/Unstable_Grid";
import {useStore} from "effector-react";
import $auth from "@/model/auth/store";
import SquareButton from "@/components/shared/button/square";
import {updateProfileApi} from "@/api";
import {updateProfileFx} from "@/model/auth/effect";

const ProfilePage: NextPage = () => {
    const auth = useStore($auth);

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState<string>("");
    const [passwordConfirm, setPasswordConfirm] = useState<string>("");
    const [show, setShow] = useState<boolean>(false);
    const [file, setFile] = useState<File | null>(null);

    const fileHandle = (e: any) => {
        setFile(e.target.files?.[0])
    }

    const updateProfileHandle = async () => {
        try {
            const formData: FormData = new FormData();
            if (file) {
                formData.append("file", file, "avatar.jpg");
            }

            formData.append("email", email);
            formData.append("firstname", firstname);
            formData.append("lastname", lastname);

            await updateProfileFx(formData);
            setFirstname(auth?.user?.firstname);
            setLastname(auth?.user?.lastname);
            setEmail(auth?.user?.email);
            setFile(null)
        } catch (e) {
            console.warn(e)
        }
    }


    const updatePasswordHandle = async () => {
        try {

        } catch (e) {

        }
    }

    useEffect(() => {
        setFirstname(auth?.user?.firstname);
        setLastname(auth?.user?.lastname);
        setEmail(auth?.user?.email);
    }, [auth]);


    return (
        <AdminLayout>

            <Grid
                spacing={3}
                container>
                <Grid lg={6} xs={12}>
                    <Card
                        variant="outlined"
                        sx={{borderRadius: 2, p: 1}}>
                        <CardContent>
                            <Stack spacing={2}>
                                <Typography
                                    fontSize={18}
                                    fontWeight={700}
                                    variant="h2">
                                    Your Profile
                                </Typography>
                                <Stack
                                    spacing={2}
                                    alignItems="flex-start"
                                    direction="row">
                                    <Avatar
                                        src={file ? URL.createObjectURL(file) : (process.env.API_ENDPOINT || "") + auth?.user?.photo}
                                        sx={{width: 100, height: 100, fontSize: 32, fontWeight: 900}}
                                        variant="rounded">
                                        {auth?.user?.firstname?.[0]?.toUpperCase()}
                                    </Avatar>
                                    <Stack
                                        sx={{width: '100%'}}
                                        spacing={2}
                                        alignItems="center"
                                        direction="row">
                                        <Button
                                            component="label"
                                            variant="outlined"
                                            startIcon={<UploadOutlined/>}
                                            color="info">
                                            Choose File
                                            <input
                                                accept=".jpg,.png,.jpeg"
                                                onChange={fileHandle}
                                                id="file"
                                                hidden
                                                type="file"/>
                                        </Button>
                                        <Typography
                                            variant="caption">
                                            {file ? file.name.substring(0, 6) + "..." + file.name.slice(-10) : "No file chosen"}
                                        </Typography>
                                        {
                                            file?.name && (
                                                <SquareButton
                                                    color="info"
                                                    size="small"
                                                    sx={{ml: 1}}
                                                    onClick={() => {
                                                        setFile(null);
                                                    }}>
                                                    <CloseOutlined/>
                                                </SquareButton>
                                            )
                                        }
                                    </Stack>
                                </Stack>
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
                                <Button
                                    disabled={
                                        firstname === auth?.user?.firstname &&
                                        lastname === auth?.user?.lastname &&
                                        email === auth?.user?.email &&
                                        !file
                                    }
                                    onClick={updateProfileHandle}
                                    disableElevation
                                    variant="contained"
                                    size="large">
                                    Update Profile
                                </Button>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid lg={6} xs={12}>
                    <Card
                        variant="outlined"
                        sx={{borderRadius: 2, p: 1}}>
                        <CardContent>
                            <Stack spacing={2}>
                                <Typography
                                    fontSize={18}
                                    fontWeight={700}
                                    variant="h2">
                                    Your Password
                                </Typography>
                                <Stack>
                                    <label>New Password</label>
                                    <TextField
                                        id="password"
                                        name="password"
                                        placeholder="New Password @ "
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value)
                                        }}
                                        InputProps={{
                                            sx: {borderRadius: "10px"},
                                            type: show ? "text" : "password",
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={() => {
                                                        setShow(!show)
                                                    }}>
                                                        {
                                                            show ?
                                                                <VisibilityOff/> :
                                                                <Visibility/>
                                                        }
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                        fullWidth/>
                                </Stack>
                                <Stack>
                                    <label>Password Confirmation</label>
                                    <TextField
                                        id="password-confirm"
                                        name="password-confirm"
                                        placeholder="Password Confirm @ "
                                        value={passwordConfirm}
                                        onChange={(e) => {
                                            setPasswordConfirm(e.target.value)
                                        }}
                                        InputProps={{
                                            sx: {borderRadius: "10px"},
                                            type: show ? "text" : "password",
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={() => {
                                                        setShow(!show)
                                                    }}>
                                                        {
                                                            show ?
                                                                <VisibilityOff/> :
                                                                <Visibility/>
                                                        }
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                        fullWidth/>
                                </Stack>

                                <Button
                                    disabled={
                                        password.length < 8 ||
                                        password !== passwordConfirm
                                    }
                                    onClick={updatePasswordHandle}
                                    disableElevation
                                    variant="contained"
                                    size="large">
                                    Update Password
                                </Button>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>


        </AdminLayout>
    );
};

export default ProfilePage;