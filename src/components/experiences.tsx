import { Box, Card, CardActionArea, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import { useI18n } from "../hooks/useI18n.tsx";
import { FC } from "react";

interface IProps {
  sx?: any;
}

const Experiences: FC<IProps> = () => {
  const { t } = useI18n();

  const getI18nKey = (company: string, key: string) => {
    return `resume.experience.companies.${company}.${key}`;
  }

  const companies = ["exco", "koedia", "csm", "nbc", "flo"];

  return (
    <Stack direction={"row"} spacing={2} flexWrap={"wrap"} useFlexGap justifyContent={"center"}>
      {companies.map((company) => (
        <Card sx={{ width: "300px", height: "450px" }} key={company}>
          <CardActionArea sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <CardMedia
              component="img"
              height="160"
              image={t(getI18nKey(company, "image"))}
              aria-hidden={true}
              alt={t(getI18nKey(company, "image-alt"))}
              sx={{ objectFit: "contain", padding: 2 }}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Box display={"flex"} flexDirection={"column"} height={"100%"}>
                <Typography gutterBottom variant="h5" component="div" height={50} alignItems={"center"} display={"flex"} justifyContent={"center"}>
                  {t(getI18nKey(company, "name"))}
                </Typography>
                <Box height={60} alignItems={"center"} display={"flex"} justifyContent={"center"} flexDirection={"column"}>
                  <Typography variant={"subtitle1"} color="text.secondary">
                    {t(getI18nKey(company, "position"))}
                  </Typography>
                  <Typography variant={"subtitle2"} color="text.secondary">
                    {t(getI18nKey(company, "date"))}
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: 'text.secondary', flexGrow: 1, display: 'flex', alignItems: 'center'}}>
                  {t(getI18nKey(company, "description"))}
                </Typography>
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Stack>
  );
}

export default Experiences;