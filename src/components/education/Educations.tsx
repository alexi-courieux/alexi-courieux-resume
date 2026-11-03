import { Box, Skeleton, Typography, useTheme as muiTheme } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import { FC } from "react";
import { useI18n } from "../../hooks/useI18n";
import useEducationApi from "../../hooks/useEducationApi";
import { State } from "../../models/requestState";
import ErrorMessage from "../ErrorMessage";
import { useTheme } from "../../hooks/useTheme";
import { ThemeMode } from "../../contextProviders/ThemeContext";
import Reveal from "../layout/Reveal";
import { fontMono } from "../../theme/theme";

const Educations: FC = () => {
    const { t, formatDate } = useI18n();
    const { educations, getState, list } = useEducationApi({ getOnLoad: true });
    const theme = muiTheme();
    const themeMode = useTheme().mode;
    const dark = theme.palette.mode === "dark";

    if (getState.state === State.FAILURE) {
        return <ErrorMessage retryFunction={list} />;
    }

    if (getState.state !== State.SUCCESS) {
        return (
            <Box role="status" aria-label={t("resume.education.loading")} sx={{ display: "grid", gap: 3, gridTemplateColumns: { md: "1fr 1fr" } }}>
                {[0, 1].map((i) => <Skeleton key={i} variant="rounded" height={150} sx={{ borderRadius: 5 }} />)}
            </Box>
        );
    }

    return (
        <Box component="ul" sx={{ listStyle: "none", m: 0, p: 0, display: "grid", gap: 3, gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" } }}>
            {educations.map((education, index) => (
                <Box component="li" key={education.id} sx={{ display: "flex", "& > div": { width: "100%" } }}>
                    <Reveal delay={Math.min(index, 3) * 80}>
                        <Box
                            sx={{
                                height: "100%", p: 3.5, borderRadius: 5, bgcolor: "background.paper", border: `1px solid ${theme.palette.divider}`,
                                display: "flex", flexDirection: "column", gap: 2, position: "relative", overflow: "hidden",
                                transition: "transform .25s, border-color .25s",
                                "&:hover": { transform: "translateY(-4px)", borderColor: "secondary.main" },
                            }}
                        >
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2 }}>
                                {education.imageUri ? (
                                    <Box
                                        sx={{ width: 64, height: 64, p: 1, borderRadius: 3, display: "grid", placeItems: "center", bgcolor: dark ? "rgba(255,255,255,.05)" : "#fff", border: `1px solid ${theme.palette.divider}` }}
                                    >
                                        <Box
                                            component="img"
                                            src={themeMode === ThemeMode.Dark ? education.imageUriDark ?? education.imageUri : education.imageUri}
                                            alt={education.imageAlt}
                                            sx={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                                        />
                                    </Box>
                                ) : (
                                    <SchoolIcon aria-hidden color="secondary" sx={{ fontSize: 40 }} />
                                )}
                                <Typography sx={{ fontFamily: fontMono, fontSize: "0.85rem", color: "text.secondary", textAlign: "right" }}>
                                    {education.endDate ? formatDate(education.endDate, "yyyy") : t("resume.education.present")}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="h5" component="h3" sx={{ lineHeight: 1.25, mb: 0.5 }}>{education.degree}</Typography>
                                <Typography color="text.secondary">{education.school} · {education.location}</Typography>
                            </Box>
                        </Box>
                    </Reveal>
                </Box>
            ))}
        </Box>
    );
};

export default Educations;
