import React, {FC, Fragment, useState} from 'react';
import {
    Box,
    Button,
    Checkbox,
    Divider,
    FormControlLabel,
    List,
    Paper,
    Stack,
    Typography,
    useMediaQuery, useTheme
} from "@mui/material";
import ChatItem from "@/components/shared/chat/item";
import $conversation from "@/model/conversation/store";
import {useStore} from "effector-react";
import {DeleteOutlined, GetApp} from "@mui/icons-material";
import $theme from "@/model/theme/store";
import DeleteConformation from "@/components/conversation/confirm";
import {deleteMultiMessagesFx} from "@/model/conversation/effect";
import {downloadConversationJson} from "@/utils/libs/downloadJson";
import SquareButton from "@/components/shared/button/square";

interface Props {
}

const ChatList: FC<Props> = (props) => {
    const conversation = useStore($conversation);
    const themeSettings = useStore($theme)
    const [selected, setSelected] = useState<string[]>([]);
    const [dlt, setDlt] = useState<boolean>(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const selectHandle = (id: string) => {
        setSelected([...selected, id])
    }

    const deselectHandle = (id: string) => {
        setSelected(selected.filter((i: string) => i !== id))
    }

    const selectAllHandle = () => {
        setSelected(conversation.messages.map((message) => message.id))
    }

    const deselectedAllHandle = () => {
        setSelected([])
    }

    const deleteMultiHandle = async (confirm: boolean) => {
        if(confirm) {
            await deleteMultiMessagesFx(selected);
            setSelected([])
        }
        setDlt(false)
    }

    const exportHandle = async () => {
        const messages = conversation.messages.filter((msg) => selected.includes(msg.id))
        if(messages.length > 0) {
            downloadConversationJson(messages);
        }
    }


    return (
        <Fragment>
            {
                themeSettings.checkbox && (
                    <Fragment>
                        <Paper
                            sx={{p: "8px 16px"}}
                            elevation={0}
                            color="secondary"
                            component="main">
                            <Stack
                                sx={{width: "100%"}}
                                justifyContent="space-between"
                                spacing={2}
                                direction="row">
                                <Stack
                                    alignItems="center"
                                    direction="row"
                                    spacing={1}>
                                    <FormControlLabel
                                        control={<Checkbox
                                            indeterminate={selected.length > 0 && selected.length < conversation.messages.length}
                                            checked={conversation.messages.length === selected.length}
                                            onChange={(e)=>{
                                                e.target.checked ? selectAllHandle() : deselectedAllHandle()
                                            }}
                                            size="small"
                                            color="info"/>}
                                        label={`Select All`}/>
                                </Stack>
                                <Stack
                                    alignItems="center"
                                    spacing={1}
                                    direction="row">
                                    <Typography variant="subtitle1">
                                        {selected.length} items {!isMobile && "selected"} -
                                    </Typography>
                                    {
                                        isMobile ? (
                                            <SquareButton
                                                disabled={selected.length === 0}
                                                variant="contained"
                                                color="error"
                                                onClick={()=>{setDlt(true)}}>
                                                <DeleteOutlined/>
                                            </SquareButton>
                                        ) : (
                                            <Button
                                                onClick={()=>{setDlt(true)}}
                                                disabled={selected.length === 0}
                                                startIcon={<DeleteOutlined/>}
                                                variant="contained"
                                                color="error">
                                                Delete
                                            </Button>
                                        )
                                    }
                                    {
                                        isMobile ? (
                                            <SquareButton
                                                onClick={exportHandle}
                                                disabled={selected.length === 0}
                                                variant="contained"
                                                color="primary">
                                                <GetApp/>
                                            </SquareButton>
                                        ) : (
                                            <Button
                                                onClick={exportHandle}
                                                disabled={selected.length === 0}
                                                startIcon={<GetApp/>}
                                                variant="contained"
                                                color="primary">
                                                Export
                                            </Button>
                                        )
                                    }

                                </Stack>
                            </Stack>
                        </Paper>
                        <Divider/>
                    </Fragment>
                )
            }
            <Box
                sx={{
                    flex: 1,
                    display: "flex",
                    position: "relative"
                }}>
                <List
                    sx={{
                        position: "absolute",
                        width: '100%',
                        height: "100%",
                        overflowY: "auto",
                        display: "flex",
                        flexDirection: "column-reverse",
                        bgcolor: 'background.paper' 
                    }}>
                    {
                        conversation.messages.filter((message) => message.prompt === conversation.prompt).map((i) => (
                            <ChatItem
                                selected={selected.includes(i.id)}
                                selectHandle={selectHandle}
                                deselectHandle={deselectHandle}
                                message={i}
                                key={i.id}/>
                        ))
                    }
                </List>
            </Box>
            <DeleteConformation
                title={`Delete ${selected.length} Messages`}
                description="Are you sure to delete these messages?"
                open={dlt}
                callback={deleteMultiHandle}/>
        </Fragment>
    );
};

export default ChatList;