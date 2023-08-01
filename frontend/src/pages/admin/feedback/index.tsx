import React, {useEffect, useState} from 'react';
import {NextPage} from "next";
import {AdminLayout} from "@/layouts";
import {
    Avatar,
    Box, Button, ButtonGroup, Rating, Stack, Typography
} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {getFeedbacksApi} from "@/api";
import feedback from "@/components/feedback";
import {History, ThumbDown, ThumbsUpDown, ThumbUp} from "@mui/icons-material";
import {USER_ROLE} from "@/utils/types/user.type";
import IconButton from "@mui/material/IconButton";
import {BootstrapTooltip} from "@/components/shared/tooltip";
import ViewChatHistory from "@/components/admin/feedback/viewHistory";
import dayjs from "dayjs";


const FeedbackPage: NextPage = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [hopen, setHopen] = useState(false);
    const [history, setHistory] = useState<any>({});
    const [filter, setFilter] = useState<"all" | "dislike" | "like">("all");

    const getHandle = async () => {
        try {
            const {data} = await getFeedbacksApi();

            setFeedbacks(data)
        } catch (e) {
            console.warn(e)
        }
    }


    useEffect(()=>{
        getHandle()
    },[])


    return (
        <AdminLayout>
            <Box sx={{mb: 2}}>
                <Stack>
                    <ButtonGroup>
                        <Button
                            onClick={()=>{setFilter("like")}}
                            variant={filter === "like" ? "contained" : "outlined"}
                            color="info"
                            startIcon={<ThumbUp/>}>
                            Like
                        </Button>
                        <Button
                            onClick={()=>{setFilter("dislike")}}
                            variant={filter === "dislike" ? "contained" : "outlined"}
                            color="info"
                            startIcon={<ThumbDown/>}>
                            Dislike
                        </Button>
                        <Button
                            onClick={()=>{setFilter("all")}}
                            variant={filter === "all" ? "contained" : "outlined"}
                            color="info"
                            startIcon={<ThumbsUpDown/>}>
                            All Feedback
                        </Button>
                    </ButtonGroup>
                </Stack>
            </Box>
            <Box>
                <TableContainer
                    variant="outlined"
                    elevation={0}
                    sx={{p: 2, borderRadius: 2}}
                    component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Like</TableCell>
                                <TableCell>Rate</TableCell>
                                <TableCell>Title</TableCell>
                                <TableCell>Prompt</TableCell>
                                <TableCell>Reviewer</TableCell>
                                <TableCell>Created</TableCell>
                                <TableCell sx={{width: 50}}/>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                feedbacks.filter((feedback: any) => filter === "all" ? true : filter === "like" ? feedback.like : !feedback.like ).map((item: any, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            {
                                                item.like ? <ThumbUp color="success"/>: <ThumbDown color="error"/>
                                            }
                                        </TableCell>
                                        <TableCell>
                                            <Rating
                                                value={item.rate}
                                                readOnly
                                                sx={{label: {fontSize: "12"}}}
                                                size="medium"
                                                name="small"
                                                max={10} />
                                        </TableCell>
                                        <TableCell>
                                            {item.title}
                                        </TableCell>
                                        <TableCell>
                                            {item.prompt?.title}
                                        </TableCell>
                                        <TableCell>
                                            <Stack
                                                spacing={1}
                                                alignItems="center"
                                                direction="row">
                                                <Avatar src={(process.env.API_ENDPOINT || "") + item.author?.photo}>
                                                    {item.author?.firstname?.[0]}
                                                </Avatar>
                                                <Stack>
                                                    <Typography
                                                        fontSize={14}
                                                        fontWeight={700}>
                                                        {item.author?.firstname} {item.author?.lastname}
                                                    </Typography>
                                                    <Typography
                                                        fontSize={10}
                                                        fontWeight={700}>
                                                        {item.author?.role === USER_ROLE.ADMIN && "Administrator"}
                                                        {item.author?.role === USER_ROLE.MANAGER && "Manager"}
                                                        {item.author?.role === USER_ROLE.USER && "User"}
                                                        {item.author?.role === USER_ROLE.SUPPORT && "Support"}
                                                    </Typography>
                                                </Stack>
                                            </Stack>
                                        </TableCell>
                                        <TableCell>
                                            {
                                                dayjs(item.createdAt).format('DD/MM/YYYY')
                                            }
                                        </TableCell>
                                        <TableCell>
                                            <BootstrapTooltip title="Read Chat History">
                                                <IconButton onClick={()=>{setHopen(true); setHistory(item)}}>
                                                    <History/>
                                                </IconButton>
                                            </BootstrapTooltip>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            <ViewChatHistory history={history} open={hopen} setOpen={setHopen}/>
        </AdminLayout>
    );
};

export default FeedbackPage;