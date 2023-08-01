import type {AppProps} from 'next/app'
import {CssBaseline, ThemeProvider} from "@mui/material";
import {lightTheme, darkTheme} from "@/utils/theme";
import {useStore} from "effector-react";
import GlobalStyle from "@/components/shared/style";
import $theme from "@/model/theme/store";
import {Fragment, useEffect, useState} from "react";
import dayjs from "dayjs";
import { ToastContainer } from 'react-toastify';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'regenerator-runtime/runtime'
import 'react-toastify/dist/ReactToastify.css';
import {MessageProvider} from "@/model/message";
dayjs.extend(relativeTime)

export default function App({Component, pageProps}: AppProps) {
    const themeSettings = useStore($theme);
    const [mounted, setMounted] = useState(false);

    useEffect(()=>{
        setMounted(true)
    },[])

    return (
        <MessageProvider>
            {
                mounted && (
                    <ThemeProvider
                        theme={
                            themeSettings.mode === "light" ? lightTheme : darkTheme
                        }>
                        <ToastContainer />
                        <CssBaseline/>
                        <GlobalStyle/>
                        <Component {...pageProps} />
                    </ThemeProvider>
                )
            }
        </MessageProvider>
    )
}
