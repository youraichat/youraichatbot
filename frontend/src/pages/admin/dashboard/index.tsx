import React from 'react';
import {NextPage} from "next";
import {AdminLayout} from "@/layouts";
import Content from "@/components/shared/paper/content";
import Grid from "@mui/system/Unstable_Grid";
import {Card, CardContent, Typography} from "@mui/material";

const DashboardPage: NextPage = () => {
    return (
        <AdminLayout>
            <Content>
                <Grid
                    spacing={3}
                    container>
                    <Grid xs={3}>
                        <Card
                            sx={{
                                borderRadius:3
                            }}>
                            <CardContent>
                                <Typography
                                    sx={{ fontSize: 14 }}
                                    fontWeight={700}
                                    color="text.secondary"
                                    gutterBottom>
                                    Weekly Visits
                                </Typography>
                                <Typography
                                    lineHeight={1}
                                    fontSize={42}
                                    variant="h5"
                                    component="div">
                                    12
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid xs={3}>
                        <Card
                            sx={{
                                borderRadius:3
                            }}>
                            <CardContent>
                                <Typography
                                    sx={{ fontSize: 14 }}
                                    fontWeight={700}
                                    color="text.secondary"
                                    gutterBottom>
                                    Weekly Visits
                                </Typography>
                                <Typography
                                    lineHeight={1}
                                    fontSize={42}
                                    variant="h5"
                                    component="div">
                                    12
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid xs={3}>
                        <Card
                            sx={{
                                borderRadius:3
                            }}>
                            <CardContent>
                                <Typography
                                    sx={{ fontSize: 14 }}
                                    fontWeight={700}
                                    color="text.secondary"
                                    gutterBottom>
                                    Weekly Visits
                                </Typography>
                                <Typography
                                    lineHeight={1}
                                    fontSize={42}
                                    variant="h5"
                                    component="div">
                                    12
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid xs={3}>
                        <Card
                            sx={{
                                borderRadius:3
                            }}>
                            <CardContent>
                                <Typography
                                    sx={{ fontSize: 14 }}
                                    fontWeight={700}
                                    color="text.secondary"
                                    gutterBottom>
                                    Weekly Visits
                                </Typography>
                                <Typography
                                    lineHeight={1}
                                    fontSize={42}
                                    variant="h5"
                                    component="div">
                                    123,432,2
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Content>
        </AdminLayout>
    );
};

export default DashboardPage;