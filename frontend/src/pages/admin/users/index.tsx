import React, {useEffect, useState} from 'react';
import {NextPage} from "next";
import {AdminLayout} from "@/layouts";

import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {deleteUserApi, promptsApi, updateUserApi, usersApi} from "@/api";
import {AddOutlined, DeleteOutline, EditOutlined, MoreVert, Refresh} from "@mui/icons-material";
import {
    Autocomplete,
    Avatar,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    MenuItem,
    Popover,
    Select,
    Stack,
    Switch,
    TextField,
    useTheme
} from "@mui/material";
import NewUser from "@/components/admin/users/new";
import dayjs from "dayjs";
import {USER_ROLE} from "@/utils/types/user.type";
import {useStore} from "effector-react";
import $auth from "@/model/auth/store";
import EditUser from "@/components/admin/users/edit";


const UsersPage: NextPage = () => {
    const theme = useTheme();
    const auth = useStore($auth);

    const [users, setUsers] = useState<any[]>([]);
    const [selected, setSelected] = useState<any>({})
    const [add, setAdd] = useState<boolean>(false);
    const [edit, setEdit] = useState<boolean>(false);
    const [dlt, setDlt] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [prompts, setPrompts] = useState([]);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>, user: any) => {
        setAnchorEl(event.currentTarget);
        setSelected(user)
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const getHandle = async () => {
        usersApi()
            .then(({data}) => {
                setUsers(data)
            })
            .catch(e => {
                console.warn(e)
            });

        promptsApi()
            .then(({data}: any) =>{
                setPrompts(data)
            })
    }


    const updateUserHandle = async (id: string, val: any) => {
        await updateUserApi({id, ...val})
        getHandle();
    }


    const deleteHandle = async () => {
        try {
            const {data}: any = await deleteUserApi(selected.id);
            getHandle();
            setDlt(false);
        } catch (e) {
            console.warn(e)
        }
    }

    useEffect(() => {
        getHandle();
    }, [])


    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;


    return (
        <AdminLayout>
            <Box>
                <Stack
                    spacing={2}
                    justifyContent="space-between"
                    direction="row"
                    sx={{width: "100%", mb: 2}}>
                    <Stack>
                        <Button
                            color="info"
                            onClick={getHandle}
                            startIcon={<Refresh/>}
                            variant="outlined">
                            Refresh
                        </Button>
                    </Stack>
                    <Stack direction="row">
                        <Button
                            onClick={() => {
                                setAdd(true)
                            }}
                            startIcon={<AddOutlined/>}
                            variant="contained">
                            New User
                        </Button>
                        <NewUser refresh={getHandle} setOpen={setAdd} open={add}/>
                        <EditUser user={selected} refresh={getHandle} setOpen={setEdit} open={edit}/>
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
                            }}
                        >
                            <DialogTitle id="alert-dialog-title">
                                {"Are you sure delete user?"}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    Do you want to delete {selected?.firstname} {selected?.lastname}? After delete user,
                                    you can&apos;t recover it.
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button
                                    color="info"
                                    onClick={() => {
                                    setDlt(false)
                                }}>
                                    Cancel
                                </Button>
                                <Button
                                    disableElevation
                                    color="error"
                                    variant="contained"
                                    onClick={deleteHandle}
                                    autoFocus>
                                    Yes, Delete
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </Stack>
                </Stack>
                <TableContainer
                    variant="outlined"
                    elevation={0}
                    sx={{p: 2, borderRadius: 2}}
                    component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell/>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Role</TableCell>
                                <TableCell>Prompts</TableCell>
                                <TableCell align="center">Created</TableCell>
                                <TableCell align="center">Active</TableCell>
                                <TableCell sx={{width: 50}}/>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                users.map((user: any) => (
                                    <TableRow key={user.id}>
                                        <TableCell sx={{width: 50}}>
                                            <Avatar
                                                src={process.env.API_ENDPOINT + user.photo}
                                                sx={{
                                                    fontWeight: 900,
                                                    color: theme.palette.primary.contrastText
                                                }}
                                                variant="rounded">
                                                {user.firstname?.[0]?.toUpperCase()}
                                            </Avatar>
                                        </TableCell>
                                        <TableCell>
                                            {user.firstname} {user.lastname}
                                        </TableCell>
                                        <TableCell>
                                            {user.email}
                                        </TableCell>
                                        <TableCell sx={{width: 160}}>
                                            <Select
                                                disabled={user.id === auth.user?.id}
                                                fullWidth
                                                onChange={(e) => {
                                                    updateUserHandle(user.id, {role: e.target.value})
                                                }}
                                                size="small"
                                                value={user.role}>
                                                <MenuItem value={USER_ROLE.USER}>
                                                    USER
                                                </MenuItem>
                                                <MenuItem value={USER_ROLE.SUPPORT}>
                                                    SUPPORT
                                                </MenuItem>
                                                <MenuItem value={USER_ROLE.MANAGER}>
                                                    MANAGER
                                                </MenuItem>
                                                <MenuItem value={USER_ROLE.ADMIN}>
                                                    ADMIN
                                                </MenuItem>
                                            </Select>
                                        </TableCell>
                                        <TableCell>
                                            <Autocomplete
                                                disabled={[USER_ROLE.ADMIN, USER_ROLE.MANAGER].includes(user.role)}
                                                multiple
                                                id="tags-outlined"
                                                options={prompts}
                                                onChange={(_, newVal)=>{updateUserHandle(user.id, {prompts: newVal.map((prmpt: any)=>(prmpt?.id))})}}
                                                getOptionLabel={(option: any) => option.title}
                                                value={user.prompts}
                                                renderInput={(params: any) => (
                                                    <TextField
                                                        {...params}
                                                        size="small"
                                                        placeholder="Prompts"
                                                    />
                                                )}
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            {
                                                dayjs(user.createdAt).format('DD/MM/YYYY')
                                            }
                                        </TableCell>
                                        <TableCell align="center">
                                            <Switch
                                                disabled={user.id === auth.user?.id}
                                                onChange={(_, newVal) => {
                                                    updateUserHandle(user.id, {isActive: newVal})
                                                }}
                                                checked={user.isActive}
                                                color="info"/>
                                        </TableCell>

                                        <TableCell align="right" sx={{width: 50}}>
                                            <IconButton
                                                disabled={user.id === auth.user?.id}
                                                onClick={(e) => {
                                                    handleClick(e, user)
                                                }}
                                                size="small">
                                                <MoreVert/>
                                            </IconButton>
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
                                                        onClick={() => {
                                                            setEdit(true);
                                                            handleClose();
                                                        }}>
                                                        <ListItemIcon>
                                                            <EditOutlined/>
                                                        </ListItemIcon>
                                                        <ListItemText primary={<b>Edit</b>}/>
                                                    </ListItemButton>
                                                    <ListItemButton
                                                        onClick={() => {
                                                            setAnchorEl(null);
                                                            setDlt(true)
                                                        }}>
                                                        <ListItemIcon>
                                                            <DeleteOutline/>
                                                        </ListItemIcon>
                                                        <ListItemText primary={<b>Delete</b>}/>
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
            </Box>
        </AdminLayout>
    );
};


export default UsersPage;