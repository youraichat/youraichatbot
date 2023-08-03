import React, {FC, useState} from 'react';
import Link from "next/link";
import {
    AppBar, Avatar,
    Divider, List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Popover, Stack, Switch,
    Toolbar,
    useTheme
} from "@mui/material";
import Image from "next/image";
import {
    AutoFixHigh,
    Clear, DocumentScanner, Download, Logout,
    MoreVert, Settings, VerifiedUserOutlined
} from "@mui/icons-material";
import {changeCheckboxEvent, changeSettingEvent, changeThemeEvent} from "@/model/theme/event";
import ModeSwitch from "@/components/shared/switch/mode";
import AppSettingsDialog from "@/layouts/app/components/settings";
import SquareButton from "@/components/shared/button/square";
import {useRouter} from "next/router";
import {useStore} from "effector-react";
import $theme from "@/model/theme/store";
import $auth from "@/model/auth/store";
import {logoutEvent} from "@/model/auth/event";
import DeleteConformation from "@/components/conversation/confirm";
import {HistoryHelper} from "@/model/conversation/historyHelper";
import {deleteAllMessageFx} from "@/model/conversation/effect";
import {downloadConversationJson} from "@/utils/libs/downloadJson";
import $conversation from "@/model/conversation/store";


const AppHeader: FC = () => {
    const theme = useTheme();
    const themeSettings = useStore($theme);
    const conversation = useStore($conversation);
    const historyHelper = new HistoryHelper();
    const auth = useStore($auth);
    const router: any = useRouter();
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [dlt, setDlt] = useState<boolean>(false);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const deleteConversationHandle = async (action: boolean) => {
        setDlt(false);
        if(action) {
            await deleteAllMessageFx()
        }
    }

    const exportConversationHandle = async () => {
        await downloadConversationJson(conversation.messages)
        setAnchorEl(null)
    }

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;


    return (
        <AppBar
            color="default"
            elevation={1}
            position="sticky">
            <Toolbar
                variant="regular"
                style={{width: "100%", minHeight: 56}}>
                <DeleteConformation
                    title="Delete all converstaion"
                    description="Are you sure to delete all messages?"
                    open={dlt}
                    callback={deleteConversationHandle}/>
                <Stack
                    style={{width: "100%"}}
                    justifyContent="space-between"
                    alignItems="center"
                    direction="row">
                    <Stack
                        alignItems="center"
                        spacing={3}
                        direction="row">
                        <Link href="/">
                            <Avatar
                                variant="rounded"
                                src={"/logos/logo.jpg"}
                                alt="Logo Image"/>
                        </Link>
                    </Stack>
                    <Stack
                        alignItems="center"
                        spacing={.4}
                        direction="row">
                        <ModeSwitch
                            onChange={(e, newValue) => {
                                changeThemeEvent(newValue ? "dark" : "light")
                            }}
                            checked={themeSettings.mode === "dark"}
                        />
                        <SquareButton
                            sx={{color: "#ffffff"}}
                            aria-describedby={id}
                            onClick={handleClick}>
                            <MoreVert/>
                        </SquareButton>
                        <Popover
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            PaperProps={{
                                sx: {
                                    borderRadius: "12px",
                                    m: 1,
                                    width: 280,
                                    backgroundColor: theme.palette.background.paper,
                                    backgroundImage: "none",
                                    overflow: "inherit",
                                    "::before": {
                                        content: "''",
                                        width: "16px",
                                        height: "16px",
                                        backgroundColor: theme.palette.background.paper,
                                        position: "absolute",
                                        display: "block",
                                        top: "-4px",
                                        right: "20px",
                                        transform: "rotate(45deg)"
                                    }
                                },
                            }}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}>
                            <List component="nav" aria-label="main mailbox folders">
                                <ListItem
                                    onClick={()=>{}}>
                                    <ListItemIcon>
                                        <AutoFixHigh />
                                    </ListItemIcon>
                                    <ListItemText primary={<b>Show checkbox</b>} />
                                    <Switch
                                        disabled={!auth.isAuth}
                                        onChange={(e, newValue) => {
                                            changeCheckboxEvent(newValue)
                                        }}
                                        checked={themeSettings.checkbox}
                                        color="info"/>
                                </ListItem>
                            </List>
                            <Divider />
                            <List>
                                <ListItemButton
                                    disabled={!auth.isAuth}
                                    onClick={()=>{router.push("/admin/profile")}}>
                                    <ListItemIcon>
                                        <VerifiedUserOutlined />
                                    </ListItemIcon>
                                    <ListItemText primary={<b>My Profile</b>} />
                                </ListItemButton>
                                <ListItemButton
                                    disabled={!auth.isAuth}
                                    onClick={()=>{
                                        changeSettingEvent(true);
                                        handleClose();
                                    }}>
                                    <ListItemIcon>
                                        <Settings />
                                    </ListItemIcon>
                                    <ListItemText primary={<b>Settings</b>} />
                                </ListItemButton>
                                <ListItemButton
                                    disabled={!auth.isAuth}
                                    onClick={exportConversationHandle}>
                                    <ListItemIcon>
                                        <Download />
                                    </ListItemIcon>
                                    <ListItemText primary={<b>Export Conversation</b>} />
                                </ListItemButton>
                                <ListItemButton
                                    disabled={!auth.isAuth}
                                    onClick={()=>{setDlt(true); handleClose();}}>
                                    <ListItemIcon>
                                        <Clear />
                                    </ListItemIcon>
                                    <ListItemText primary={<b>Clear Conversation</b>} />
                                </ListItemButton>
                            </List>
                            <Divider />
                            <List component="nav" aria-label="Clear history">
                                <ListItemButton
                                    disabled={!auth.isAuth}
                                    onClick={()=>{logoutEvent(); setAnchorEl(null)}}>
                                    <ListItemIcon>
                                        <Logout />
                                    </ListItemIcon>
                                    <ListItemText primary={<b>Log Out</b>} />
                                </ListItemButton>
                            </List>
                        </Popover>
                    </Stack>
                </Stack>
            </Toolbar>
            <AppSettingsDialog />
        </AppBar>
    );
};

export default AppHeader;