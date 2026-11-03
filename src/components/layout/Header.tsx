import { FC, useEffect, useState } from "react";
import { Box, Container, Link, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useI18n } from "../../hooks/useI18n";
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

const Header: FC = () => {
    const { t } = useI18n();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [scrolled, setScrolled] = useState(false);
    const [progress, setProgress] = useState(0);
    const [active, setActive] = useState("");

    useEffect(() => {
        const onScroll = () => {
            const max = document.documentElement.scrollHeight - window.innerHeight;
            setScrolled(window.scrollY > 24);
            setProgress(max > 0 ? window.scrollY / max : 0);
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

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

    const dark = theme.palette.mode === "dark";

    return (
        <Box
            component="header"
            sx={{
                position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
                backdropFilter: scrolled ? "blur(16px) saturate(160%)" : "none",
                bgcolor: scrolled ? (dark ? "rgba(8,10,18,0.72)" : "rgba(246,247,251,0.78)") : "transparent",
                borderBottom: `1px solid ${scrolled ? theme.palette.divider : "transparent"}`,
                transition: "background-color .3s, border-color .3s",
            }}
        >
            <Link
                href="#main"
                sx={{
                    position: "absolute", left: 16, top: -60, bgcolor: "primary.main", color: "background.default",
                    px: 2, py: 1, borderRadius: 2, zIndex: 100, "&:focus": { top: 12 },
                }}
            >
                {t("common.skipToContent")}
            </Link>
            <Container maxWidth="lg" sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", minHeight: 72, columnGap: 3 }}>
                <Link href="#top" underline="none" aria-label={t("resume.backToTop")} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Logo size={38} />
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
                        sx={{ display: "flex", gap: { xs: 2.5, md: 3 }, order: { xs: 3, md: 2 }, width: { xs: "100%", md: "auto" }, justifyContent: "center", pb: { xs: 1, md: 0 }, ml: { md: "auto" } }}
                    >
                        {NAV.map(({ id, key }) => (
                            <Link
                                key={id}
                                href={`#${id}`}
                                underline="none"
                                aria-current={active === id ? "location" : undefined}
                                sx={{
                                    fontSize: { xs: "0.8rem", md: "0.95rem" }, fontWeight: 700, position: "relative", py: 0.5,
                                    color: active === id ? "primary.main" : "text.secondary",
                                    transition: "color .2s",
                                    "&:hover": { color: "text.primary" },
                                    "&::after": {
                                        content: '""', position: "absolute", left: 0, right: 0, bottom: -2, height: 2, borderRadius: 2,
                                        bgcolor: "primary.main", transform: active === id ? "scaleX(1)" : "scaleX(0)", transition: "transform .25s",
                                    },
                                }}
                            >
                                {t(key)}
                            </Link>
                        ))}
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", order: { xs: 2, md: 3 } }}>
                        <ThemeModeSwitcher />
                        <LanguageSwitcher />
                    </Box>
                </Box>
            </Container>
            <Box
                aria-hidden
                sx={{
                    height: 2, transformOrigin: "left", transform: `scaleX(${progress})`,
                    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                }}
            />
        </Box>
    );
};

export default Header;
