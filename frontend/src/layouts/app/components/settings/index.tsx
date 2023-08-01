import React, {FC, useEffect, useState} from 'react';
import {
    Button,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle, Divider, FormControl,
    FormControlLabel,
    List,
    ListItem, ListItemIcon,
    ListItemText, MenuItem, Radio,
    RadioGroup, Select,
    Stack, Switch, useMediaQuery, useTheme
} from "@mui/material";
import {changeContainerEvent, changeSettingEvent, changeThemeEvent} from "@/model/theme/event";
import {
    HelpOutline,
    KeyboardCommandKey,
    KeyboardReturn, NightsStay,
    SaveOutlined,
    WidthNormal,
    WidthWide
} from "@mui/icons-material";
import {BootstrapTooltip} from "@/components/shared/tooltip";
import {useStore} from "effector-react";
import $theme from "@/model/theme/store";
import $settings from "@/model/settings/store";
import {changeSettingsEvent} from "@/model/settings/event";

interface Props {
}

const AppSettingsDialog: FC<Props> = (props) => {
    const themeSettings = useStore($theme);
    const settings = useStore($settings);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [short, setShort] = useState(false);
    const [enter, setEnter] = useState(false);
    const [language, setLanguage] = useState<string>("en-US");

    const initSettings = () => {
        setShort(settings.shortKey);
        setEnter(settings.enter);
        setLanguage(settings.language)
    }

    const saveHandle = () => {
        changeSettingsEvent({
            shortKey: short,
            enter,
            language
        });
        changeSettingEvent(false)
    }

    const discardHandle = () => {
        changeSettingEvent(false)
        initSettings();
    }

    useEffect(()=>{
        initSettings();
    }, [settings])


    return (
        <Dialog
            BackdropProps={{
                style: {
                    background: "rgba(59,59,73,0.63)",
                    backdropFilter: "blur(4px)"
                }
            }}
            PaperProps={{
                style: {
                    width: 500,
                    borderRadius: 12,
                },
                sx: {
                    bg: "background.paper",
                    backgroundImage: "none"
                }
            }}
            open={themeSettings.settings}
            onClose={() => {
                changeSettingEvent(false)
            }}
            aria-labelledby="settings-dialog"
            aria-describedby="settings-dialog-description">
            <DialogTitle id="settings-dialog-title">
                Settings
            </DialogTitle>
            <DialogContent>
                <List>
                    <ListItem sx={{pl: 0, pr: 0}}>
                        <Stack
                            direction={
                                isMobile ? "column" : "row"
                            }
                            sx={{width: "100%"}}>
                            <ListItemText
                                id="switch-list-label-wifi"
                                primary={<b>Centering</b>}
                                secondary="Narrow chat"/>
                            <RadioGroup
                                onChange={(e, newVal: any) => {
                                    changeContainerEvent(newVal)
                                }}
                                value={themeSettings.container}
                                row>
                                <FormControlLabel
                                    disableTypography
                                    sx={{alignItems: "center"}}
                                    value="md"
                                    control={<Radio color="info"/>}
                                    label={<WidthNormal/>}/>
                                <FormControlLabel
                                    disableTypography
                                    sx={{alignItems: "center"}}
                                    value="xl"
                                    control={<Radio color="info"/>}
                                    label={<WidthWide/>}/>
                                <FormControlLabel
                                    value="full"
                                    control={<Radio color="info"/>}
                                    label="Full"/>
                            </RadioGroup>
                        </Stack>
                    </ListItem>

                    <ListItem
                        sx={{pl: 0, pr: 0}}
                        onClick={()=>{}}>
                        <ListItemIcon>
                            <NightsStay />
                        </ListItemIcon>
                        <ListItemText
                            id="switch-list-label-bluetooth"
                            primary={<b>Enable Dark</b>}
                            secondary="Display mode - Dark / Light"/>
                        <Switch
                            edge="end"
                            onChange={(e, newValue) => {
                                changeThemeEvent(newValue ? "dark" : "light")
                            }}
                            checked={themeSettings.mode === "dark"}
                            color="info"/>
                    </ListItem>
                    <Divider />
                    <ListItem sx={{pl: 0, pr: 0}}>
                        <ListItemText
                            id="switch-list-label-wifi"
                            primary={<b>Language</b>}
                            secondary={<>
                                Speech Input
                                <BootstrapTooltip
                                    placement="top"
                                    title="What is this?">
                                    <HelpOutline
                                        sx={{
                                            fontSize: 20,
                                            marginBottom: "-4px",
                                            marginLeft: "6px"
                                        }}/>
                                </BootstrapTooltip>
                            </>}/>
                        <FormControl sx={{width: 120}} size="small">
                            <Select
                                sx={{
                                    borderRadius: "8px"
                                }}
                                value={language}
                                onChange={(e)=>{setLanguage(e.target.value)}}
                                MenuProps={{
                                    anchorOrigin: {
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    },
                                    transformOrigin: {
                                        vertical: 'top',
                                        horizontal: 'right',
                                    },
                                    PaperProps: {
                                        sx: {
                                            borderRadius: "8px"
                                        }
                                    }
                                }}
                                labelId="demo-select-small-label"
                                id="demo-select-small">
                                <MenuItem value="en-US">English (United State)</MenuItem>
                                <MenuItem value="en-UK">English (United Kingdom)</MenuItem>
                                <MenuItem value="en-CA">English (Canada)</MenuItem>
                            </Select>
                        </FormControl>
                    </ListItem>
                    <ListItem sx={{pl: 0, pr: 0}}>
                        <ListItemIcon>
                            <KeyboardReturn/>
                        </ListItemIcon>
                        <ListItemText
                            id="switch-list-label-bluetooth"
                            primary={<b>Enter Key</b>}
                            secondary="Send Message with Enter key"/>
                        <Switch
                            checked={enter}
                            onChange={(_,newVal)=>{setEnter(newVal)}}
                            color="info"
                            edge="end"
                            inputProps={{
                                'aria-labelledby': 'switch-list-label-bluetooth',
                            }}
                        />
                    </ListItem>
                    <ListItem
                        sx={{pl: 0, pr: 0}}>
                        <ListItemIcon>
                            <KeyboardCommandKey/>
                        </ListItemIcon>
                        <ListItemText
                            id="switch-list-label-bluetooth"
                            primary={<b>Short Key Enable</b>}
                            secondary="Override shortkey option"/>
                        <Switch
                            checked={short}
                            onChange={(_,newVal)=>{setShort(newVal)}}
                            color="info"
                            edge="end"
                            inputProps={{
                                'aria-labelledby': 'switch-list-label-bluetooth',
                            }}
                        />
                    </ListItem>
                </List>
            </DialogContent>
            <DialogActions>
                <Button
                    disableElevation
                    sx={{my: 1, minWidth: 100}}
                    startIcon={<SaveOutlined/>}
                    onClick={saveHandle}
                    variant="contained"
                    color="primary"
                    autoFocus>
                    Save
                </Button>
                <Button
                    variant="outlined"
                    sx={{my: 1, ml: 1, mr: 2, minWidth: 100}}
                    color="info"
                    onClick={discardHandle}>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AppSettingsDialog;