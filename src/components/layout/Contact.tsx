import { FC } from "react";
import { Box, Button, Container, Typography, useTheme } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { useI18n } from "../../hooks/useI18n";
import { links } from "../../assets/links";
import Reveal from "./Reveal";
import { fontMono } from "../../theme/theme";

const Contact: FC = () => {
    const { t } = useI18n();
    const theme = useTheme();
    const dark = theme.palette.mode === "dark";
    const { primary, secondary } = theme.palette;

    return (
        <Box component="section" id="contact" aria-labelledby="contact-title" sx={{ py: { xs: 7, md: 12 } }}>
            <Container maxWidth="lg">
                <Reveal>
                    <Box
                        sx={{
                            position: "relative", overflow: "hidden", borderRadius: { xs: 6, md: 8 }, p: { xs: 4, md: 9 }, textAlign: "center",
                            border: `1px solid ${theme.palette.divider}`, bgcolor: "background.paper",
                            "&::before": {
                                content: '""', position: "absolute", inset: 0, opacity: dark ? 0.35 : 0.18,
                                background: `radial-gradient(60% 80% at 15% 0%, ${primary.main}, transparent 70%), radial-gradient(60% 80% at 95% 100%, ${secondary.main}, transparent 70%)`,
                            },
                        }}
                    >
                        <Box sx={{ position: "relative" }}>
                            <Typography sx={{ fontFamily: fontMono, color: "primary.main", fontWeight: 700, mb: 2 }}>{t("resume.contact.eyebrow")}</Typography>
                            <Typography variant="h2" component="h2" id="contact-title" sx={{ fontSize: { xs: "2.2rem", md: "4rem" }, mb: 2, lineHeight: 1.05 }}>
                                {t("resume.contact.title")}
                            </Typography>
                            <Typography color="text.secondary" sx={{ maxWidth: 620, mx: "auto", mb: 5, fontSize: { xs: "1rem", md: "1.2rem" } }}>
                                {t("resume.about-me.description")}
                            </Typography>
                            <Button
                                href={links.email}
                                variant="contained"
                                size="large"
                                startIcon={<EmailIcon />}
                                sx={{
                                    px: 4, py: 1.5, fontSize: { xs: "0.95rem", md: "1.1rem" }, color: dark ? "#080a12" : "#fff", maxWidth: "100%",
                                    background: `linear-gradient(100deg, ${primary.main}, ${secondary.main})`,
                                    boxShadow: `0 10px 40px -10px ${primary.main}`,
                                    transition: "transform .2s",
                                    "&:hover": { transform: "translateY(-2px)" },
                                }}
                                aria-label={t("resume.about-me.email.aria-label")}
                            >
                                {t("resume.about-me.email.value")}
                            </Button>
                            <Box sx={{ mt: 3, display: "flex", justifyContent: "center", gap: 1.5, flexWrap: "wrap" }}>
                                <Button href={links.github} color="inherit" startIcon={<GitHubIcon />} aria-label={t("resume.about-me.github.aria-label")}>GitHub</Button>
                                <Button href={links.linkedin} color="inherit" startIcon={<LinkedInIcon />} aria-label={t("resume.about-me.linkedin.aria-label")}>LinkedIn</Button>
                            </Box>
                        </Box>
                    </Box>
                </Reveal>
                <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 6, fontFamily: fontMono }}>
                    © {new Date().getFullYear()} Alexi Courieux · {t("resume.contact.footer")}
                </Typography>
            </Container>
        </Box>
    );
};

export default Contact;
