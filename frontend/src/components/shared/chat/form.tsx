import React, {FC, Fragment, useEffect, useState} from 'react';
import {ChatFormWrap} from "./style";
import Grid from "@mui/system/Unstable_Grid";
import {Button, IconButton, InputAdornment, Stack, TextField, Typography, useMediaQuery, useTheme} from "@mui/material";
import {
    AutoFixHigh,
    KeyboardVoice,
    SendOutlined,
    UploadFile
} from "@mui/icons-material";
import {grey} from "@mui/material/colors";
import {BootstrapTooltip} from "@/components/shared/tooltip";
import {useRouter} from "next/router";
import LoadingIcons from "react-loading-icons";
import PromptSelect from "@/components/prompt/select";
import {useStore} from "effector-react";
import $settings from "@/model/settings/store";
import SquareButton from "@/components/shared/button/square";
import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition'
import {getPromptsFx} from "@/model/conversation/effect";
import $conversation from "@/model/conversation/store";
import Feedback from "@/components/feedback";
import {USER_ROLE} from "@/utils/types/user.type";
import $auth from "@/model/auth/store";

interface Props {
    submit: (message: string) => void;
}

const ChatForm: FC<Props> = (props) => {
    const {submit} = props;

    const auth: any = useStore($auth);
    const router: any = useRouter();
    const theme = useTheme();
    const settings = useStore($settings);
    const conversation = useStore($conversation);
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();


    const [message, setMessage] = useState<string>("");
    // const [record, setRecord] = useState<boolean>(false);
    const [prompt, setPrompt] = useState(false);

    if (!browserSupportsSpeechRecognition) {
        console.log("BROWSER IS NOT SUPPORTING")
    }

    const startListening = () => SpeechRecognition.startListening({continuous: true});

    const submitHandle = () => {
        submit(message);
        setMessage("");
        resetTranscript();
    }

    const changePromptHandle = async () => {
        await getPromptsFx()
        setPrompt(true);
    }

    useEffect(() => {
        const keyDownHandle = (event: any) => {
            if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                document?.getElementById("send")?.click();
            }
        }

        document.addEventListener("keypress", keyDownHandle);

        return () => {
            document.removeEventListener("keypress", keyDownHandle)
        }
    }, [])

    useEffect(() => {
        setMessage(transcript)
    }, [transcript, setMessage])


    return (
        <ChatFormWrap
            color="secondary"
            position="relative">
            <Grid
                spacing={isMobile ? 1 : 2}
                container>
                {
                    !isMobile && (
                        <Grid xs={3}>
                            <Stack spacing={1}>
                                <BootstrapTooltip
                                    placement="right"
                                    title={
                                        <Fragment>
                                            <Typography
                                                fontSize={14}
                                                fontWeight={700}>
                                                What is this?
                                            </Typography>
                                            <Typography
                                                fontSize={10}
                                                fontWeight={400}
                                                variant="caption">
                                                This is a button <br/>to manage documents
                                            </Typography><br/>
                                        </Fragment>
                                    }>
                                    <Button
                                        sx={{height: 42}}
                                        onClick={changePromptHandle}
                                        variant="outlined"
                                        fullWidth
                                        startIcon={<AutoFixHigh/>}
                                        color="info">
                                        Manage Prompts&nbsp;
                                    </Button>
                                </BootstrapTooltip>
                                {
                                    auth.user?.role === USER_ROLE.ADMIN && (
                                        <BootstrapTooltip
                                            placement="right"
                                            title={
                                                <Fragment>
                                                    <Typography
                                                        fontSize={14}
                                                        fontWeight={700}>
                                                        What is this?
                                                    </Typography>
                                                    <Typography
                                                        fontSize={10}
                                                        fontWeight={400}
                                                        variant="caption">
                                                        This is the button <br/>
                                                        to upload prompt
                                                    </Typography><br/>
                                                </Fragment>
                                            }>
                                            <Button
                                                onClick={() => {
                                                    router.push("/admin")
                                                }}
                                                sx={{height: 42}}
                                                variant="outlined"
                                                fullWidth
                                                startIcon={<UploadFile/>}
                                                color="info">
                                                Prompt Admin
                                            </Button>
                                        </BootstrapTooltip>
                                    )
                                }
                            </Stack>
                        </Grid>
                    )
                }
                <Grid xs={12} sm={6}>
                    <TextField
                        autoFocus
                        multiline
                        rows={isMobile ? 2 : 4}
                        placeholder="Message @"
                        value={message}
                        onChange={(e) => {
                            setMessage(e.target.value)
                        }}
                        InputProps={{
                            sx: {
                                alignItems: "flex-start",
                                borderRadius: "12px",
                            },
                            endAdornment: (
                                <InputAdornment
                                    sx={{pt: 2}}
                                    position="end">
                                    <Stack sx={{position: "relative"}}>
                                        <BootstrapTooltip
                                            placement="top-end"
                                            title={
                                                <div style={{maxWidth: 150}}>
                                                    <Typography
                                                        fontSize={14}
                                                        fontWeight={700}>
                                                        What is this?
                                                    </Typography>
                                                    <Typography
                                                        fontSize={10}
                                                        fontWeight={400}
                                                        variant="caption">
                                                        Voice input button. Please keep to press button for using voice
                                                        input.
                                                    </Typography><br/>
                                                </div>
                                            }>
                                            <IconButton
                                                onTouchStart={startListening}
                                                onMouseDown={startListening}
                                                onTouchEnd={SpeechRecognition.stopListening}
                                                onMouseUp={SpeechRecognition.stopListening}
                                            >
                                                <KeyboardVoice color={listening ? "secondary" : "info"}/>
                                            </IconButton>
                                        </BootstrapTooltip>
                                        {
                                            listening && (
                                                <LoadingIcons.Audio
                                                    style={{
                                                        position: "absolute",
                                                        bottom: -24,
                                                        right: 10
                                                    }}
                                                    fill={theme.palette.secondary.light}
                                                    height={20}
                                                    width={20}/>
                                            )
                                        }
                                    </Stack>
                                </InputAdornment>
                            )
                        }}
                        fullWidth/>
                </Grid>
                <Grid xs={12} sm={3}>
                    {
                        settings.enter && (
                            <button
                                disabled={!Boolean(message)}
                                onClick={submitHandle}
                                id="send"
                                style={{display: "none"}}
                                aria-label="Send"/>
                        )
                    }
                    <div>
                        <Grid
                            justifyContent="space-between"
                            alignItems="center"
                            container>
                            {
                                isMobile && (
                                    <Grid>
                                        <Stack
                                            sx={{pl: 1}}
                                            spacing={1}
                                            direction="row">
                                            <SquareButton
                                                onClick={() => {
                                                    router.push("/docs")
                                                }}
                                                size="large"
                                                color="info"
                                                variant="outlined">
                                                <AutoFixHigh/>
                                            </SquareButton>
                                            <SquareButton
                                                onClick={changePromptHandle}
                                                size="large"
                                                color="info"
                                                variant="outlined">
                                                <UploadFile/>
                                            </SquareButton>
                                        </Stack>
                                    </Grid>
                                )
                            }
                            <Grid sm={12}>
                                <Button
                                    disabled={!Boolean(message)}
                                    disableElevation
                                    endIcon={<SendOutlined/>}
                                    onClick={submitHandle}
                                    size={!isMobile ? "large" : "medium"}
                                    fullWidth
                                    variant="contained"
                                    color="primary">
                                    Send
                                </Button>
                            </Grid>
                        </Grid>
                    </div>
                    {
                        (settings.enter && !isMobile) && <Typography
                            sx={{
                                pr: 2
                            }}
                            variant="subtitle1"
                            textAlign="right">
                            <Typography
                                color={grey[500]}
                                variant="caption">
                                Press <b>Enter</b> ↵
                            </Typography>
                        </Typography>
                    }
                </Grid>
            </Grid>
            <PromptSelect setOpen={setPrompt} open={prompt}/>
            <Feedback/>
        </ChatFormWrap>
    );
};

export default ChatForm;