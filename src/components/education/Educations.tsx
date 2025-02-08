import { Box, Card, CardContent, Fade, Typography } from "@mui/material";
import { FC, useMemo } from "react";
import { useI18n } from "../../hooks/useI18n";
import useEducationApi from "../../hooks/useEducationApi";
import { State } from "../../models/requestState";
import Error from "../error";

const Educations: FC = () => {

    const { t, formatDate } = useI18n();
    const { educations, getState, list } = useEducationApi({ getOnLoad: true });

    const content = useMemo(() => {
        switch (getState.state) {
            case State.PENDING:
                return (
                    <Card sx={{ width: "300px", height: "450px", display: "flex", flexDirection: "column" }}>
                        <CardContent sx={{ flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        </CardContent>
                    </Card>
                );
            case State.FAILURE:
                return (
                    <Card sx={{ width: "300px", height: "450px", display: "flex", flexDirection: "column" }}>
                        <CardContent sx={{ flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Fade in={true} timeout={1000}>
                                <div>
                                    <Error retryFunction={list} />
                                </div>
                            </Fade>
                        </CardContent>
                    </Card>
                );
            case State.SUCCESS:
                return educations.map((education, index) => (
                    <Card key={index} sx={{ marginBottom: 2 }}>
                        <CardContent>
                            <Box display="flex" justifyContent="space-between" alignItems="stretch" flexGrow={0}>
                                {education.imageUri && (
                                    <Box>
                                        <img src={education.imageUri} alt={`${t("resume.education.image-alt")} ${education.school}`} style={{ objectFit: "contain", maxHeight: "100px", padding: "0.5rem" }} />
                                    </Box>

                                )}
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
                            </Box>
                        </CardContent>
                    </Card>
                ));

        }
    }, [educations, formatDate, getState.state, list, t]);

    return (
        <Fade in={true} timeout={500}>
            <Box>
                {content}
            </Box>
        </Fade>
    );
}

export default Educations;