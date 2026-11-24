import { FC, useMemo, useState } from "react";
import { Box, ButtonBase, InputAdornment, TextField, Typography, useTheme } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { SkillSchema } from "../../api/generated";
import { useI18n } from "../../hooks/useI18n";
import { stringSortAsc } from "../../utils/sort";

interface IProps {
    skills: SkillSchema[];
    /** Denser, read-only layout without search or category filters, e.g. inside the experience modal. */
    compact?: boolean;
}

const normalize = (value: string) => value.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

const SkillsShowcase: FC<IProps> = ({ skills, compact = false }) => {
    const { t } = useI18n();
    const theme = useTheme();
    const [query, setQuery] = useState("");
    // Categories the visitor narrowed the list to; empty means "show everything".
    const [selected, setSelected] = useState<string[]>([]);

    const toggleCategory = (name: string) =>
        setSelected((current) => current.includes(name) ? current.filter((c) => c !== name) : [...current, name]);

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
            {!compact && (<Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 2, mb: 4 }}>
                <TextField
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    label={t("resume.skill.search")}
                    size="small"
                    sx={{ width: { xs: "100%", sm: 320 } }}
                    slotProps={{
                        input: { startAdornment: (<InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment>) },
                    }}
                />
                <Typography role="status" aria-live="polite" variant="body2" color="text.secondary">
                    {needle !== "" && (matchCount > 0 ? t("resume.skill.resultCount", { count: matchCount }) : t("resume.skill.noResults"))}
                </Typography>
            </Box>)}

            <Box
                component="ul"
                aria-label={compact ? undefined : t("resume.skill.filterByCategory")}
                sx={{ listStyle: "none", m: 0, p: 0, borderBottom: `1px solid ${theme.palette.divider}` }}
            >
                {categories.filter((category) => compact || selected.length === 0 || selected.includes(category.name)).map((category) => {
                    const hasMatch = category.skills.some(matches);
                    const pressed = selected.includes(category.name);
                    return (
                        <Box
                            component="li"
                            key={category.name}
                            sx={{
                                display: "grid", gridTemplateColumns: compact ? { xs: "1fr", sm: "150px 1fr" } : { xs: "1fr", md: "240px 1fr" }, columnGap: compact ? 3 : 4, rowGap: 1,
                                py: compact ? 1.75 : { xs: 2.5, md: 3 }, borderTop: `1px solid ${theme.palette.divider}`,
                                opacity: hasMatch ? 1 : 0.35, transition: "opacity .3s",
                            }}
                        >
                            <Typography variant="h3" sx={{ fontSize: "1.15rem" }}>
                                {compact ? (
                                    category.name
                                ) : (
                                    // A real toggle button inside the heading: Tab reaches it, Enter/Space operate it.
                                    <ButtonBase
                                        onClick={() => toggleCategory(category.name)}
                                        aria-pressed={pressed}
                                        sx={{
                                            font: "inherit", letterSpacing: "inherit", textAlign: "left", minHeight: 44, py: 0.5, borderRadius: 1,
                                            textDecoration: pressed ? "underline" : "none",
                                            textDecorationColor: theme.palette.primary.main,
                                            textDecorationThickness: 2,
                                            textUnderlineOffset: 6,
                                            transition: "color .2s",
                                            "&:hover": { color: "primary.main", textDecoration: "underline", textDecorationThickness: 2, textUnderlineOffset: 6 },
                                        }}
                                    >
                                        {category.name}
                                        <Box component="span" aria-hidden sx={{ ml: 1.25, fontSize: "0.85rem", color: "text.secondary", fontWeight: 400 }}>
                                            {category.skills.length}
                                        </Box>
                                    </ButtonBase>
                                )}
                                {compact && (
                                    <Box component="span" aria-hidden sx={{ ml: 1.25, fontSize: "0.85rem", color: "text.secondary", fontWeight: 400 }}>
                                        {category.skills.length}
                                    </Box>
                                )}
                            </Typography>
                            <Box>
                                <Box component="ul" sx={{ listStyle: "none", m: 0, p: 0, display: "flex", flexWrap: "wrap", columnGap: 0, rowGap: 0.5 }}>
                                    {category.skills.map((skill, index) => {
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
                                                }}
                                            >
                                                {skill.name}
                                                {/* Visual separator only: aria-hidden so screen readers never read "slash". */}
                                                {index < category.skills.length - 1 && (
                                                    <Box component="span" aria-hidden sx={{ mx: 1.25, color: "divider", fontWeight: 400, textDecoration: "none", display: "inline-block" }}>/</Box>
                                                )}
                                            </Box>
                                        );
                                    })}
                                </Box>
                            </Box>
                        </Box>
                    );
                })}
            </Box>
        </Box>
    );
};

export default SkillsShowcase;
