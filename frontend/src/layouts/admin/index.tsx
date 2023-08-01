import React, {FC, Fragment} from 'react';
import Box from '@mui/material/Box';

import {LayoutType} from "@/utils/types/layout.type";
import SeoHead from "@/components/shared/seo/head";
import AdminLayoutHeader from "@/layouts/admin/components/header";
import AdminLayoutDrawer from "@/layouts/admin/components/drawer";
import DrawerHeader from "./components/drawer/header"
import {useTheme} from "@mui/material";
import 'reactflow/dist/style.css';
import {useStore} from "effector-react";
import $auth from "@/model/auth/store";
import AdminAuth from "@/components/admin/auth";
import Divider from "@mui/material/Divider";


const AdminLayout: FC<LayoutType> = (props) => {
    const {children, seo} = props
    const [open, setOpen] = React.useState(true);
    const theme = useTheme();
    const auth = useStore($auth)


    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(true);
    };

    return (
        <Fragment>
            <SeoHead {...seo}/>
            <AdminAuth/>
            <Box sx={{ display: 'flex' }}>
                <AdminLayoutHeader
                    drawerOpen={handleDrawerOpen}
                    open={open}/>
                <Divider/>
                <AdminLayoutDrawer
                    drawerClose={handleDrawerClose}
                    open={open}/>

                <Box
                    sx={{
                        flexGrow: 1,
                        backgroundColor: theme.palette.background.paper,
                        height: "100vh"
                    }}
                    component="main">
                    <DrawerHeader />
                    <Box sx={{p: 3, height: "calc(100vh - 56px)", overflow: "auto"}}>
                        {children}
                    </Box>
                </Box>
            </Box>
        </Fragment>
    );
};

export default AdminLayout;