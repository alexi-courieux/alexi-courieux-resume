import { FC, useMemo } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { useI18n } from "../../hooks/useI18n";
import { links } from "../../assets/links";
import { fontDisplay } from "../../theme/theme";
import { ExperienceSchema, SkillSchema } from "../../api/generated";

interface IHeroProps {
    experiences: ExperienceSchema[];
    skills: SkillSchema[];
}

/** Hero entrance: each block rises once on load, one after the other. */
const enter = (step: number) => ({ animation: "enter .7s cubic-bezier(.2,.7,.2,1) both", animationDelay: `${step * 80}ms` });

const Stat: FC<{ value: string; label: string }> = ({ value, label }) => (
    <Box role="listitem">
        <Typography sx={{ fontFamily: fontDisplay, fontWeight: 700, fontSize: { xs: "2rem", md: "2.5rem" }, lineHeight: 1, fontVariantNumeric: "tabular-nums" }} color="text.primary">
            {value}
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 1, fontSize: "0.95rem" }}>{label}</Typography>
    </Box>
);

const Hero: FC<IHeroProps> = ({ experiences, skills }) => {
    const { t } = useI18n();

    // Calendar years since the earliest experience returned by the API (Dec 2016 -> "10+" in 2026).
    const years = useMemo(() => {
        if (experiences.length === 0) return null;
        const first = Math.min(...experiences.map((e) => new Date(e.startDate).getTime()));
        return new Date().getFullYear() - new Date(first).getFullYear();
    }, [experiences]);

    const stats = years === null ? [] : [
        { v: `${years}+`, l: t("hero.stats.years") },
        { v: `${new Set(experiences.map((e) => e.companyName)).size}`, l: t("hero.stats.companies") },
        ...(skills.length > 0 ? [{ v: `${skills.length}`, l: t("hero.stats.skills") }] : []),
    ];

    return (
        <Box
            id="top"
            component="section"
            aria-labelledby="hero-title"
            sx={{ minHeight: { xs: "auto", md: "min(100svh, 900px)" }, display: "flex", alignItems: "center", pt: { xs: 17, md: 15 }, pb: { xs: 8, md: 6 } }}
        >
            <Container maxWidth="lg">
                <Box sx={{ display: "inline-flex", alignItems: "center", gap: 1.25, mb: 4, ...enter(0) }}>
                    <Box aria-hidden sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: "primary.main" }} />
                    <Typography component="span" color="text.secondary" sx={{ fontSize: "0.95rem" }}>{t("hero.available")}</Typography>
                </Box>

                <Typography
                    variant="h1"
                    component="h1"
                    id="hero-title"
                    sx={{ fontSize: { xs: "clamp(2.4rem, 11vw, 3.5rem)", md: "clamp(3.25rem, 5.2vw, 4.5rem)" }, lineHeight: 1.05, mb: 3, ...enter(1) }}
                >
                    {t("hero.name")}{" "}
                    <Box component="span" sx={{ color: "text.secondary" }}>{t("hero.title")}</Box>
                </Typography>

                <Typography sx={{ maxWidth: 620, fontSize: { xs: "1.1rem", md: "1.3rem" }, lineHeight: 1.55, mb: 5, ...enter(2) }}>
                    {t("hero.tagline")}
                </Typography>

                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: { xs: 7, md: 8 }, ...enter(3) }}>
                    <Button href={links.email} variant="contained" size="large" sx={{ width: { xs: "100%", sm: "auto" } }}>
                        {t("hero.cta.contact")}
                    </Button>
                    <Button href="#experience" variant="outlined" size="large" sx={{ width: { xs: "100%", sm: "auto" } }}>
                        {t("hero.cta.work")}
                    </Button>
                </Box>

                {stats.length > 0 && (
                    <Box
                        role="list"
                        sx={{ display: "flex", flexWrap: "wrap", gap: { xs: 4, md: 8 }, m: 0, pt: 4, borderTop: 1, borderColor: "divider", maxWidth: 720, ...enter(4) }}
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
