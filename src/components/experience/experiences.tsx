import { Box, Card, CardActionArea, CardContent, CardMedia, Fade, Stack, Typography, useMediaQuery, useTheme as muiTheme } from "@mui/material";
import { useI18n } from "../../hooks/useI18n.tsx";
import { FC, useMemo, useState } from "react";
import ExperienceModal from "./experienceModal.tsx";
import useExperienceApi from "../../hooks/useExperienceApi.tsx";
import { State } from "../../models/requestState.ts";
import Loading from "../loading.tsx";
import ErrorMessage from "../ErrorMessage.tsx";
import { ExperienceSchema } from "../../api/generated/types.gen.ts";
import { useTheme } from "../../hooks/useTheme.tsx";
import { ThemeMode } from "../../contextProviders/ThemeContext.ts";

interface IProps {
  sx?: any;
}

const Experiences: FC<IProps> = ({ sx }) => {
  const { t, formatDate } = useI18n();

  const [modalExperience, setModalExperience] = useState<ExperienceSchema | null>(null);
  const { experiences, getState, list } = useExperienceApi({ getOnLoad: true });
  
  const theme = muiTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const themeMode = useTheme().mode;

  const content = useMemo(() => {
    const emptyCard = (
      <Card sx={{ width: "300px", height: "450px", display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
  
        </CardContent>
      </Card>
    );

    switch (getState.state) {
      case State.PENDING:
        return (
          <>
            {!isMobile && emptyCard}
            <Card sx={{ width: "300px", height: "450px", display: "flex", flexDirection: "column" }}>
              <CardContent sx={{ flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Loading messageKey="resume.experience.loading" />
              </CardContent>
            </Card>
            {!isMobile && emptyCard}
          </>
        );
      case State.FAILURE:
        return (
          <>
            {!isMobile && emptyCard}
            
            <Card sx={{ width: "300px", height: "450px", display: "flex", flexDirection: "column" }}>
              <CardContent sx={{ flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Fade in={true} timeout={1000}>
                  <div>
                    <ErrorMessage retryFunction={list} />
                  </div>
                </Fade>
              </CardContent>
            </Card>
            {!isMobile && emptyCard}
          </>
        );
      case State.SUCCESS:
        return (
          <>
            {Array.isArray(experiences) && experiences.map((experience, index) => (
              <Fade in={true} key={experience.id} timeout={500 * (index + 1)}>
                <Card sx={{ width: "300px", height: "450px" }} key={experience.id}>
                  <CardActionArea
                    onClick={() => setModalExperience(experience)}
                    sx={{ height: "100%", display: "flex", flexDirection: "column" }}
                    aria-label={t("resume.experience.modal.aria-label", { companyName: experience.companyName })}>
                    <CardMedia
                      component="img"
                      height="160"
                      image={themeMode === ThemeMode.Dark ? experience.imageUriDark ?? experience.imageUri : experience.imageUri}
                      alt={experience.imageAlt}
                      sx={{ objectFit: "contain", padding: 2 }}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box display={"flex"} flexDirection={"column"} height={"100%"}>
                        <Typography gutterBottom variant="h5" component="div" height={50} alignItems={"center"} display={"flex"} justifyContent={"center"}>
                          {experience.companyName}
                        </Typography>
                        <Box height={60} alignItems={"center"} display={"flex"} justifyContent={"center"} flexDirection={"column"}>
                          <Typography variant={"subtitle1"} color="text.secondary">
                            {experience.position}
                          </Typography>
                          <Typography variant={"subtitle2"} color="text.secondary">
                            {formatDate(experience.startDate, "MMMM yyyy", true)} - {experience.endDate ? formatDate(experience.endDate, "MMMM yyyy", true) : t("resume.experience.present")}
                          </Typography>
                        </Box>
                        <Typography variant="body2" sx={{ color: 'text.secondary', flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                          {experience.shortDescription}
                        </Typography>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Fade>
            ))}
          </>
        );
      default:
        return null;
    }
  }, [experiences, formatDate, getState.state, isMobile, list, t]);
  
  return (
    <>
      <Stack direction={"row"} spacing={2} flexWrap={"wrap"} useFlexGap justifyContent={"center"} sx={{ ...sx }}>
        {content}
      </Stack>
      <ExperienceModal modalExperience={modalExperience} setModalExperience={setModalExperience} />
    </>
  )
}

export default Experiences;