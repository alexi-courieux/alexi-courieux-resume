import { FC, useEffect, useState } from "react";
import { Box, Button, Container, Link, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useI18n } from "../../hooks/useI18n";
import { links } from "../../assets/links";
import ThemeModeSwitcher from "../ThemeModeSwitcher";
import LanguageSwitcher from "../LanguageSwitcher";
import Logo from "./Logo";
import { fontDisplay } from "../../theme/theme";

const NAV = [
    { id: "experience", key: "resume.experience.title" },
    { id: "education", key: "resume.education.title" },
    { id: "skills", key: "resume.skills.title" },
    { id: "contact", key: "resume.contact.nav" },
];

/** Opaque bar with a hairline from the first paint; identical at every scroll depth. */
const Header: FC = () => {
    const { t } = useI18n();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [active, setActive] = useState("");

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
        }, { rootMargin: "-40% 0px -55% 0px" });
        NAV.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, []);

    return (
        <Box
            component="header"
            sx={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, bgcolor: "background.default", borderBottom: 1, borderColor: "divider" }}
        >
            <Link
                href="#main"
                sx={{
                    position: "absolute", left: 16, top: -60, bgcolor: "primary.main", color: "primary.contrastText",
                    px: 2, py: 1, borderRadius: 1, zIndex: 100, "&:focus": { top: 12 },
                }}
            >
                {t("common.skipToContent")}
            </Link>
            <Container maxWidth="lg" sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", minHeight: 72, columnGap: 3 }}>
                <Link href="#top" underline="none" aria-label={t("resume.backToTop")} sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Logo size={36} />
                    {!isMobile && (
                        <Typography sx={{ fontFamily: fontDisplay, fontWeight: 700, color: "text.primary", fontSize: "1.1rem" }}>
                            Alexi Courieux
                        </Typography>
                    )}
                </Link>

                <Box sx={{ display: "contents" }}>
                    <Box
                        component="nav"
                        aria-label={t("resume.nav")}
                        sx={{ display: "flex", gap: { xs: 3, md: 4 }, order: { xs: 3, md: 2 }, width: { xs: "100%", md: "auto" }, justifyContent: { xs: "flex-start", md: "center" }, pb: { xs: 1, md: 0 }, ml: { md: "auto" }, mr: { md: 3 } }}
                    >
                        {NAV.map(({ id, key }) => (
                            <Link
                                key={id}
                                href={`#${id}`}
                                underline="none"
                                aria-current={active === id ? "location" : undefined}
                                sx={{
                                    fontSize: "0.95rem", fontWeight: 500, position: "relative", py: 1,
                                    color: active === id ? "text.primary" : "text.secondary",
                                    transition: "color .2s",
                                    "&:hover": { color: "text.primary" },
                                    // Underline draws in on hover and stays under the current section.
                                    "&::after": {
                                        content: '""', position: "absolute", left: 0, right: 0, bottom: 2, height: 2,
                                        bgcolor: "primary.main", transformOrigin: "left", transform: active === id ? "scaleX(1)" : "scaleX(0)", transition: "transform .25s",
                                    },
                                    "&:hover::after": { transform: "scaleX(1)" },
                                }}
                            >
                                {t(key)}
                            </Link>
                        ))}
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, order: { xs: 2, md: 3 } }}>
                        <ThemeModeSwitcher />
                        <LanguageSwitcher />
                        {!isMobile && (
                            <Button href={links.email} variant="contained" sx={{ ml: 1 }}>
                                {t("hero.cta.contact")}
                            </Button>
                        )}
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Header;
