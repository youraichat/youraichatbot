import React, {FC, Fragment, useEffect, useState} from 'react';
import SpeedDial from "@mui/material/SpeedDial";
import {CloseOutlined, Comment, RateReview, ThumbDown, ThumbsUpDown, ThumbUp, UploadOutlined} from "@mui/icons-material"
import {
    Box,
    Button, Checkbox,
    Fade, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem,
    Modal, Paper,
    Rating, Select,
    SpeedDialAction,
    Stack,
    TextField,
    Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SquareButton from "@/components/shared/button/square";
import {useStore} from "effector-react";
import $conversation from "@/model/conversation/store";
import {createFeedbackApi} from "@/api";

const Feedback: FC = () => {
    const actions = [
        {icon: <ThumbUp color="info"/>, name: 'Like This Prompt', key: "like"},
        {icon: <ThumbDown color="info"/>, name: 'Dislike This Prompt', key: "dislike"},
    ];

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const conversation = useStore($conversation);

    const [open, setOpen] = useState<boolean>(false);
    const [file, setFile] = useState<File | null>(null);
    const [like, setLike] = useState(false);
    const [rate, setRate] = useState<number | null>(0);
    const [loading, setLoading] = useState(false);
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("abc");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const changeHandle = (e: any) => {
        setFile(e.target.files[0])
    }

    const submitHandle = async () => {
        const payload = {
            title: title,
            description: description,
            messages: JSON.stringify(conversation.messages.filter((message) => message.prompt === conversation.prompt)),
            question: conversation.messages.find((message) => message.id === question)?.text,
            answer: conversation.messages.find((message) => message.id === answer)?.text,
            like: like,
            rate: rate,
            prompt: conversation.prompt
        }

        try {
            const {data} = await createFeedbackApi(payload);
            setTitle("");
            setDescription("");
            setLike(false);
            setRate(0);
            setQuestion("");
            setAnswer("abc");
            setSubmitted(true);
        } catch (e) {
            console.warn(e)
        }

    }

    const rateHandle = (_: any, newVal: number | null) => {
        console.log(newVal);
        setRate(newVal)
    }

    useEffect(() => {
        if (rate && parseInt(rate?.toString()) > 5) {
            setLike(true)
        } else {
            setLike(false)
        }
    }, [rate])


    useEffect(() => {
        const messages = conversation.messages;

        if (!!question) {
            // const message = messages.filter((msg) => msg.id === question)
            messages.map((msg, index) => {
                console.log(msg, index)
                if (msg.id === question) {
                    setAnswer(messages[index - 1]?.id)
                }
            })
        }
    }, [question])


    return (
        <div>
            <SpeedDial
                FabProps={{
                    color: "warning"
                }}
                ariaLabel="SpeedDial basic example"
                sx={{position: 'absolute', bottom: 16, right: 16}}
                icon={<SpeedDialIcon icon={<ThumbsUpDown/>}/>}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        onClick={() => {
                            setOpen(true);
                            setLike(action.key === "like")
                        }}
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        FabProps={{
                            color: "secondary"
                        }}
                    />
                ))}
            </SpeedDial>
            <Modal
                onClose={() => {
                    setOpen(false)
                }}
                open={open}>
                <Fade in={open}>
                    <Box sx={style}>
                        {
                            submitted ? (
                                <Fragment>
                                    <Typography
                                        mb={2}
                                        fontWeight={700}
                                        fontSize={32}>
                                        Thank You for Your Feedback!
                                    </Typography>
                                    <Typography mb={2}>
                                        We appreciate your valuable feedback! Your input will play a crucial role in
                                        enhancing our chatbot&apos;s performance and providing a better user experience for
                                        everyone.
                                        <br/><br/>
                                        We are committed to continuous improvement, and your participation helps us
                                        achieve that goal. Our team will carefully review your feedback to identify
                                        areas of improvement and implement necessary changes.
                                    </Typography>
                                    <Button
                                        size="large"
                                        variant="contained"
                                        color="primary"
                                        onClick={()=>{setOpen(false)}}>
                                        Okay, Close
                                    </Button>
                                </Fragment>
                            ) : (
                                <Fragment>
                                    <Typography
                                        pl={2}
                                        pb={.5}
                                        variant="h1"
                                        fontSize="24px"
                                        fontWeight="700"
                                        textAlign="left">
                                        Help Us Improve Your Experience!
                                    </Typography>
                                    <Typography
                                        pl={2.1}
                                        fontSize={14}
                                        mb={1}>
                                        Your feedback is invaluable to us! We want to enhance our chatbot to better
                                        serve your needs. Please take a moment to share your thoughts and experiences
                                        with us. Whether you encountered a helpful response or faced challenges, your
                                        feedback will guide us in delivering a more seamless and personalized
                                        interaction.
                                    </Typography>
                                    <Stack
                                        spacing={3}
                                        direction="row"
                                        sx={{mb: 3, pl: 2}}>
                                        <Rating
                                            value={rate}
                                            onChange={rateHandle}
                                            sx={{label: {fontSize: "24px"}}}
                                            size="large"
                                            name="rate"
                                            max={10}/>
                                        {
                                            like ? <ThumbUp color="secondary"/> : <ThumbDown color="secondary"/>
                                        }
                                    </Stack>

                                    <Stack sx={{mb: 2}}>
                                        <label>Review Title</label>
                                        <TextField
                                            value={title}
                                            onChange={(e) => {
                                                setTitle(e.target.value)
                                            }}
                                            id="title"
                                            name="title"
                                            placeholder="Review Title"
                                            InputProps={{
                                                sx: {borderRadius: "10px"},
                                                type: "text",
                                            }}
                                            fullWidth/>
                                    </Stack>

                                    <Stack sx={{mb: 2}}>
                                        <label>Message</label>
                                        <TextField
                                            value={description}
                                            onChange={(e) => {
                                                setDescription(e.target.value)
                                            }}
                                            multiline
                                            rows={4}
                                            id="description"
                                            name="description"
                                            placeholder="Message"
                                            InputProps={{
                                                sx: {borderRadius: "10px"},
                                                type: "text",
                                            }}
                                            fullWidth/>
                                    </Stack>
                                    {/*
                        <Stack
                                sx={{width: "100%", mb: 2}}
                                justifyContent="space-between"
                                alignItems={isMobile ? "flex-start" : "center"}
                                spacing={1}
                                direction={isMobile ? "column" : "row"}>
                                <Stack
                                    sx={{width: '100%'}}
                                    spacing={2}
                                    alignItems="center"
                                    direction="row">
                                    <Button
                                        component="label"
                                        variant="outlined"
                                        startIcon={<UploadOutlined/>}
                                        color="info">
                                        Choose File
                                        <input
                                            accept=".jpg,.png,.jpeg"
                                            onChange={changeHandle}
                                            id="file"
                                            hidden
                                            type="file"/>
                                    </Button>
                                    <Typography
                                        variant="caption">
                                        {file ? file.name.substring(0, 6) + "..." + file.name.slice(-10) : "No file chosen"}
                                    </Typography>
                                    {
                                        file?.name && (
                                            <SquareButton
                                                color="info"
                                                size="small"
                                                sx={{ml: 1}}
                                                onClick={() => {
                                                    setFile(null);

                                                }}>
                                                <CloseOutlined/>
                                            </SquareButton>
                                        )
                                    }
                                </Stack>
                            </Stack>*/}
                                    <Stack sx={{mb: 2}}>
                                        <label>You asked:</label>
                                        <Select
                                            onChange={(e: any) => {
                                                setQuestion(e.target.value)
                                            }}
                                            sx={{borderRadius: "10px"}}
                                            fullWidth>
                                            {
                                                conversation.messages?.filter((message) =>
                                                    (message.sender === "you" && message.prompt === conversation.prompt))?.map((value, index) => (
                                                    <MenuItem key={`ask-${index}`}
                                                              value={value.id}>{value.text}</MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </Stack>

                                    <Stack sx={{mb: 2}}>
                                        <label>The answer:</label>
                                        <Select
                                            value={answer}
                                            disabled
                                            sx={{borderRadius: "10px"}}
                                            fullWidth>
                                            <MenuItem key={`answer`} value="abc"></MenuItem>
                                            {
                                                conversation.messages?.filter((message) =>
                                                    (message.sender !== "you" || message.prompt === conversation.prompt))?.map((value, index) => (
                                                    <MenuItem key={`answer-${index}`}
                                                              value={value.id}>{value.text}</MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </Stack>

                                    <Button
                                        onClick={submitHandle}
                                        id="submit"
                                        name="submit"
                                        sx={{height: 56}}
                                        size="large"
                                        color="primary"
                                        variant="contained">
                                        Submit Feedback
                                    </Button>
                                </Fragment>
                            )
                        }
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
};


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    maxWidth: 650,
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 24,
    borderRadius: "12px",
    p: 4,
};

export default Feedback;