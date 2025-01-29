import { Card, CardActionArea, CardContent, CardMedia, Stack, Typography } from "@mui/material";
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
    <Stack direction={"row"} spacing={2}>
      {companies.map((company) => (
        <Card sx={{ width: "33%" }} key={company}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={t(getI18nKey(company, "image"))}
              aria-hidden={true}
              alt={t(getI18nKey(company, "image-alt"))}
              sx={{ objectFit: "contain" }}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {t(getI18nKey(company, "name"))}
              </Typography>
              <Typography variant={"subtitle1"} color="text.secondary">
                {t(getI18nKey(company, "position"))}
              </Typography>
              <Typography variant={"subtitle2"} color="text.secondary">
                {t(getI18nKey(company, "date"))}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {t(getI18nKey(company, "description"))}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Stack>
  );
}

export default Experiences;