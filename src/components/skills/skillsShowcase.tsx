import { FC, useMemo, useState } from "react";
import { Box, InputAdornment, TextField, Typography, useTheme } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { SkillSchema } from "../../api/generated";
import { useI18n } from "../../hooks/useI18n";
import { stringSortAsc } from "../../utils/sort";
import { fontMono } from "../../theme/theme";
import Reveal from "../layout/Reveal";

interface IProps {
    skills: SkillSchema[];
}

const normalize = (value: string) => value.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

const SkillsShowcase: FC<IProps> = ({ skills }) => {
    const { t } = useI18n();
    const theme = useTheme();
    const [query, setQuery] = useState("");

    const categories = useMemo(() => {
        const map = new Map<string, SkillSchema[]>();
        skills.forEach((skill) => skill.categories.forEach((category) => {
            map.set(category, [...(map.get(category) ?? []), skill]);
        }));
        return [...map.entries()]
            .map(([name, items]) => ({ name, skills: items.toSorted((a, b) => stringSortAsc(a.name, b.name)) }))
            .sort((a, b) => stringSortAsc(a.name, b.name));
    }, [skills]);

    const needle = normalize(query.trim());
    const matches = (skill: SkillSchema) => needle === "" || normalize(skill.name).includes(needle);
    const matchCount = needle === "" ? 0 : skills.filter(matches).length;

    return (
        <Box>
            <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 2, mb: 4 }}>
                <TextField
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    label={t("resume.skill.search")}
                    size="small"
                    sx={{ width: { xs: "100%", sm: 320 }, "& .MuiOutlinedInput-root": { borderRadius: 999 } }}
                    slotProps={{
                        input: { startAdornment: (<InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment>) },
                    }}
                />
                <Typography role="status" aria-live="polite" variant="body2" color="text.secondary" sx={{ fontFamily: fontMono }}>
                    {needle !== "" && (matchCount > 0 ? t("resume.skill.resultCount", { count: matchCount }) : t("resume.skill.noResults"))}
                </Typography>
            </Box>

            <Box component="ul" sx={{ listStyle: "none", m: 0, p: 0, borderBottom: `1px solid ${theme.palette.divider}` }}>
                {categories.map((category, index) => {
                    const hasMatch = category.skills.some(matches);
                    return (
                        <Box
                            component="li"
                            key={category.name}
                            sx={{
                                display: "grid", gridTemplateColumns: { xs: "1fr", md: "240px 1fr" }, columnGap: 4, rowGap: 1,
                                py: { xs: 2.5, md: 3 }, borderTop: `1px solid ${theme.palette.divider}`,
                                opacity: hasMatch ? 1 : 0.35, transition: "opacity .3s",
                                "&:hover .category-name": { color: "primary.main" },
                                "&:hover .category-name::before": { width: 28 },
                            }}
                        >
                            <Reveal delay={Math.min(index, 5) * 50}>
                                <Typography
                                    variant="h3"
                                    className="category-name"
                                    sx={{
                                        display: "flex", alignItems: "center", gap: 1.5, fontSize: "1.15rem", transition: "color .25s",
                                        "&::before": { content: '""', width: 12, height: 2, bgcolor: "currentColor", borderRadius: 2, transition: "width .25s" },
                                    }}
                                >
                                    {category.name}
                                    <Box component="span" aria-hidden sx={{ fontFamily: fontMono, fontSize: "0.75rem", color: "text.secondary", fontWeight: 400 }}>
                                        {category.skills.length}
                                    </Box>
                                </Typography>
                            </Reveal>
                            <Reveal delay={Math.min(index, 5) * 50 + 60}>
                                <Box component="ul" sx={{ listStyle: "none", m: 0, p: 0, display: "flex", flexWrap: "wrap", columnGap: 0, rowGap: 0.5 }}>
                                    {category.skills.map((skill) => {
                                        const match = needle !== "" && matches(skill);
                                        return (
                                            <Box
                                                component="li"
                                                key={skill.id}
                                                sx={{
                                                    fontSize: { xs: "1rem", md: "1.1rem" }, lineHeight: 1.7,
                                                    color: needle === "" || match ? "text.primary" : "text.disabled",
                                                    fontWeight: match ? 800 : 500,
                                                    textDecoration: match ? "underline" : "none",
                                                    textDecorationColor: theme.palette.primary.main,
                                                    textDecorationThickness: 2,
                                                    textUnderlineOffset: 4,
                                                    transition: "color .2s",
                                                    "&:not(:last-child)::after": { content: '"/"', mx: 1.25, color: "divider", fontWeight: 400 },
                                                    "&:hover": { color: "primary.main" },
                                                }}
                                            >
                                                {skill.name}
                                            </Box>
                                        );
                                    })}
                                </Box>
                            </Reveal>
                        </Box>
                    );
                })}
            </Box>
        </Box>
    );
};

export default SkillsShowcase;
