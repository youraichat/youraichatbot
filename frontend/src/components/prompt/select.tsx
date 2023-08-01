import React, {FC, useEffect} from 'react';
import {
    Avatar, Box,
    Button,
    ButtonBase,
    Card,
    CardContent,
    Dialog,
    DialogContent,
    DialogTitle,
    Typography, useTheme
} from "@mui/material";
import Grid from "@mui/system/Unstable_Grid";
import {BuildCircle, CloseOutlined, Upcoming} from "@mui/icons-material";
import {useStore} from "effector-react";
import $conversation from "@/model/conversation/store";
import {selectPromptEvent} from "@/model/conversation/event";
import {getPromptsFx} from "@/model/conversation/effect";

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const PromptSelect: FC<Props> = (props) => {
    const {open, setOpen} = props;
    const {prompts, prompt} = useStore($conversation);
    const conversation = useStore($conversation);

    const theme = useTheme();

    const selectPromptHandle = (prompt: any) => {
        selectPromptEvent(prompt.id);
        setOpen(false);
    }

    useEffect(()=>{
        getPromptsFx()
    }, [])

    return (
        <Dialog
            onClose={()=>{setOpen(false)}}
            BackdropProps={{
                style: {
                    background: "rgba(59,59,73,0.63)",
                    backdropFilter: "blur(4px)"
                }
            }}
            PaperProps={{
                style: {
                    width: 800,
                    borderRadius: 12,
                },
                sx: {
                    bg: "background.paper",
                    backgroundImage: "none"
                }
            }}
            open={open || !conversation.prompt}>
            <DialogContent>
                <Grid
                    spacing={2}
                    container>
                    {

                        prompts.length > 0 ?
                        prompts.map((prp) => (
                            <Grid
                                xs={3}
                                key={prp.id}>
                                <ButtonBase
                                    onClick={()=>{selectPromptHandle(prp)}}
                                    sx={{width: "100%", borderRadius: 3}}
                                >
                                    <Card
                                        sx={{width: "100%", borderRadius: 3}}
                                        variant="outlined">
                                        <CardContent sx={{p: 1}} style={{paddingBottom: 8}}>
                                            <Avatar
                                                sx={{
                                                    width: "100%",
                                                    height: 90,
                                                    fontSize: 24,
                                                    borderRadius: 3,
                                                    mb: 0.5,
                                                    background: theme.palette.secondary.main,
                                                    color: theme.palette.secondary.contrastText
                                                }}
                                                src={(process.env.API_ENDPOINT || "") + prp?.photo}>

                                            </Avatar>
                                            <Typography
                                                mb={0}
                                                textAlign="center">
                                                {prp.title}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </ButtonBase>
                            </Grid>
                        )) : (
                            <Box sx={{p: 3, width: "100%"}}>
                                <Typography
                                    mb={2}
                                    fontWeight={900}
                                    fontSize={32}
                                    textAlign="center">
                                    You can&apos;t use right now.
                                </Typography>
                                <Typography
                                    fontWeight={600}
                                    mb={1}
                                    fontSize={20}
                                    textAlign="center">
                                    You are not assigned to any prompt yet, <br/>or there is not available prompt here.
                                </Typography>
                                <Typography
                                    fontSize={16}
                                    textAlign="center">
                                    * To resolve this, please contact with Administrator
                                </Typography>
                            </Box>
                        )
                    }
                </Grid>
            </DialogContent>
        </Dialog>
    );
};

export default PromptSelect;