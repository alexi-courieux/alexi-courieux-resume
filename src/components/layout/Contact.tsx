import { FC } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { useI18n } from "../../hooks/useI18n";
import { links } from "../../assets/links";
import WordHighlight from "./WordHighlight";

const Contact: FC = () => {
    const { t } = useI18n();

    return (
        <Box component="section" id="contact" aria-labelledby="contact-title" sx={{ py: { xs: 8, md: 12 }, borderTop: 1, borderColor: "divider" }}>
            <Container maxWidth="lg">
                <Typography variant="h2" component="h2" id="contact-title" sx={{ fontSize: { xs: "2rem", md: "3rem" }, mb: { xs: 4, md: 6 } }}>
                    {t("resume.contact.title")}
                </Typography>

                <WordHighlight text={t("resume.about-me.description")} />

                <Box sx={{ mt: { xs: 5, md: 7 }, display: "flex", flexWrap: "wrap", alignItems: "center", gap: 2 }}>
                    <Button
                        href={links.email}
                        variant="contained"
                        size="large"
                        startIcon={<EmailIcon />}
                        aria-label={t("resume.about-me.email.aria-label")}
                        sx={{ maxWidth: "100%", overflowWrap: "anywhere" }}
                    >
                        {t("resume.about-me.email.value")}
                    </Button>
                    <Button href={links.github} variant="outlined" startIcon={<GitHubIcon />} aria-label={t("resume.about-me.github.aria-label")}>GitHub</Button>
                    <Button href={links.linkedin} variant="outlined" startIcon={<LinkedInIcon />} aria-label={t("resume.about-me.linkedin.aria-label")}>LinkedIn</Button>
                </Box>

                <Typography color="text.secondary" sx={{ mt: { xs: 8, md: 12 }, fontSize: "0.95rem" }}>
                    © {new Date().getFullYear()} Alexi Courieux · {t("resume.contact.footer")}
                </Typography>
            </Container>
        </Box>
    );
};

export default Contact;
