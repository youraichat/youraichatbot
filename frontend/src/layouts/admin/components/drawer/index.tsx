import React, {FC} from 'react';
import {Avatar, IconButton, Stack, Typography} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import ListItemText from "@mui/material/ListItemText";
import {CSSObject, styled, Theme, useTheme} from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import DrawerHeader from "./header";
import {
    AutoAwesome,
    AutoFixHigh,
    BarChart,
    DocumentScanner,
    Logout,
    PeopleAlt,
    Settings,
    ThumbUpAlt
} from "@mui/icons-material";
import {logoutFx} from "@/model/auth/effect";
import {useRouter} from "next/router";
import {USER_ROLE} from "@/utils/types/user.type";
import {useStore} from "effector-react";
import $auth from "@/model/auth/store";


interface Props {
    open: boolean;
    drawerClose: () => void;
}

const AdminLayoutDrawer: FC<Props> = (props) => {
    const {open, drawerClose} = props;
    const auth = useStore($auth);
    const theme = useTheme();
    const router: any = useRouter();

    const logout = async () => {
        console.log("LOGOUT")
        await logoutFx()
    }

    const menus = [
        {
            id: 'users',
            title: 'Users',
            link: "/admin/users/",
            icon: <PeopleAlt/>,

        },
        {
            id: 'prompts',
            link: "/admin/prompt/",
            icon: <AutoFixHigh/>,
            title: 'Prompts'
        },
        {
            id: 'prompts',
            link: "/admin/feedback/",
            icon: <ThumbUpAlt/>,
            title: 'Feedback'
        },
        {
            id: 'settings',
            link: "/admin/settings/",
            icon: <Settings/>,
            title: 'Settings'
        },
        {
            id: 'flowise',
            link: process.env.FLOWISE_DN || "https://flowise.youraichatbot.com/",
            icon: <AutoAwesome/>,
            title: 'Flowise'
        }
    ]

    const userMenus = [
        {
            id: 'prompts',
            link: "/admin/prompt/",
            icon: <AutoFixHigh/>,
            title: 'Prompts'
        },
    ]

    const actions = [
        {
            id: 'logout',
            action: ()=>logout(),
            icon: <Logout/>,
            title: 'Sign out'
        },
    ]

    return (
        <Drawer
            variant="permanent"
            PaperProps={{
                sx: {
                    background: theme.palette.background.paper
                }
            }}
            open={open}>
            <DrawerHeader>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    sx={{width: "100%"}}>
                    <Stack
                        spacing={2}
                        alignItems="center"
                        direction="row">
                        <Avatar
                            sx={{borderRadius: 2.5}}
                            variant="rounded"
                            src="/logos/logo.jpg"/>
                        <Stack>
                            <Typography
                                sx={{lineHeight: 1}}
                                fontSize={14}
                                fontWeight={700}>
                                YOUR AI CHAT
                            </Typography>
                            <Typography
                                sx={{
                                    letterSpacing: 1.2
                                }}
                                textAlign="center"
                                fontSize={10}
                                fontWeight={700}>
                                {auth.user.role === USER_ROLE.ADMIN && "ADMINISTRATOR"}
                                {auth.user.role === USER_ROLE.MANAGER && "MANAGER"}
                                {auth.user.role === USER_ROLE.USER && "USER"}
                                {auth.user.role === USER_ROLE.SUPPORT && "SUPPORT"}
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </DrawerHeader>
            <Divider/>
            <List>
                {(auth?.user?.role === USER_ROLE.USER ? userMenus : menus).map((menu, index) => (
                    <ListItem
                        key={menu.id}
                        disablePadding
                        sx={{display: 'block'}}>
                        <ListItemButton
                            onClick={()=>{!menu.link.includes("http") && router.push(menu.link)}}
                            href={menu.link.includes("http") ? menu.link : ""}
                            target={menu.link.includes("http") ? "_blank" : "_self"}
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                                my: 1
                            }}>
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}>
                                {menu.icon}
                            </ListItemIcon>
                            <ListItemText primary={menu.title} sx={{opacity: open ? 1 : 0}}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider/>
            <List>
                {actions.map((menu, index) => (
                    <ListItem
                        key={menu.id}
                        disablePadding
                        sx={{display: 'block'}}>
                        <ListItemButton
                            onClick={()=>{console.log("CLICK"); menu.action()}}
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                                my: 1
                            }}>
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}>
                                {menu.icon}
                            </ListItemIcon>
                            <ListItemText primary={menu.title} sx={{opacity: open ? 1 : 0}}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});


const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);


export default AdminLayoutDrawer;