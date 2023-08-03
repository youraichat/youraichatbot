import React, {FC, useEffect, useState} from 'react';
import {AdminLayout} from "@/layouts";
import {SeoProps} from "@/utils/types/layout.type";
import {
    Avatar,
    Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper,
    Popover,
    Stack,
    useTheme
} from "@mui/material";
import {AddOutlined, ChatOutlined, DeleteOutline, EditOutlined, MoreVert, Refresh} from "@mui/icons-material";
import NewUser from "@/components/admin/users/new";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import NewPrompt from "@/components/admin/prompt/new";
import {deletePromptApi, promptsApi} from "@/api";
import IconButton from "@mui/material/IconButton";
import dayjs from "dayjs";
import EditPrompt from "@/components/admin/prompt/edit";
import {useStore} from "effector-react";
import $auth from "@/model/auth/store";
import {USER_ROLE} from "@/utils/types/user.type";
import {useRouter} from "next/router";

const pageSeo: SeoProps = {
    title: "Documents Admin"
}


const PromptEditPage: FC = () => {
    const theme = useTheme();
    const auth = useStore($auth);
    const router: any = useRouter();

    const [add, setAdd] = useState(false);
    const [edit, setEdit] = useState(false);
    const [dlt, setDlt] = useState<boolean>(false);
    const [prt, setPrt] = useState<any>({});
    const [prompts, setPrompts] = useState<any[]>([]);
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);


    const handleClick = (event: React.MouseEvent<HTMLButtonElement>, prompt: any) => {
        setAnchorEl(event.currentTarget);
        setPrt(prompt)
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    const getHandle = async () => {
        try {
            const {data}: any = await promptsApi();
            setPrompts(data || [])
        } catch (e) {
            console.warn(e)
        }
    }

    const deleteHandle = async () => {
        try {
            const {data} = await deletePromptApi(prt.id);
            getHandle();
        } catch (e) {
            console.warn(e)
        }
    }


    useEffect(()=> {
        getHandle()
    }, [])

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <AdminLayout seo={pageSeo}>
            <Paper
                elevation={0}>
                <Stack
                    spacing={2}
                    justifyContent="space-between"
                    direction="row"
                    sx={{width: "100%", mb: 2}}>
                    <Stack>
                        <Button
                            color="info"
                            onClick={()=>{}}
                            startIcon={<Refresh/>}
                            variant="outlined">
                            Refresh
                        </Button>
                    </Stack>
                    <Stack direction="row">
                        {
                            (auth.user?.role === USER_ROLE.ADMIN || auth?.user?.role === USER_ROLE.MANAGER) && (
                                <Button
                                    onClick={()=>{setAdd(true)}}
                                    startIcon={<AddOutlined/>}
                                    variant="contained">
                                    New Prompt
                                </Button>
                            )
                        }
                        <NewPrompt refresh={getHandle} setOpen={setAdd} open={add}/>
                        <EditPrompt refresh={getHandle} setOpen={setEdit} open={edit} prompt={prt}/>
                        <Dialog
                            open={dlt}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                            PaperProps={{
                                sx: {
                                    borderRadius: 2,
                                    p: 2
                                }
                            }}>
                            <DialogTitle id="alert-dialog-title">
                                {"Are you sure delete prompt?"}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    Do you want to delete {prt.name}? After delete user, you can&apos;t recover it.
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button color="info" onClick={()=>{setDlt(false)}}>Cancel</Button>
                                <Button
                                    disableElevation
                                    color="error"
                                    variant="contained"
                                    onClick={()=>{setDlt(false); deleteHandle()}}
                                    autoFocus>
                                    Yes, Delete
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </Stack>
                </Stack>
                <TableContainer
                    variant="outlined"
                    sx={{p: 2, borderRadius: 2}}
                    component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell>Title</TableCell>
                                <TableCell>Key</TableCell>
                                <TableCell align="center">Created</TableCell>
                                <TableCell align="center">Updated</TableCell>
                                <TableCell sx={{width: 50}}/>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                prompts.map((prompt) => (
                                    <TableRow key={prompt.id}>
                                        <TableCell sx={{width: 50}}>
                                            <Avatar
                                                sx={{
                                                    width: 90,
                                                    height: 60,
                                                    fontSize: 24,
                                                    borderRadius: 3,
                                                    background: theme.palette.secondary.main,
                                                    color: theme.palette.secondary.contrastText
                                                }}
                                                src={(process.env.API_ENDPOINT || "") + prompt?.photo}
                                                variant="rounded">
                                                {prompt.title?.[0]}
                                            </Avatar>
                                        </TableCell>
                                        <TableCell>{prompt.title}</TableCell>
                                        <TableCell>{prompt.key}</TableCell>
                                        <TableCell align="center">
                                            {
                                                dayjs(prompt.createdAt).format('DD/MM/YYYY')
                                            }
                                        </TableCell>
                                        <TableCell align="center">
                                            {
                                                dayjs(prompt.updatedAt).format('DD/MM/YYYY')
                                            }
                                        </TableCell>
                                        <TableCell align="right" sx={{width: 50}}>
                                            {
                                                auth?.user?.role !== USER_ROLE.USER ? (
                                                    <IconButton
                                                        onClick={(e)=>{handleClick(e, prompt)}}
                                                        size="small">
                                                        <MoreVert/>
                                                    </IconButton>
                                                ) : (
                                                    <IconButton onClick={()=>{router.push("/")}}>
                                                        <ChatOutlined/>
                                                    </IconButton>
                                                )
                                            }
                                            <Popover
                                                id={id}
                                                open={open}
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
                                                }}>
                                                <List>
                                                    <ListItemButton
                                                        onClick={()=>{
                                                            setEdit(true);
                                                            handleClose();
                                                        }}>
                                                        <ListItemIcon>
                                                            <EditOutlined />
                                                        </ListItemIcon>
                                                        <ListItemText primary={<b>Edit</b>} />
                                                    </ListItemButton>
                                                    <ListItemButton
                                                        onClick={()=>{ setDlt(true); setAnchorEl(null)}}>
                                                        <ListItemIcon>
                                                            <DeleteOutline />
                                                        </ListItemIcon>
                                                        <ListItemText primary={<b>Delete</b>} />
                                                    </ListItemButton>
                                                </List>
                                            </Popover>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </AdminLayout>
    );
};

export default PromptEditPage;