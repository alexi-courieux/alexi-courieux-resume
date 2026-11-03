import { FC, useEffect, useMemo, useState } from "react";
import { Box, Button, Container, IconButton, Tooltip, Typography, useTheme } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { differenceInYears } from "date-fns";
import { useI18n } from "../../hooks/useI18n";
import { links } from "../../assets/links";
import { fontMono } from "../../theme/theme";
import { ExperienceSchema, SkillSchema } from "../../api/generated";

interface IHeroProps {
    experiences: ExperienceSchema[];
    skills: SkillSchema[];
}

const useTypewriter = (words: string[]) => {
    const [text, setText] = useState(words[0] ?? "");
    const reduced = useMemo(() => globalThis.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false, []);

    useEffect(() => {
        if (reduced || words.length < 2) {
            setText(words[0] ?? "");
            return;
        }
        let word = 0;
        let char = 0;
        let deleting = false;
        let timer: ReturnType<typeof setTimeout>;
        const tick = () => {
            const full = words[word];
            char += deleting ? -1 : 1;
            setText(full.slice(0, char));
            let delay = deleting ? 35 : 75;
            if (!deleting && char === full.length) {
                deleting = true;
                delay = 1800;
            } else if (deleting && char === 0) {
                deleting = false;
                word = (word + 1) % words.length;
                delay = 350;
            }
            timer = setTimeout(tick, delay);
        };
        timer = setTimeout(tick, 600);
        return () => clearTimeout(timer);
    }, [words, reduced]);

    return text;
};

const Stat: FC<{ value: string; label: string }> = ({ value, label }) => (
    <Box role="listitem" sx={{ minWidth: 110 }}>
        <Typography sx={{ fontFamily: fontMono, fontWeight: 800, fontSize: { xs: "1.8rem", md: "2.4rem" }, lineHeight: 1 }} color="text.primary">
            {value}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>{label}</Typography>
    </Box>
);

