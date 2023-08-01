import React, {FC, useEffect, useState} from 'react';
import {
    Box,
    Fade,
    Modal
} from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import {useStore} from "effector-react";
import $auth from "@/model/auth/store";
import AdminLogin from "./login";
import AdminRegister from "./register";
import AdminReset from "./reset";
import AdminForget from "./forget";
import AdminRegisterSuccess from "@/components/admin/auth/register-success";
import {useRouter} from "next/router";
import {resetPasswordApi, verifyApi} from "@/api";


export type AuthMode = "register-success" | "register" | "login" | "forget" | "reset"

const AdminAuth: FC = () => {
    const router = useRouter();

    const {mode, token} = router.query;

    const auth = useStore($auth);
    const [mod, setMode] = useState<AuthMode>("login");


    const verifyHandle = async () => {
        try {
            const {data}: any = await verifyApi(token?.toString() || "");
        } catch (e) {
            console.warn(e)
        }
    }

    useEffect(() => {
        if (mode === 'verify') {
            if (token) {
                verifyHandle()
            } else {

            }
        }

        if (mode === 'reset') {
            if (token) {
                setMode('reset')
            } else {

            }
        }
    }, [mode, token])

    return (
        <Modal
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                    sx: {
                        background: "rgba(59,59,73,0.63)",
                        backdropFilter: "blur(4px)"
                    }
                },

            }}
            open={!auth.isAuth}>
            <Fade in={!auth.isAuth}>
                <Box sx={style}>
                    {{
                        'login': <AdminLogin setMode={setMode}/>,
                        'register': <AdminRegister setMode={setMode}/>,
                        'forget': <AdminForget setMode={setMode}/>,
                        'reset': <AdminReset setMode={setMode}/>,
                        'register-success': <AdminRegisterSuccess setMode={setMode}/>,
                    }[mod]}
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

export default AdminAuth;