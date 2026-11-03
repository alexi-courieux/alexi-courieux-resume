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
import Reveal from "../layout/Reveal.tsx";
import { fontMono } from "../../theme/theme.ts";

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
      <Box role="status" aria-label={t("resume.experience.loading")} sx={{ display: "grid", gap: 3 }}>
        {[0, 1, 2].map((i) => (
          <Skeleton key={i} variant="rounded" height={170} sx={{ borderRadius: 5 }} />
        ))}
      </Box>
    );
  }

  return (
    <>
      <Box
        component="ol"
        sx={{
          listStyle: "none", m: 0, p: 0, position: "relative",
          // timeline rail
          "&::before": {
            content: '""', position: "absolute", top: 8, bottom: 8, left: { xs: 7, md: 221 }, width: 2,
            background: `linear-gradient(to bottom, ${theme.palette.primary.main}, ${theme.palette.secondary.main}, transparent)`,
            opacity: 0.55,
          },
        }}
      >
        {experiences.map((experience, index) => {
          const logo = themeMode === ThemeMode.Dark ? experience.imageUriDark ?? experience.imageUri : experience.imageUri;
          const dates = `${formatDate(experience.startDate, "MMMM yyyy", true)} – ${experience.endDate ? formatDate(experience.endDate, "MMMM yyyy", true) : t("resume.experience.present")}`;
          return (
            <Box component="li" key={experience.id} sx={{ position: "relative", pb: { xs: 4, md: 5 }, "&:last-of-type": { pb: 0 } }}>
              <Reveal delay={Math.min(index, 3) * 80}>
                <Box sx={{ display: "grid", gridTemplateColumns: { xs: "16px 1fr", md: "190px 16px 1fr" }, columnGap: { xs: 2.5, md: 3 }, alignItems: "start" }}>
                  {/* date column (desktop) */}
                  <Typography
                    component="div"
                    sx={{ display: { xs: "none", md: "block" }, textAlign: "right", fontFamily: fontMono, fontSize: "0.85rem", color: "text.secondary", pt: 3.2 }}
                  >
                    {dates}
                  </Typography>
                  {/* node */}
                  <Box
                    aria-hidden
                    sx={{
                      mt: 3.4, width: 16, height: 16, borderRadius: "50%", bgcolor: "background.default",
                      border: `3px solid ${theme.palette.primary.main}`,
                      boxShadow: `0 0 0 5px ${dark ? "rgba(143,155,255,.15)" : "rgba(67,56,202,.12)"}`,
                      position: "relative", zIndex: 1,
                      transition: "background-color .2s",
                      ...(experience.endDate ? {} : { bgcolor: "primary.main" }),
                    }}
                  />
                  {/* card */}
                  <ButtonBase
                    onClick={() => setModalExperience(experience)}
                    aria-label={t("resume.experience.modal.aria-label", { companyName: experience.companyName })}
                    sx={{
                      display: "block", width: "100%", textAlign: "left", borderRadius: 5, p: { xs: 2.5, md: 3.5 },
                      bgcolor: "background.paper", border: `1px solid ${theme.palette.divider}`,
                      transition: "transform .25s, border-color .25s, box-shadow .25s",
                      "&:hover, &:focus-visible": {
                        transform: "translateY(-4px)", borderColor: "primary.main",
                        boxShadow: `0 20px 50px -24px ${theme.palette.primary.main}`,
                      },
                      "&:hover .arrow, &:focus-visible .arrow": { transform: "translate(3px,-3px)", opacity: 1 },
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2.5, mb: 2 }}>
                      <Box
                        sx={{
                          width: 64, height: 64, flexShrink: 0, borderRadius: 3, p: 1, display: "grid", placeItems: "center",
                          bgcolor: dark ? "rgba(255,255,255,.05)" : "#fff", border: `1px solid ${theme.palette.divider}`,
                        }}
                      >
                        <Box component="img" src={logo} alt={experience.imageAlt} sx={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
                      </Box>
                      <Box sx={{ minWidth: 0, flexGrow: 1 }}>
                        <Typography variant="h5" component="h3" sx={{ lineHeight: 1.2 }}>{experience.companyName}</Typography>
                        <Typography color="primary" sx={{ fontWeight: 700 }}>{experience.position}</Typography>
                      </Box>
                      <ArrowOutwardIcon className="arrow" aria-hidden sx={{ opacity: 0.4, transition: "transform .25s, opacity .25s", color: "primary.main", alignSelf: "flex-start" }} />
                    </Box>
                    <Typography sx={{ display: { md: "none" }, fontFamily: fontMono, fontSize: "0.8rem", color: "text.secondary", mb: 1.5 }}>
                      {dates}
                    </Typography>
                    <Typography color="text.secondary">{experience.shortDescription}</Typography>
                  </ButtonBase>
                </Box>
              </Reveal>
            </Box>
          );
        })}
      </Box>
      <ExperienceModal modalExperience={modalExperience} setModalExperience={setModalExperience} />
    </>
  );
};

export default Experiences;
