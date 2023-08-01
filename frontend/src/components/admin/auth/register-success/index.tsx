import React, {FC, useState} from 'react';
import {
    Button,
    Divider,
    IconButton,
    InputAdornment,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {registerApi, verifyApi} from "@/api";
import {AuthMode} from "@/components/admin/auth";
import {signFx} from "@/model/auth/effect";

interface Props {
    setMode: (val: AuthMode) => void;
}


const AdminRegisterSuccess: FC<Props> = (props) => {
    const {setMode} = props;

    const [code, setCode] = useState("");

    const verifyHandle = async () => {
        try {
            const {data} = await verifyApi(code);
            signFx(data);
            setMode("login")
        } catch (e: any) {
            console.warn(e.response.data.message);
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
                Verify your email address!
            </Typography>
            <Typography
                pl={2}
                pb={2}
                mb={3}
                variant="caption">
                We sent the verification code to your email address. you can verify email with 6 digital code or verification link.
            </Typography>
            <Stack spacing={2}>
               <Stack>
                   <label>Verification Code</label>
                   <TextField
                       id="email"
                       name="email"
                       placeholder="****** - 6 Digital code @"
                       value={code}
                       onChange={(e)=>{setCode(e.target.value)}}
                       InputProps={{
                           sx: {borderRadius: "10px"},
                           type: "text",
                       }}
                       fullWidth/>
               </Stack>

                <Button
                    disabled={code.length !== 6}
                    onClick={verifyHandle}
                    id="submit"
                    name="submit"
                    sx={{height: 56}}
                    size="large"
                    color="primary"
                    variant="contained">
                    Verify Email
                </Button>
            </Stack>
        </Stack>
    );
};

export default AdminRegisterSuccess;