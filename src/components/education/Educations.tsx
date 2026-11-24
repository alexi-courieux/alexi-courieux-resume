import { Box, Skeleton, Typography, useTheme as muiTheme } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import { FC } from "react";
import { useI18n } from "../../hooks/useI18n";
import useEducationApi from "../../hooks/useEducationApi";
import { State } from "../../models/requestState";
import ErrorMessage from "../ErrorMessage";
import { useTheme } from "../../hooks/useTheme";
import { ThemeMode } from "../../contextProviders/ThemeContext";
import { radius } from "../../theme/theme";

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
                {[0, 1].map((i) => <Skeleton key={i} variant="rounded" height={150} sx={{ borderRadius: `${radius.card}px` }} />)}
            </Box>
        );
    }

    return (
        <Box component="ul" sx={{ listStyle: "none", m: 0, p: 0, display: "grid", gap: 3, gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" } }}>
            {educations.map((education) => (
                <Box
                    component="li"
                    key={education.id}
                    sx={{
                        p: { xs: 2.5, md: 4 }, borderRadius: `${radius.card}px`, bgcolor: "background.paper", border: `1px solid ${theme.palette.divider}`,
                        display: "flex", flexDirection: "column", gap: 2.5,
                    }}
                >
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2 }}>
                        {education.imageUri ? (
                            <Box
                                sx={{ width: 64, height: 64, p: 1, borderRadius: `${radius.control}px`, display: "grid", placeItems: "center", bgcolor: dark ? "rgba(255,255,255,.06)" : "#fff", border: `1px solid ${theme.palette.divider}` }}
                            >
                                <Box
                                    component="img"
                                    src={themeMode === ThemeMode.Dark ? education.imageUriDark ?? education.imageUri : education.imageUri}
                                    // Decorative: the school's name is printed in text right beside the logo.
                                    alt=""
                                    sx={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                                />
                            </Box>
                        ) : (
                            <SchoolIcon aria-hidden sx={{ fontSize: 40, color: "text.secondary" }} />
                        )}
                        <Typography color="text.secondary" sx={{ textAlign: "right", fontVariantNumeric: "tabular-nums" }}>
                            {education.endDate ? formatDate(education.endDate, "yyyy") : t("resume.education.present")}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="h5" component="h3" sx={{ lineHeight: 1.25, mb: 0.5 }}>{education.degree}</Typography>
                        <Typography color="text.secondary">{education.school} · {education.location}</Typography>
                    </Box>
                </Box>
            ))}
        </Box>
    );
};

export default Educations;
