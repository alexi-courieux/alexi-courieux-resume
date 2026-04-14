import { Box, Chip, InputAdornment, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { FC, useEffect, useMemo, useState } from "react";
import { useI18n } from "../../hooks/useI18n";
import { SkillSchema } from "../../api/generated";
import { stringSortAsc } from "../../utils/sort";

interface ISkillListProps {
    skills: SkillSchema[];
    searchBar?: boolean;
}

interface Category {
    name: string;
    skills: SkillSchema[];
}

const SkillList: FC<ISkillListProps> = ({ skills, searchBar = false }) => {

    const [categories, setCategories] = useState<Category[]>([]);
    const [activeCategories, setActiveCategories] = useState<string[]>([]);
    const [searchInput, setSearchInput] = useState<string>('');

    const { t } = useI18n();

    useEffect(() => {
        const categoryMap: { [key: string]: SkillSchema[] } = {};
        skills.forEach(skill => {
            skill.categories.forEach(categoryName => {
                if (!categoryMap[categoryName]) {
                    categoryMap[categoryName] = [];
                }
                categoryMap[categoryName].push(skill);
            });
        });

        const newCategories = Object.keys(categoryMap).map(categoryName => ({
            name: categoryName,
            skills: categoryMap[categoryName],
        })).sort((a, b) => stringSortAsc(a.name, b.name));

        setCategories(newCategories);
    }, [skills]);

    const filteredSkills = useMemo(() => {
        let fSkills = [...skills];

        if (activeCategories.length > 0) {
            fSkills = fSkills.filter(skill =>
                activeCategories.some(cat => skill.categories.includes(cat))
            );
        }

        if (searchInput) {
            fSkills = fSkills.filter(skill =>
                skill.name.toLowerCase().includes(searchInput.toLowerCase())
            );
        }

        return fSkills;
    }, [skills, activeCategories, searchInput]);

    const groupedSkills = useMemo(() => {
        const catsToShow = activeCategories.length > 0
            ? categories.filter(c => activeCategories.includes(c.name))
            : categories;

        return catsToShow
            .map(category => ({
                name: category.name,
                skills: filteredSkills.filter(skill => skill.categories.includes(category.name)),
            }))
            .filter(group => group.skills.length > 0);
    }, [categories, filteredSkills, activeCategories]);

    const handleCategoryToggle = (_: React.MouseEvent<HTMLElement>, newCategories: string[]) => {
        setActiveCategories(newCategories);
    };

    return (
        <Box>
            {categories.length > 0 && (
                <Box mb={2} role="group" aria-label={t('resume.skill.filterByCategory')}>
                    <Typography variant="body2" color="text.secondary" mb={1} textAlign="center">
                        {t('resume.skill.clickFilter')}
                    </Typography>
                    <ToggleButtonGroup
                        value={activeCategories}
                        onChange={handleCategoryToggle}
                        aria-label={t('resume.skill.categories')}
                        sx={{ flexWrap: 'wrap', justifyContent: 'center', display: 'flex', gap: 0.5, border: 'none' }}
                    >
                        {categories.map(category => (
                            <ToggleButton
                                key={category.name}
                                value={category.name}
                                size="small"
                                aria-label={
                                    activeCategories.includes(category.name)
                                        ? t("resume.skill.removeCategory", { category: category.name })
                                        : t("resume.skill.addCategory", { category: category.name })
                                }
                                sx={{
                                    borderRadius: '16px !important',
                                    border: '1px solid !important',
                                    px: 1.5,
                                    textTransform: 'none',
                                }}
                            >
                                {category.name}
                            </ToggleButton>
                        ))}
                    </ToggleButtonGroup>
                </Box>
            )}

            {searchBar && (
                <Box display="flex" justifyContent="center" mb={3}>
                    <TextField
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        label={t("resume.skill.search")}
                        size="small"
                        sx={{ width: 300 }}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon fontSize="small" />
                                    </InputAdornment>
                                ),
                            },
                            htmlInput: {
                                'aria-label': t("resume.skill.search"),
                            },
                        }}
                    />
                </Box>
            )}

            {groupedSkills.length > 0 ? (
                <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0 }}>
                    {groupedSkills.map(group => (
                        <Box component="li" key={group.name} mb={2}>
                            <Typography
                                variant="subtitle2"
                                color="primary"
                                fontWeight="bold"
                                mb={1}
                                sx={{ textTransform: 'uppercase', letterSpacing: 1, fontSize: '0.7rem' }}
                            >
                                {group.name}
                            </Typography>
                            <Box
                                component="ul"
                                sx={{ listStyle: 'none', m: 0, p: 0, display: 'flex', flexWrap: 'wrap', gap: 1 }}
                            >
                                {group.skills.map(skill => (
                                    <Box component="li" key={skill.id}>
                                        <Chip label={skill.name} color="secondary" size="small" />
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    ))}
                </Box>
            ) : (
                <Typography variant="body2" color="text.secondary" textAlign="center">
                    {t('resume.skill.noResults')}
                </Typography>
            )}
        </Box>
    );
};

export default SkillList;