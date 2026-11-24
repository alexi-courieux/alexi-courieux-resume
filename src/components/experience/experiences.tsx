import { Box, ButtonBase, Skeleton, Typography, useTheme as muiTheme } from "@mui/material";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { FC, useState } from "react";
import { useI18n } from "../../hooks/useI18n.tsx";
import ExperienceModal from "./experienceModal.tsx";
import { State } from "../../models/requestState.ts";
import ErrorMessage from "../ErrorMessage.tsx";
import { ExperienceSchema } from "../../api/generated/types.gen.ts";
import { useTheme } from "../../hooks/useTheme.tsx";
import { ThemeMode } from "../../contextProviders/ThemeContext.ts";
import { radius } from "../../theme/theme.ts";

interface IProps {
  experiences: ExperienceSchema[];
  state: State;
  retry: () => void;
}

const Experiences: FC<IProps> = ({ experiences, state, retry }) => {
  const { t, formatDate } = useI18n();
  const [modalExperience, setModalExperience] = useState<ExperienceSchema | null>(null);
  const theme = muiTheme();
  const themeMode = useTheme().mode;
  const dark = theme.palette.mode === "dark";

  if (state === State.FAILURE) {
    return <ErrorMessage retryFunction={retry} />;
  }

  if (state !== State.SUCCESS) {
    return (
      <Box role="status" aria-label={t("resume.experience.loading")} sx={{ display: "grid", gap: 2 }}>
        {[0, 1, 2].map((i) => (
          <Skeleton key={i} variant="rounded" height={170} sx={{ borderRadius: `${radius.card}px` }} />
        ))}
      </Box>
    );
  }

  return (
    <>
      <Box component="ol" sx={{ listStyle: "none", m: 0, p: 0, display: "grid", gap: 2 }}>
        {experiences.map((experience) => {
          const logo = themeMode === ThemeMode.Dark ? experience.imageUriDark ?? experience.imageUri : experience.imageUri;
          const dates = `${formatDate(experience.startDate, "MMMM yyyy", true)} – ${experience.endDate ? formatDate(experience.endDate, "MMMM yyyy", true) : t("resume.experience.present")}`;
          return (
            <Box component="li" key={experience.id}>
              <ButtonBase
                onClick={() => setModalExperience(experience)}
                aria-label={t("resume.experience.modal.aria-label", { companyName: experience.companyName })}
                sx={{
                  display: "block", width: "100%", textAlign: "left", borderRadius: `${radius.card}px`, p: { xs: 2.5, md: 4 }, minWidth: 0, overflowWrap: "anywhere",
                  bgcolor: "background.paper", border: `1px solid ${theme.palette.divider}`,
                  transition: "transform .2s, border-color .2s",
                  "&:hover, &:focus-visible": { transform: "translateY(-2px)", borderColor: "text.primary" },
                  "&:hover .arrow, &:focus-visible .arrow": { transform: "translate(3px,-3px)", opacity: 1 },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 2, md: 3 }, mb: 2.5 }}>
                  <Box
                    sx={{
                      width: { xs: 48, md: 64 }, height: { xs: 48, md: 64 }, flexShrink: 0, borderRadius: `${radius.control}px`, p: 1, display: "grid", placeItems: "center",
                      bgcolor: dark ? "rgba(255,255,255,.06)" : "#fff", border: `1px solid ${theme.palette.divider}`,
                    }}
                  >
                    <Box component="img" src={logo} alt={experience.imageAlt} sx={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
                  </Box>
                  <Box sx={{ minWidth: 0, flexGrow: 1 }}>
                    <Typography variant="h5" component="h3" sx={{ lineHeight: 1.2, fontSize: { xs: "1.2rem", md: "1.5rem" } }}>{experience.companyName}</Typography>
                    <Typography sx={{ fontWeight: 700 }}>{experience.position}</Typography>
                  </Box>
                  <Typography color="text.secondary" sx={{ display: { xs: "none", md: "block" }, fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap" }}>
                    {dates}
                  </Typography>
                  <ArrowOutwardIcon className="arrow" aria-hidden sx={{ opacity: 0.5, transition: "transform .2s, opacity .2s", alignSelf: "flex-start" }} />
                </Box>
                <Typography color="text.secondary" sx={{ display: { md: "none" }, fontSize: "0.95rem", mb: 1.5 }}>
                  {dates}
                </Typography>
                <Typography>{experience.shortDescription}</Typography>
              </ButtonBase>
            </Box>
          );
        })}
      </Box>
      <ExperienceModal modalExperience={modalExperience} setModalExperience={setModalExperience} />
    </>
  );
};

export default Experiences;
