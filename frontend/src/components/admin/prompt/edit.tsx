import React, {FC, useEffect, useState} from 'react';
import {
    Box,
    Button,
    Fade,
    IconButton,
    Modal,
    Stack,
    TextField,
    Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";
import {CloseOutlined, UploadOutlined} from "@mui/icons-material";
import {updatePromptApi} from "@/api";
import SquareButton from "@/components/shared/button/square";


interface Props {
    open: boolean;
    setOpen: (value: boolean) => void;
    refresh: () => void;
    prompt: any;
}


const EditPrompt: FC<Props> = (props) => {
    const {open, setOpen, refresh, prompt} = props;
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [title, setTitle] = useState<string>("");
    const [key, setKey] = useState<string>("");
    const [file, setFile] = useState<File | null>(null);
    const [upload, setUpload] = useState(false);

    const createHandle = async () => {
        const formData: FormData = new FormData();
        if(file) {
            formData.append("file", file)
        }

        formData.append("id", prompt.id);
        formData.append("title", title);
        formData.append("key", key)


        await updatePromptApi(formData);

        setOpen(false);
        refresh();
    }

    const changeHandle = async (e: any) => {
        setFile(e.target.files[0])
    }


    useEffect(()=>{
        setTitle(prompt.title);
        setKey(prompt.key);
        setFile(null);
    },[prompt])


    return (
        <Modal open={open}>
            <Fade in={open}>
                <Box sx={style}>
                    <IconButton
                        onClick={()=>{setOpen(false)}}
                        sx={{position: "absolute", top: 20, right: 24}}>
                        <CloseOutlined/>
                    </IconButton>
                    <Stack spacing={0}>
                        <Typography
                            pl={2}
                            pb={2}
                            variant="h1"
                            fontSize="24px"
                            fontWeight="700"
                            textAlign="left">
                            Edit Prompt
                        </Typography>
                        <Stack spacing={2}>
                            <Stack
                                sx={{width: "100%"}}
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
                                            accept=".jpeg,.png,jpg"
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
                            </Stack>
                            <TextField
                                id="title"
                                name="title"
                                placeholder="Prompt Title @ "
                                value={title}
                                onChange={(e) => {
                                    setTitle(e.target.value)
                                }}
                                InputProps={{
                                    sx: {borderRadius: "10px"},
                                    type: "text",
                                }}
                                fullWidth/>
                            <TextField
                                id="key"
                                name="key"
                                placeholder="Prompt Key @ "
                                value={key}
                                onChange={(e) => {
                                    setKey(e.target.value)
                                }}
                                InputProps={{
                                    sx: {borderRadius: "10px"},
                                    type: "text",
                                }}
                                fullWidth/>
                            <Button
                                onClick={createHandle}
                                variant="contained"
                                size="large">
                                Update Prompt
                            </Button>
                        </Stack>
                    </Stack>
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

export default EditPrompt;