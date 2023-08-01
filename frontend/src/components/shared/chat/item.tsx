import React, {FC, Fragment, useState} from 'react';
import {
    ListItemAvatar,
    ListItemText,
    Checkbox,
    Avatar,
    Divider,
    IconButton,
    ListItem,
    Paper,
    Stack,
    Typography, useTheme, Chip, Badge
} from "@mui/material";
import {ContentCopy, DeleteOutlined, ThumbDown, ThumbDownOutlined, ThumbUp, ThumbUpOutlined} from "@mui/icons-material";
import {useStore} from "effector-react";
import $theme from "@/model/theme/store";
import LoadingIcons from 'react-loading-icons'
import {MessageType} from "@/model/conversation/store";
import dayjs from "dayjs";
import DeleteConformation from "@/components/conversation/confirm";
import {deleteMessageFx, updateMessageFx} from "@/model/conversation/effect";
import {useMessage} from "@/model/message";
import {BootstrapTooltip} from "@/components/shared/tooltip";
import $auth from "@/model/auth/store";

interface Props {
    selected: boolean;
    message: MessageType;
    selectHandle: (id: string) => void;
    deselectHandle: (id: string) => void;
}

const ChatItem: FC<Props> = (props) => {
    const {message, selected, selectHandle, deselectHandle} = props;
    let msg = message.text.split("\nSOURCES: ")
    if (msg[0][0] === " ") {
        msg[0] = msg[0].substring(1)
    }

    const theme = useTheme();
    const auth = useStore($auth);
    const themeSettings = useStore($theme);
    const [hover, setHover] = useState<boolean>(false);
    const [dlt, setDlt] = useState<boolean>(false);
    const {notify} = useMessage();


    const copyText = () => {
        navigator.clipboard.writeText(msg[0]);
        notify({
            type: "success",
            title: "Success!",
            message: "Successfully copied to clipboard."
        })
    }

    const deleteText = (val: boolean) => {
        if (val) {
            deleteMessageFx(message)
        }
        setDlt(false);
    }


    return (
        <Fragment>
            <DeleteConformation
                title="Delete Message"
                description="Are you sure to delete this message?"
                open={dlt}
                callback={deleteText}/>
            <ListItem
                onMouseEnter={() => {
                    setHover(true)
                }}
                onMouseLeave={() => {
                    setHover(false)
                }}
                secondaryAction={
                    hover ?
                        <Paper
                            sx={{
                                borderRadius: "12px",
                                padding: "4px 12px",
                                boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px"
                            }}>
                            <Stack
                                spacing={1}
                                direction="row">
                                {
                                    message.sender !== "you" && (
                                        <Fragment>
                                            <BootstrapTooltip
                                                placement="top"
                                                title="like">
                                                <IconButton
                                                    onClick={() => {
                                                        updateMessageFx({...message, like: message.like === 1 ? 0 : 1})
                                                    }}
                                                    size="small"
                                                    color={message.like > 0 ? "secondary" : "info"}>
                                                    <ThumbUpOutlined sx={{fontSize: 20}}/>
                                                </IconButton>
                                            </BootstrapTooltip>
                                            <BootstrapTooltip
                                                placement="top"
                                                title="Dislike">
                                                <IconButton
                                                    onClick={() => {
                                                        updateMessageFx({...message, like: message.like === -1 ? 0 : -1})
                                                    }}
                                                    size="small"
                                                    color={message.like < 0 ? "secondary" : "info"}>
                                                    <ThumbDownOutlined sx={{fontSize: 20}}/>
                                                </IconButton>
                                            </BootstrapTooltip>
                                        </Fragment>
                                    )
                                }
                                <BootstrapTooltip
                                    placement="top"
                                    title="copy">
                                    <IconButton
                                        onClick={copyText}
                                        size="small"
                                        color="info">
                                        <ContentCopy sx={{fontSize: 20}}/>
                                    </IconButton>
                                </BootstrapTooltip>
                                <BootstrapTooltip
                                    placement="top"
                                    title="delete">
                                    <IconButton
                                        onClick={() => {
                                            setDlt(true)
                                        }}
                                        size="small"
                                        color="info">
                                        <DeleteOutlined/>
                                    </IconButton>
                                </BootstrapTooltip>
                            </Stack>
                        </Paper> :
                        <></>
                }
                alignItems="flex-start">
                {
                    themeSettings.checkbox &&
                    <Checkbox
                        checked={selected}
                        onChange={(e) => {
                            e.target.checked ? selectHandle(message.id) : deselectHandle(message.id)
                        }}
                        size="small"
                        className="list-item-checkbox"
                        color="info"
                        edge="end"
                        inputProps={{'aria-labelledby': "id"}}
                    />
                }
                <ListItemAvatar>
                    <Badge
                        color="secondary"
                        badgeContent={
                            message.like > 0 ?
                                <ThumbUp sx={{fontSize: 12}}/> :
                                message.like < 0 ?
                                    <ThumbDown sx={{fontSize: 12}}/> :
                                    0
                        }>
                        <Avatar
                            sx={{borderRadius: '10px', background: "#F6e009", color: "#1f1f1f", fontWeight: 700}}
                            alt="Travis Howard"
                            src={message.sender === "you" ? ((process.env.API_ENDPOINT || "") + auth?.user?.photo) || "" : "/bot.jpg"}>
                            D
                        </Avatar>
                    </Badge>

                </ListItemAvatar>
                <ListItemText
                    primary={<b>{message.sender === "you" ? "You" : "Chat Bot"}</b>}
                    secondary={message.typing ?
                        (
                            <LoadingIcons.ThreeDots
                                width={30}
                                fill={theme.palette.secondary.light}
                            />
                        ) : (
                            <Fragment>
                                <Typography
                                    sx={{whiteSpace: "pre-wrap"}}
                                    component="span"
                                    variant="body2"
                                    dangerouslySetInnerHTML={{__html: msg[0]}}
                                    color="text.primary"
                                />
                                {
                                    msg[1] && <Chip
                                        color="info"
                                        variant="outlined"
                                        sx={{mt: 1}}
                                        size="small"
                                        label={"source: " + msg[1]}/>
                                }
                            </Fragment>
                        )
                    }
                />

            </ListItem>
            <Divider
                sx={{fontSize: "11px"}}
                component="li">
                {dayjs(message.updated).fromNow()}
            </Divider>
        </Fragment>
    );
};

export default ChatItem;