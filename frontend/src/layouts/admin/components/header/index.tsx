import React, {FC} from 'react';
import Toolbar from "@mui/material/Toolbar";
import {
    Avatar,
    ButtonBase, Divider,
    IconButton,
    List,
    ListItem,
    ListItemIcon, ListItemText,
    Popover,
    Stack, Typography,
    useTheme
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {styled} from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import {AppBarProps as MuiAppBarProps} from "@mui/material/AppBar/AppBar";
import ModeSwitch from "@/components/shared/switch/mode";
import {changeThemeEvent} from "@/model/theme/event";
import {useStore} from "effector-react";
import $theme from "@/model/theme/store";
import {
    AutoFixHigh, Logout,
    ManageAccounts
} from "@mui/icons-material";
import {useRouter} from "next/router";
import {logoutFx} from "@/model/auth/effect";
import $auth from "@/model/auth/store";

interface Props {
    drawerOpen: () => void;
    open: boolean;
}

const AdminLayoutHeader: FC<Props> = (props) => {
    const {drawerOpen, open} = props
    const router: any = useRouter();
    const theme = useTheme();
    const themeSettings = useStore($theme);
    const auth = useStore($auth);

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const pop = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;


    return (
        <AppBar
            style={{background: "none", boxShadow: "none",borderBottom: theme.palette.mode === "dark" ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(0,0,0,0.12)"}}
            color="transparent"
            elevation={0}
            position="fixed"
            open={open}>
            <Toolbar
                style={{width: "100%", minHeight: 56}}>
                <Stack
                    style={{width: "100%"}}
                    spacing={3}
                    justifyContent="space-between"
                    alignItems="center"
                    direction="row">
                    <Stack
                        spacing={2}
                        alignItems="center"
                        direction="row">
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={drawerOpen}
                            edge="start"
                            sx={{
                                ...(open && {display: 'none'}),
                            }}>
                            <MenuIcon/>
                        </IconButton>
                        <Typography
                            variant="h6"
                            noWrap
                            fontSize={18}
                            fontWeight={900}
                            component="div">
                            Your AI Chat Admin
                        </Typography>
                    </Stack>

                    <Stack
                        alignItems="center"
                        spacing={2}
                        direction="row">
                        <ModeSwitch
                            onChange={(e, newValue) => {
                                changeThemeEvent(newValue ? "dark" : "light")
                            }}
                            checked={themeSettings.mode === "dark"}/>
                        <ButtonBase
                            sx={{borderRadius: 50}}
                            onClick={handleClick}>
                            <Avatar
                                variant="rounded"
                                src={(process.env.API_ENDPOINT || "") + auth?.user?.photo}
                                sx={{
                                    fontWeight: 800,
                                    color: theme.palette.primary.contrastText
                                }}>
                                {auth?.user?.firstname?.[0]?.toUpperCase()}
                            </Avatar>
                        </ButtonBase>
                        <Popover
                            id={id}
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
                            }}
                            open={pop}>
                            <List component="nav" aria-label="main mailbox folders">
                                <ListItem
                                    onClick={()=>{router.push("/backend/profile")}}>
                                    <ListItemIcon>
                                        <ManageAccounts />
                                    </ListItemIcon>
                                    <ListItemText primary={<b>Your Profile</b>} />
                                </ListItem>
                                <ListItem
                                    onClick={()=>{router.push("/backend/prompt")}}>
                                    <ListItemIcon>
                                        <AutoFixHigh />
                                    </ListItemIcon>
                                    <ListItemText primary={<b>Manage Prompts</b>} />
                                </ListItem>
                            </List>
                            <Divider />
                            <List component="nav" aria-label="main mailbox folders">
                                <ListItem
                                    onClick={()=>{logoutFx()}}>
                                    <ListItemIcon>
                                        <Logout />
                                    </ListItemIcon>
                                    <ListItemText primary={<b>Sign Out</b>} />
                                </ListItem>
                            </List>
                        </Popover>
                    </Stack>
                </Stack>
            </Toolbar>
        </AppBar>
    );
};


const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({theme, open}) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

export default AdminLayoutHeader;