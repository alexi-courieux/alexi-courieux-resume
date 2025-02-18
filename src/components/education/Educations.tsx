import { Box, Card, CardContent, Fade, Typography, useTheme as muiTheme } from "@mui/material";
import { FC, useMemo } from "react";
import { useI18n } from "../../hooks/useI18n";
import useEducationApi from "../../hooks/useEducationApi";
import { State } from "../../models/requestState";
import ErrorMessage from "../ErrorMessage";
import Loading from "../loading";
import {useTheme } from "../../hooks/useTheme";
import { ThemeMode } from "../../contextProviders/ThemeContext";

const Educations: FC = () => {

    const { t, formatDate } = useI18n();
    const { educations, getState, list } = useEducationApi({ getOnLoad: true });

    const theme = muiTheme();
    const isMobile = theme.breakpoints.down('md');
    const themeMode = useTheme().mode;

    const content = useMemo(() => {
        switch (getState.state) {
            case State.PENDING:
                return (
                    <Card sx={{ mb: 2 }}>
                        <CardContent>
                            <Loading messageKey="resume.education.loading" />
                        </CardContent>
                    </Card>
                );
            case State.FAILURE:
                return (
                    <Card sx={{ mb: 2 }}>
                        <CardContent sx={{ flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <div>
                                <ErrorMessage retryFunction={list} />
                            </div>
                        </CardContent>
                    </Card>
                );
            case State.SUCCESS:
                return educations.map((education, index) => (
                    <Fade in={true} timeout={500 * (index + 1)} key={education.id}>
                        <Card key={education.id} sx={{ marginBottom: 2 }}>
                            <CardContent>
                                <Box display="flex" justifyContent="space-between" alignItems="stretch" flexGrow={0} flexDirection={isMobile ? "column" : "row"}>
                                    {education.imageUri && (
                                        <Box>
                                            <img src={themeMode === ThemeMode.Dark ? education.imageUriDark ?? education.imageUri : education.imageUri} alt={education.imageAlt} style={{ objectFit: "contain", maxHeight: "100px", maxWidth: "100%", padding: "0.5rem" }} />
                                        </Box>

                                    )}
                                    {!isMobile && (
                                        <Box display={"flex"} justifyContent={"space-between"} alignItems={"flex-start"} flexGrow={1} p={1}>
                                            <Box textAlign={"left"}>
                                                <Typography variant="h5" component="div" color="textPrimary">
                                                    {education.degree}
                                                </Typography>
                                                <Typography variant="subtitle1" color="textSecondary">
                                                    {education.school} - {education.location}
                                                </Typography>
                                            </Box>
                                            <Box textAlign="right">
                                                <Typography variant="subtitle1" color="textSecondary">
                                                    {education.endDate ? formatDate(education.endDate) : t("resume.education.present")}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    )}
                                    {isMobile && (
                                        <Box display={"flex"} justifyContent={"space-between"} alignItems={"stretch"} flexGrow={1} p={1} flexDirection={"column"}>
                                            <Box textAlign="right">
                                                <Typography variant="subtitle1" color="textSecondary">
                                                    {education.endDate ? formatDate(education.endDate) : t("resume.education.present")}
                                                </Typography>
                                            </Box>
                                            <Box textAlign={"left"}>
                                                <Typography variant="h6" component="div" color="textPrimary">
                                                    {education.degree}
                                                </Typography>
                                                <Typography variant="subtitle1" color="textSecondary">
                                                    {education.school} - {education.location}
                                                </Typography>
                                            </Box>
                                            
                                        </Box>
                                    )}
                                </Box>
                            </CardContent>
                        </Card>
                    </Fade>
                ));

        }
    }, [educations, formatDate, getState.state, isMobile, list, t]);

    return (
        <Fade in={true} timeout={500}>
            <Box>
                {content}
            </Box>
        </Fade>
    );
}

export default Educations;