const Hero: FC<IHeroProps> = ({ experiences, skills }) => {
    const { t } = useI18n();
    const theme = useTheme();
    const dark = theme.palette.mode === "dark";
    const { primary, secondary } = theme.palette;

    const roles = useMemo(() => {
        const r = t("hero.roles", { returnObjects: true });
        return Array.isArray(r) ? (r as string[]) : [];
    }, [t]);
    const typed = useTypewriter(roles);

    const years = useMemo(() => {
        if (experiences.length === 0) return null;
        const first = Math.min(...experiences.map((e) => new Date(e.startDate).getTime()));
        return differenceInYears(new Date(), new Date(first));
    }, [experiences]);

    const gradientText = {
        background: `linear-gradient(100deg, ${primary.main} 10%, ${secondary.main} 90%)`,
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
        color: "transparent",
    };

    const stats = years === null ? [] : [
        { v: `${years}+`, l: t("hero.stats.years") },
        { v: `${new Set(experiences.map((e) => e.companyName)).size}`, l: t("hero.stats.companies") },
        ...(skills.length > 0 ? [{ v: `${skills.length}`, l: t("hero.stats.skills") }] : []),
    ];

    return (
        <Box id="top" component="section" aria-labelledby="hero-title" sx={{ position: "relative", minHeight: { xs: "auto", md: "min(100svh, 900px)" }, display: "flex", alignItems: "center", overflow: "hidden", pt: 14, pb: 8 }}>
            {/* ambient glow orbs */}
            <Box aria-hidden sx={{ position: "absolute", top: "-10%", right: "-8%", width: { xs: 320, md: 620 }, height: { xs: 320, md: 620 }, borderRadius: "50%", background: `radial-gradient(circle, ${primary.main} 0%, transparent 65%)`, opacity: dark ? 0.28 : 0.2, filter: "blur(40px)", animation: "float 14s ease-in-out infinite" }} />
            <Box aria-hidden sx={{ position: "absolute", bottom: "-15%", left: "-10%", width: { xs: 280, md: 520 }, height: { xs: 280, md: 520 }, borderRadius: "50%", background: `radial-gradient(circle, ${secondary.main} 0%, transparent 65%)`, opacity: dark ? 0.2 : 0.16, filter: "blur(50px)", animation: "float 18s ease-in-out infinite reverse" }} />

            <Container maxWidth="lg" sx={{ position: "relative" }}>
                <Box
                    sx={{
                        display: "inline-flex", alignItems: "center", gap: 1.2, px: 2, py: 0.8, borderRadius: 999, mb: 4,
                        border: `1px solid ${theme.palette.divider}`, bgcolor: dark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.7)",
                        backdropFilter: "blur(8px)", fontFamily: fontMono, fontSize: "0.82rem",
                    }}
                >
                    <Box aria-hidden sx={{ width: 9, height: 9, borderRadius: "50%", bgcolor: "#22c55e", color: "rgba(34,197,94,.6)", animation: "pulse-ring 1.8s ease-out infinite" }} />
                    <Typography component="span" variant="inherit" color="text.primary">{t("hero.available")}</Typography>
                </Box>

                <Typography sx={{ fontFamily: fontMono, color: "primary.main", fontWeight: 700, mb: 1.5, fontSize: { xs: "0.95rem", md: "1.1rem" } }}>
                    {t("hero.greeting")}
                </Typography>

                <Typography variant="h1" component="h1" id="hero-title" sx={{ fontSize: { xs: "clamp(2.8rem, 14vw, 4.2rem)", md: "clamp(4.5rem, 9vw, 8rem)" }, lineHeight: 0.98, mb: 3 }}>
                    <Box component="span" sx={gradientText}>Alexi</Box>
                    <br />
                    Courieux
                </Typography>

                <Box sx={{ minHeight: { xs: 40, md: 52 }, mb: 3 }}>
                    <Typography component="p" aria-label={roles.join(", ")} sx={{ fontFamily: fontMono, fontSize: { xs: "1.05rem", md: "1.6rem" }, fontWeight: 600 }}>
                        <Box component="span" aria-hidden sx={{ color: "text.secondary" }}>{"> "}</Box>
                        <Box component="span" aria-hidden>{typed}</Box>
                        <Box component="span" aria-hidden sx={{ display: "inline-block", width: "0.6ch", height: "1.1em", bgcolor: "secondary.main", ml: 0.5, verticalAlign: "text-bottom", animation: "blink 1s steps(1) infinite" }} />
                    </Typography>
                </Box>

                <Typography color="text.secondary" sx={{ maxWidth: 640, fontSize: { xs: "1.05rem", md: "1.25rem" }, mb: 5 }}>
                    {t("hero.tagline")}
                </Typography>

                <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 2, mb: { xs: 6, md: 9 } }}>
                    <Button
                        href={links.email}
                        variant="contained"
                        size="large"
                        startIcon={<EmailIcon />}
                        sx={{
                            px: 3.5, py: 1.4, fontSize: "1.05rem", color: dark ? "#080a12" : "#fff",
                            background: `linear-gradient(100deg, ${primary.main}, ${secondary.main})`,
                            boxShadow: `0 10px 40px -10px ${primary.main}`,
                            transition: "transform .2s, box-shadow .2s",
                            "&:hover": { transform: "translateY(-2px)", boxShadow: `0 14px 44px -8px ${primary.main}` },
                        }}
                    >
                        {t("hero.cta.contact")}
                    </Button>
                    <Button href="#experience" variant="outlined" size="large" endIcon={<ArrowDownwardIcon />} sx={{ px: 3.5, py: 1.4, fontSize: "1.05rem", borderWidth: 2, "&:hover": { borderWidth: 2 } }}>
                        {t("hero.cta.work")}
                    </Button>
                    <Box sx={{ display: "flex", ml: { sm: 1 } }}>
                        <Tooltip title={t("resume.about-me.github.tooltip")}>
                            <IconButton href={links.github} aria-label={t("resume.about-me.github.aria-label")} color="inherit" size="large"><GitHubIcon /></IconButton>
                        </Tooltip>
                        <Tooltip title={t("resume.about-me.linkedin.tooltip")}>
                            <IconButton href={links.linkedin} aria-label={t("resume.about-me.linkedin.aria-label")} color="inherit" size="large"><LinkedInIcon /></IconButton>
                        </Tooltip>
                    </Box>
                </Box>

                {stats.length > 0 && (
                    <Box
                        role="list"
                        sx={{ display: "flex", flexWrap: "wrap", gap: { xs: 3, md: 7 }, m: 0, pt: 4, borderTop: `1px solid ${theme.palette.divider}`, maxWidth: 720 }}
                    >
                        {stats.map(({ v, l }) => (
                            <Stat key={l} value={v} label={l} />
                        ))}
                    </Box>
                )}
            </Container>
        </Box>
    );
};

export default Hero;
