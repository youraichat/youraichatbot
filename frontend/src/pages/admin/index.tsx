import React, {FC} from 'react';
import {AdminLayout} from "@/layouts";
import {SeoProps} from "@/utils/types/layout.type";
import {Button, Card, CardContent, Typography} from "@mui/material";
import Grid from "@mui/system/Unstable_Grid";

const pageSeo: SeoProps = {
    title: "Documents Admin"
}

const AdminLogin: FC = () => {

    return (
        <AdminLayout seo={pageSeo}>
            <Grid
                spacing={3}
                container>
                <Grid>
                    <Card
                        elevation={0}
                        sx={{
                            borderRadius: 3,
                            p: 1,
                            m: 0,
                            width: 300,
                            height: 160,
                            border: "1px solid #8e8e8e"
                        }}>
                        <CardContent>
                            <Typography
                                mb={1}
                                fontSize={18}
                                textTransform="uppercase"
                                fontWeight={900}
                                variant="h3">
                                How to start?
                            </Typography>
                            <Typography
                                fontSize={14}
                                mb={1.5}
                                fontWeight={600}>
                                This is the explain for how to start this channel.
                            </Typography>
                            <Button
                                color="info"
                                size="small"
                                variant="outlined"
                                href="http://youraichatbot.com/docs">
                                Read More
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid>
                    <Card
                        elevation={0}
                        sx={{
                            borderRadius: 3,
                            p: 1,
                            m: 0,
                            width: 300,
                            height: 160,
                            border: "1px solid #8e8e8e"
                        }}>
                        <CardContent>
                            <Typography
                                mb={1}
                                fontSize={18}
                                textTransform="uppercase"
                                fontWeight={900}
                                variant="h3">
                                How to Update Profile?
                            </Typography>
                            <Typography
                                fontSize={14}
                                mb={1.5}
                                fontWeight={600}>
                                You can update your profile by click below link.
                            </Typography>
                            <Button
                                color="info"
                                size="small"
                                variant="outlined"
                                href="/admin/profile">
                                Update Profile
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </AdminLayout>
    );
};

export default AdminLogin;