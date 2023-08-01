import React, {FC} from 'react';
import {Container, Paper, useMediaQuery, useTheme} from "@mui/material";
import {LayoutType} from "@/utils/types/layout.type";
import SeoHead from "@/components/shared/seo/head";
import AppHeader from "./components/header";
import {useStore} from "effector-react";
import $theme from "@/model/theme/store";
import $auth from "@/model/auth/store";
import Login from "@/components/login";

const AppLayout: FC<LayoutType> = (props) => {
    const {children, seo} = props;
    const themeSettings = useStore($theme);
    const auth = useStore($auth);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));


    return (
        <Container
            maxWidth={themeSettings.container === "full" ? false : themeSettings.container}
            style={{
                paddingLeft: themeSettings.container === "full" || isMobile ? 0 : undefined,
                paddingRight: themeSettings.container === "full" || isMobile ? 0 : undefined
            }}>
            <SeoHead {...seo}/>
            <AppHeader/>
            <Paper
                style={{
                    minHeight: "calc(100vh - 56px)",
                    display: "flex",
                    flexFlow: "column nowrap"
                }}
                elevation={0}
                color="secondary"
                component="main">
                {
                    auth.isAuth ? (
                        children
                    ) : (
                        <Login/>
                    )
                }
            </Paper>
        </Container>
    );
};

export default AppLayout;