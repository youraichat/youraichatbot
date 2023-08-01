import React, {FC, Fragment, useEffect, useState} from 'react';
import DocTile from "./tile";
import Grid from "@mui/system/Unstable_Grid";
import {
    Box,
    Button,
    ButtonGroup,
    Card,
    CardContent, Checkbox,
    Divider, FormControlLabel, IconButton, LinearProgress,
    Pagination, Paper,
    Stack,
    Typography, useMediaQuery, useTheme
} from "@mui/material";
import {
    AddOutlined, CloseOutlined, DeleteOutlined,
    FilterList, GetApp,
    GridView,
    ReorderOutlined,
    UploadOutlined
} from "@mui/icons-material";
import {useStore} from "effector-react";
import $theme from "@/model/theme/store";
import SquareButton from "@/components/shared/button/square";
import {changeViewEvent} from "@/model/theme/event";
import {deleteDocApi, docsApi, uploadDocApi} from "@/api";
import LoadingIcons from "react-loading-icons";
import DeleteConformation from "@/components/conversation/confirm";

const DocList: FC = () => {
    const themeSettings = useStore($theme);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [upload, setUpload] = useState(false);
    const [docs, setDocs] = useState<{ filename: string, type: string }[]>([]);
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [uploading, setUploading] = useState<boolean>(false);
    const [dlt, setDlt] = useState<boolean>(false);
    const [selected, setSelected] = useState<string[]>([]);

    const getHandle = async () => {
        try {
            setLoading(true)
            const {data} = await docsApi();
            setDocs(data.documents);
            setLoading(false)
        } catch (e) {
            console.warn(e);
            setLoading(false)
        }
    }

    const changeHandle = (e: any) => {
        setFile(e.target.files[0])
    }

    const uploadHandle = async () => {
        if (!file) {
            return
        }
        setUploading(true)
        const formData = new FormData();
        formData.append("file", file);

        await uploadDocApi(formData);
        setUploading(false);
        setFile(null);
        setUpload(false)
        await getHandle();
    }

    const selectHandle = (id: string) => {
        setSelected([...selected, id])
    }

    const deselectHandle = (id: string) => {
        setSelected(selected.filter((i) => i !== id))
    }

    const submitHandle = async (confirm: boolean) => {
        if (confirm) {
            await deleteDocApi(selected.join(","));
            setSelected([])
            await getHandle()
        }

        setDlt(false);
    }

    useEffect(() => {
        getHandle();
    }, [])

    return (
        <Box sx={{p: 2}}>
            <DeleteConformation
                open={dlt}
                callback={submitHandle}
                title={`Delete ${selected.length} Files`}
                description="Are you sure delete these documents?"/>
            <Grid
                spacing={2}
                container>
                <Grid
                    sx={{textAlign: "right"}}
                    xs={12}>
                    <Stack
                        sx={{width: "100%"}}
                        justifyContent="space-between"
                        spacing={2}
                        direction="row">
                        <Stack
                            justifyContent="space-between"
                            spacing={2}
                            direction="row">
                            <Button
                                startIcon={
                                    <AddOutlined/>
                                }
                                onClick={() => {
                                    setUpload(true)
                                }}
                                color="primary"
                                disableElevation
                                variant="contained">
                                Upload {!isMobile && "new file"}
                            </Button>
                        </Stack>
                        <Stack
                            justifyContent="space-between"
                            spacing={2}
                            direction="row">
                            <ButtonGroup sx={{ml: "auto"}}>
                                <Button
                                    onClick={() => {
                                        changeViewEvent("list")
                                    }}
                                    variant={themeSettings.view === "list" ? "contained" : "outlined"}
                                    color="info">
                                    <ReorderOutlined/>
                                </Button>
                                <Button
                                    onClick={() => {
                                        changeViewEvent("tile")
                                    }}
                                    variant={themeSettings.view === "tile" ? "contained" : "outlined"}
                                    color="info">
                                    <GridView/>
                                </Button>
                            </ButtonGroup>
                            <SquareButton
                                color="info"
                                variant="text">
                                <FilterList/>
                            </SquareButton>
                        </Stack>
                    </Stack>
                </Grid>
                {
                    upload && (
                        <Grid xs={12}>
                            <Card
                                sx={{
                                    borderRadius: "12px",
                                    boxShadow: "rgba(0, 0, 0, 0.1) 0 1px 3px 0, rgba(27, 31, 35, 0.15) 0 0 0 1px",
                                }}>
                                <CardContent style={{paddingBottom: "16px"}}>
                                    {
                                        uploading ?
                                            (
                                                <Fragment>
                                                    <LinearProgress
                                                        sx={{height: 14, borderRadius: 2}}
                                                        color="info"/>
                                                </Fragment>
                                            ) :
                                            (
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
                                                                accept=".pdf,.txt"
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
                                                    <Stack
                                                        sx={{
                                                            width: isMobile ?"100%":"auto"
                                                        }}
                                                        justifyContent="flex-end"
                                                        alignItems="center"
                                                        spacing={1}
                                                        direction="row">
                                                        <Button
                                                            onClick={uploadHandle}
                                                            disabled={!Boolean(file?.name)}
                                                            variant="contained">
                                                            Submit
                                                        </Button>
                                                        <Button
                                                            onClick={() => {
                                                                setUpload(false)
                                                            }}
                                                            color="info">
                                                            Cancel
                                                        </Button>
                                                    </Stack>
                                                </Stack>
                                            )
                                    }
                                </CardContent>
                            </Card>
                        </Grid>
                    )
                }
                <Grid xs={12}>
                    <Divider/>
                </Grid>
                <Grid xs={12}>
                    {
                        themeSettings.checkbox && (
                            <Paper
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
                                                indeterminate={selected.length > 0 && selected.length < docs.length}
                                                checked={docs.length === selected.length}
                                                onChange={(e) => {
                                                    e.target.checked ? setSelected(docs.map((d) => d.filename)) : setSelected([])
                                                }}
                                                size="small"
                                                color="info"/>}
                                            label="Select all"/>
                                    </Stack>
                                    <Stack
                                        alignItems="center"
                                        spacing={1}
                                        direction="row">
                                        <Typography variant="subtitle1">
                                            {selected.length} docs selected -
                                        </Typography>
                                        {
                                            isMobile ? (
                                                <SquareButton
                                                    onClick={() => {
                                                        setDlt(true)
                                                    }}
                                                    disabled={selected.length === 0}
                                                    variant="contained"
                                                    color="error">
                                                    <DeleteOutlined/>
                                                </SquareButton>
                                            ) : (
                                                <Button
                                                    onClick={() => {
                                                        setDlt(true)
                                                    }}
                                                    disabled={selected.length === 0}
                                                    startIcon={<DeleteOutlined/>}
                                                    variant="contained"
                                                    color="error">
                                                    Delete
                                                </Button>
                                            )
                                        }
                                    </Stack>
                                </Stack>
                            </Paper>
                        )
                    }
                </Grid>
                <Grid xs={12}>
                    <Divider/>
                </Grid>
                {
                    loading ?
                        <Grid
                            sx={{
                                textAlign: "center",
                                minHeight: 500,
                                justifyContent: "center",
                                alignItems: "center",
                                display: "flex"
                            }}
                            xs={12}>
                            <LoadingIcons.Puff
                                style={{}}
                                fill={theme.palette.secondary.light}
                                height={40}
                                width={40}/>
                        </Grid> :
                        docs.map((d, index) => (
                            <Grid
                                key={`doc-${index}`}
                                xs={12}
                                md={{
                                    full: 4,
                                    xl: 4,
                                    lg: 6,
                                    md: 6,
                                }[themeSettings.container]}
                                lg={{
                                    full: 3,
                                    xl: 3,
                                    lg: 3,
                                    md: 4,
                                }[themeSettings.container]}>
                                <DocTile
                                    selectDoc={selectHandle}
                                    deselectDoc={deselectHandle}
                                    selected={selected.includes(d.filename)}
                                    getHandle={getHandle}
                                    doc={d}/>
                            </Grid>
                        ))
                }
                <Grid xs={12}>
                    <Divider/>
                </Grid>
                <Grid xs={12}>
                    <div style={{display: "flex", justifyContent: "flex-end"}}>
                        <Pagination/>
                    </div>
                </Grid>
            </Grid>
        </Box>
    );
};

export default DocList;