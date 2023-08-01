import React, {FC} from 'react';
import {Box, Divider, Fade, Modal, Paper, Rating, Stack, Typography} from "@mui/material";
import {Psychology, PsychologyAlt, QuestionMark, SmartToy, ThumbDown, ThumbUp} from "@mui/icons-material";

interface Props {
    open: boolean;
    setOpen: (value: boolean) => void;
    history: any;
}

const ViewChatHistory: FC<Props> = (props) => {
    const {open, setOpen, history} = props;

    const messages = JSON.parse(history?.messages || "[]");

    return (
        <Modal
            onClose={()=>{setOpen(false)}}
            open={open}>
            <Fade in={open}>
                <Box sx={style}>

                    <Stack
                        sx={{mb: 2}}
                        spacing={3}
                        alignItems="center"
                        direction="row">
                        {
                            history.like ? <ThumbUp sx={{fontSize: 42}} color="success"/>: <ThumbDown sx={{fontSize: 42}} color="error"/>
                        }
                        <Stack>
                            <Typography
                                mb={1}
                                fontSize={18}
                                fontWeight={700}
                                variant="h3">
                                {history?.title}
                            </Typography>

                            <Typography
                                sx={{whiteSpace: "pre-wrap"}}
                                fontSize={14}
                                fontWeight={500}
                                variant="caption">
                                {history?.description}
                            </Typography>
                        </Stack>
                    </Stack>

                    <Rating
                        value={history.rate}
                        readOnly
                        sx={{label: {fontSize: "12"}, mb: 2}}
                        size="medium"
                        name="small"
                        max={10} />

                    <Paper variant="outlined" sx={{p:2, mb: 2, overflowY: "auto"}}>
                        <Typography
                            textTransform="uppercase"
                            fontSize={12}
                            fontWeight={700}>
                            Mentioned message by reviewer
                        </Typography>
                        <Typography py={1} px={2}>
                            <b>QUESTION:</b> {history.question}
                        </Typography>
                        <Typography px={2}>
                            <b>ANSWER:</b> {history.answer}
                        </Typography>
                    </Paper>

                    <Paper variant="outlined" sx={{height: 200, p:2, overflowY: "auto"}}>
                        {
                            messages.reverse()?.map((message: any, index: number) => (
                                <Stack key={index}>
                                    {
                                        message.sender !== "bot" && (
                                            <Stack
                                                sx={{p: 1}}
                                                spacing={2}
                                                direction="row">
                                                <Typography
                                                    fontWeight={700}
                                                    color="secondary"
                                                    component="span">
                                                    <QuestionMark/>
                                                </Typography>
                                                <Typography>
                                                    {message.text}
                                                </Typography>
                                            </Stack>
                                        )
                                    }
                                    {
                                        message.sender === "bot" && (
                                            <Stack
                                                sx={{p: 1, pl: 4}}
                                                spacing={2}
                                                direction="row">
                                                <Typography
                                                    fontWeight={700}
                                                    color="secondary"
                                                    component="span">
                                                    <Psychology/>
                                                </Typography>
                                                <Typography>
                                                    {message.text}
                                                </Typography>
                                            </Stack>
                                        )
                                    }
                                    {
                                        message.sender === "bot" && (
                                            <Divider/>
                                        )
                                    }
                                </Stack>
                            ))
                        }
                    </Paper>
                </Box>
            </Fade>
        </Modal>
    );
};


const style = {
    position: 'absolute' as 'absolute',
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


export default ViewChatHistory;