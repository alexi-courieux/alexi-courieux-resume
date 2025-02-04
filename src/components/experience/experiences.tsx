import { Box, Card, CardActionArea, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import { useI18n } from "../../hooks/useI18n.tsx";
import { FC, useState } from "react";
import ExperienceModal from "./experienceModal.tsx";
import useExperienceApi from "../../hooks/useExperienceApi.tsx";
import { State } from "../../models/requestState.ts";
import Loading from "../loading.tsx";

interface IProps {
  sx?: any;
}

const Experiences: FC<IProps> = () => {
  const { t } = useI18n();

  const getI18nKey = (company: string, key: string) => {
    return `resume.experience.companies.${company}.${key}`;
  }

  const [modalCompany, setModalCompany] = useState<string | null>(null);
  const { experiences, getState } = useExperienceApi({getOnLoad: true});

  switch (getState.state) {
    case State.PENDING:
      return <Loading messageKey="resume.experience.loading"/>;
    case State.FAILURE:
      return <Typography>Error loading experiences</Typography>;
    case State.SUCCESS:
      return (
      <>
        <Stack direction={"row"} spacing={2} flexWrap={"wrap"} useFlexGap justifyContent={"center"}>
          {Array.isArray(experiences) && experiences.map((experience) => (
            <Card sx={{ width: "300px", height: "450px" }} key={experience.company}>
              <CardActionArea
                onClick={() => setModalCompany(experience.company)}
                sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                <CardMedia
                  component="img"
                  height="160"
                  image={t(getI18nKey(experience.company, "image"))}
                  aria-hidden={true}
                  alt={t(getI18nKey(experience.company, "image-alt"))}
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
                        {experience.startDate?.toString()} - {experience.endDate ? experience.endDate.toString() : "Present"}
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: 'text.secondary', flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                      {experience.shortDescription}
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Stack>
        <ExperienceModal modalCompany={modalCompany} setModalCompany={setModalCompany} />
      </>
      );
    }
}

export default Experiences;